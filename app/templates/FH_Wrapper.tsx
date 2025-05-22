import { createContext, Dispatch, SetStateAction } from "react";

import { Config, Constants, LocalStorage } from "@/classes/Constants";
import type { Device } from "@/classes/Device";
import FH from "@/classes/FH";
import type { MyUser } from "@/classes/MyUser";
import type { AdminSettings } from "@/classes/templates/AdminSettings";
import QuasarPage from "@/components/templates/QuasarPage";
import { useFHWatch } from "@/hooks/useFHWatch";
import { useLoading as useInitialLoading } from "@/hooks/useLoading";
import { useC, useF, useS } from "@/hooks/useReactHooks";

import PageWrapper from "../helpers/PageWrapper";
import RegisterPage from "../helpers/RegisterPage";
import SignInPage from "../helpers/SignInPage";
import EmailVerificationPage from "./EmailVerificationPage";
import { UserContext } from "./User_Wrapper";
import { useBluetooth } from "@/app/z/Bluetooth/useBluetooth";
import useLocalStorage from "@/hooks/useLocalStorage";
import LoadingPage from "./LoadingPage";
import { useFHWatchQuery } from "@/hooks/useFHWatchQuery";
import { HourLog } from "@/classes/HourLog";
import MyModal from "@/components/templates/MyModal";
import useModal from "@/hooks/useModal";
import WarningIcon from "@/components/custom/WarningIcon";
import MyButton from "@/components/templates/MyButton";

// ? ----------------------
// ? FIRESTORE DATA OBJECTS
// ? ----------------------

export const FHContext = createContext({
  adminSettings: {} as AdminSettings | null,
  myUser: {} as MyUser | null,
  device: {} as Device | null,
  Bluetooth: {} as ReturnType<typeof useBluetooth>,
  firstVisit: true,
  setFirstVisit: (value: boolean) => {},
  name: "",
  setName: (value: string) => {},
  hourLogs: [] as HourLog[],
  expanded: true,
  setExpanded: {} as Dispatch<SetStateAction<boolean>>,
});

interface FHWrapperProps {}

const FHWrapper: React.FC<FHWrapperProps> = () => {
  const { user, loadingUser } = useC(UserContext);
  const needRefilModal = useModal();
  const [needRefilModalClosed, setNeedRefilModalClosed] = useS(false);

  //! QUASAR
  const [adminSettings, loadingAdminSettings] = useFHWatch(
    FH.AdminSettings,
    "settings"
  );

  //! MY USER
  const [myUser, loadingMyUser] = useFHWatch(FH.MyUser, user?.uid);

  //! DEVICE
  const [device, loadingDevice] = useFHWatch(FH.Device, "readings");

  useF(() => {
    if (!device) return;
    if (device.current_reservoir === "Low" && !needRefilModalClosed) {
      needRefilModal.open();
    } else {
      needRefilModal.close();
    }
  }, [device, needRefilModalClosed]);

  function closeNeedRefilModal() {
    setNeedRefilModalClosed(true);
    needRefilModal.close();
  }

  //! FIRST_VISIT
  const [firstVisit, setFirstVisit] = useLocalStorage(
    LocalStorage.firstVisit,
    true
  );

  //! NAME
  const [name, setName] = useLocalStorage(LocalStorage.userName, "");

  //! BLUETOOTH
  const Bluetooth = useBluetooth(
    Constants.BluetoothServiceId,
    Constants.BluetoothCharacteristicId
  );

  //! HOUR LOGS
  const [hourLogs, loadingHourLogs] = useFHWatchQuery(FH.HourLog, [
    device?.last_load_weather,
  ]);

  //! EXPANDED
  const [expanded, setExpanded] = useS(true);

  //! LOADING
  const loading = useInitialLoading();
  // loadingAdminSettings,
  // loadingUser,
  // loadingMyUser,
  // loadingDevice,
  // loadingHourLogs

  //! PAGES
  if (loading) return <LoadingPage />;
  if (adminSettings === null && !Constants.Offline) return <QuasarPage />;
  if (adminSettings?.quasar && !Constants.Offline) return <QuasarPage />;
  if (Config.hasSignIn) {
    if (user === null) return <SignInPage />;

    if (Config.hasEmailVerification && !user.emailVerified) {
      return <EmailVerificationPage user={user} />;
    }

    if (Config.hasRegister && !Constants.Offline) {
      if (myUser === null) return <RegisterPage user={user} />;
    }
  }

  return (
    <FHContext
      value={{
        adminSettings,
        myUser,
        device,
        Bluetooth,
        firstVisit,
        setFirstVisit,
        name,
        setName,
        hourLogs,
        expanded,
        setExpanded,
      }}
    >
      <PageWrapper />

      <MyModal
        useModal={needRefilModal}
        classNameChildren="wf csc-4 !p-0 t-gray bg-white rounded-xl"
      >
        <div className="wf csc py-2 bg-red rounded-t-xl">
          <WarningIcon size={40} />
        </div>
        <p className="t76">Warning!</p>
        <p className="t44">Reservoir needs a refill</p>
        <MyButton
          label="STOP"
          className="bg-red t-white mt-4"
          onClick={closeNeedRefilModal}
        />
        <div className="h-4"></div>
      </MyModal>
    </FHContext>
  );
};

export default FHWrapper;
