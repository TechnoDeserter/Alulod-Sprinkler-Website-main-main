import SunIcon from "@/components/custom/SunIcon";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import MyInput from "@/components/templates/MyInput";
import MyButton from "@/components/templates/MyButton";
import PageContainer from "@/components/templates/PageContainer";
import { useInputField } from "@/hooks/useInputField";
import { useC, useS } from "@/hooks/useReactHooks";
import { FHContext } from "../templates/FH_Wrapper";
import FH from "@/classes/FH";

interface FirstVisitPageProps {}

const FirstVisitPage: React.FC<FirstVisitPageProps> = ({}) => {
  const { device, setFirstVisit, name, setName } = useC(FHContext);
  const [loading, setLoading] = useS(false);

  const isManual = device?.is_manual === true;

  const numPlantsInput = useInputField((numPlants: string | undefined) => [
    [!numPlants, "Please enter a number"],
    [isNaN(Number(numPlants)), "Please enter a valid number"],
    [Number(numPlants) <= 0, "Please enter a number greater than 0"],
    [Number(numPlants) % 1 !== 0, "Please enter a whole number"],
  ]);

  const areaInput = useInputField((area: string | undefined) => [
    [!area, "Please enter a number"],
    [isNaN(Number(area)), "Please enter a valid number"],
    [Number(area) <= 0, "Please enter a number greater than 0"],
  ]);

  const moistureInput = useInputField((moisture: string | undefined) => [
    [!moisture, "Please enter a moisture level"],
    [isNaN(Number(moisture)), "Please enter a valid number"],
    [Number(moisture) < 0, "Please enter a number greater than or equal to 0"],
    [Number(moisture) > 100, "Please enter a number less than or equal to 100"],
  ]);

  async function toggleIsManual() {
    if (!device || loading) return;

    setLoading(true);
    await FH.Device.update(device.id, {
      is_manual: !isManual,
      min_moisture: Number(moistureInput.getValue()) || device?.min_moisture || 30,
    });
    setLoading(false);
  }

  async function getStarted() {
    if (!device || loading) return;
    if (!numPlantsInput.verify() || !areaInput.verify() || !moistureInput.verify()) return;

    const num_plants = Number(numPlantsInput.getValue());
    const area = Number(areaInput.getValue());
    const min_moisture = Number(moistureInput.getValue());

    setLoading(true);
    await FH.Device.update(device.id, {
      area,
      num_plants,
      min_moisture,
      is_manual: isManual,
    });
    setName(name);
    setLoading(false);
    setFirstVisit(false);
  }

  return (
    <PageContainer className="pt-0 pb-10">
      {/* LOGO */}
      <SunIcon />

      {/* TITLE */}
      <p className="t96c wf pb-10">Welcome, {name}!</p>

      {/* NUMPLANTS & AREA INPUTS */}
      <div className="rcs-5 w-72">
        <MyInput
          inputField={numPlantsInput}
          label="Number of Plants"
          type="number"
          placeholder="Enter number of plants"
          defaultValue={device?.num_plants?.toString()}
          disabled={loading}
        />
        <MyInput
          inputField={areaInput}
          label="Area of Plant Bed (m²)"
          type="number"
          placeholder="Enter area in square meters"
          defaultValue={device?.area?.toString()}
          disabled={loading}
        />
      </div>

      {/* MOISTURE INPUT */}
      <div className="wf rcs pt-5">
        <MyInput
          inputField={moistureInput}
          label="Moisture Threshold (%)"
          type="number"
          placeholder="Enter minimum moisture percentage"
          defaultValue={device?.min_moisture?.toString()}
          className="w-72"
          disabled={loading}
        />
      </div>

      {/* MODE */}
      <div className="wf csc-3 py-12">
        <div className="wf rce-2">
          <p className="t43 o-75">Mode: </p>
          <p className="t46">{isManual ? "MANUAL" : "AUTO"}</p>
        </div>
        <p className="t32 underline cp" onClick={toggleIsManual}>
          Switch to {isManual ? "Auto" : "Manual"} Mode
        </p>
      </div>

      {/* BUTTON */}
      <MyButton label="Get Started" onClick={getStarted} disabled={loading} />
      <WebsiteVersion />
    </PageContainer>
  );
};

export default FirstVisitPage;