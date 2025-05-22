import { Pages, PageWrapperContext } from "@/app/helpers/PageWrapper";
import ReservoirStatusIcons from "./ReservoirStatusIcons";
import SunIcon from "./SunIcon";
import { useC } from "@/hooks/useReactHooks";

interface UpperExpandedProps {
  onBack: () => void;
  name: string;
  dateStr: string;
  timeStr: string;
  location1: string;
  location2: string;
  currentTemperature: string | number;
  currentWindSpeed: string | number;
  currentReservoir: string;
  soilMoisture: number;
}

const UpperExpanded: React.FC<UpperExpandedProps> = ({
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
}) => {
  const { setPage } = useC(PageWrapperContext);

  return (
    <div
      className="wf csc bg-aspect-ratio pt-5 pb-8 rounded-b-3xl px-5"
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/*//! BACK */}
      <div className="wf rbs-2">
        <p className="t33 underline cp" onClick={onBack}>
          {"<- Dashboard"}
        </p>
        <p className="t33 underline cp" onClick={() => setPage(Pages.AI)}>
          {"Predict Water AI"}
        </p>
      </div>

      {/*//! HEADER */}
      <div className="relative wf rbc pt-10 sn">
        <div className="css wf">
          <p className="t86">Hello, User</p>
          <p className="t42">Today is {dateStr}</p>
        </div>
        <div className="sn absolute right-0 pointer-events-none">
          <SunIcon size={220} />
        </div>
      </div>

      {/*//! BIG BOX */}
      <div className="w-80 csc t-gray bg-white rounded-2xl pt-5 mt-16 shadow-lg">
        <p className="t67">{location1}</p>
        <p className="t44">{location2}</p>
        <p
          className="-translate-y-5"
          style={{
            fontSize: "7rem",
            fontWeight: 600,
          }}
        >
          {currentTemperature}°
        </p>
        <p className="t44 -translate-y-12">as of</p>
        <p className="t66 -translate-y-10 h-2">{timeStr}</p>
        <div className="rsc-2 mt-4">
          <p className="t64 o-75">Soil Moisture:</p>
          <p className="t66">{soilMoisture}%</p>
        </div>
        <div className="rsc-2 mt-2">
          <p className="t64 o-75">Reservoir:</p>
          <ReservoirStatusIcons />
        </div>
      </div>
    </div>
  );
};

export default UpperExpanded;
