import { twMerge } from "tailwind-merge";
import CircleColorIcons from "./CircleColor";
import ReservoirStatusIcons from "./ReservoirStatusIcons";
import SunIcon from "./SunIcon";
import { Pages, PageWrapperContext } from "@/app/helpers/PageWrapper";
import { useC } from "@/hooks/useReactHooks";
import { FHContext } from "@/app/templates/FH_Wrapper";

interface UpperCollapsedProps {
  onBack: () => void;
  name: string;
  dateStr: string;
  timeStr: string;
  location1: string;
  location2: string;
  currentTemperature: string | number;
  currentWindSpeed: string | number;
  currentReservoir: "Low" | "Medium" | "High";
  soilMoisture: number;
  withBottom?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const UpperCollapsed: React.FC<UpperCollapsedProps> = ({
  onBack,
  name,
  dateStr,
  timeStr,
  location1,
  location2,
  currentTemperature,
  currentWindSpeed,
  currentReservoir,
  soilMoisture,
  withBottom = false,
  children,
  className,
}) => {
  const { setPage } = useC(PageWrapperContext);

  return (
    <div
      className={twMerge(
        "wf csc bg-aspect-ratio pt-5",
        withBottom ? "rounded-b-3xl" : "min-hs",
        className
      )}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/*//! BACK */}
      <div className="wf rbs-2 px-8">
        <p className="t33 underline cp" onClick={onBack}>
          {"<- Dashboard"}
        </p>
        <p className="t33 underline cp" onClick={() => setPage(Pages.AI)}>
          {"Predict Water AI"}
        </p>
      </div>

      {/*//! HEADER */}
      <div className="relative wf rbc pt-2 px-8">
        <div className="csc wf">
          <p className="t86">Hello, User</p>
          <p className="t42">Today is {dateStr}</p>
        </div>
      </div>

      <div className="wf rbc px-8">
        <div className="-translate-x-5">
          <SunIcon size={130} />
        </div>
        <p
          className=""
          style={{
            fontSize: "4rem",
            fontWeight: 600,
          }}
        >
          {currentTemperature}°
        </p>
        <div className="csc-2">
          <div className="csc">
            <p className="t45">{location1}</p>
            <p className="t22">{location2}</p>
          </div>
          <div className="csc">
            <p className="t22">as of</p>
            <p className="t45">{timeStr}</p>
          </div>
        </div>
      </div>

      {/*//! LINE */}
      <hr className={twMerge("wf t-white", !withBottom && "pb-8")} />

      {/*//! BOTTOM */}
      {withBottom && (
        <div className="wf rbc px-8 pb-8">
          <div className="rsc-2">
            <p className="t64 o-75">Soil Moisture:</p>
            <p className="t66">{soilMoisture}%</p>
          </div>
          <div className="rsc-2">
            <p className="t64 o-75">Reservoir:</p>
            <ReservoirStatusIcons />
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default UpperCollapsed;
