import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { createContext } from "react";
import { Pages, PageWrapperContext } from "../helpers/PageWrapper";
import { useC, useF, useS } from "@/hooks/useReactHooks";
import SunIcon from "@/components/custom/SunIcon";
import { FHContext } from "../templates/FH_Wrapper";
import capitalizeFirstLetter from "@/myfunctions/capitalizeFirstLetter";
import MyButton from "@/components/templates/MyButton";
import { predictWater } from "@/myfunctions/predictWater";

export const AIPageContext = createContext({});

interface AIPageProps {}

const AIPage: React.FC<AIPageProps> = ({}) => {
  const { device, hourLogs } = useC(FHContext);
  const { setPage } = useC(PageWrapperContext);
  const [predictedWater, setPredictedWater] = useS<number>(0);

  //! GET CURRENT WEATHER LOG
  const currentWeatherLog = hourLogs.find((log) => {
    const date = new Date();
    date.setHours(date.getHours() + 16);
    const currentISO = new Date(
      date.toISOString().split(":").slice(0, 1).join(":") + ":00:00"
    ).toISOString();
    // console.log(date.toISOString().split(":").slice(0, 1).join(":") + ":00:00");
    // console.log("Current ISO:", currentISO);
    return log.id === currentISO;
  });

  const currentWeather = currentWeatherLog?.weather_type || "sunny";
  const numPlants = device?.num_plants || 0;
  const soilMoisture = device?.moisture || 0;
  const area = device?.area || 0;

  useF(() => {
    if (!currentWeatherLog || !device) return;
    const water = predictWater(
      currentWeather,
      numPlants,
      soilMoisture,
      area,
      device.ai_output_offset
    );
    console.log(
      "Current Weather:",
      currentWeather,
      "Num Plants:",
      numPlants,
      "Soil Moisture:",
      soilMoisture,
      "Area:",
      area,
      "Predicted Water:",
      water
    );
    setPredictedWater(water);
  }, [
    currentWeatherLog,
    device,
    currentWeather,
    numPlants,
    soilMoisture,
    area,
  ]);

  function onBack() {
    setPage(Pages.Main);
  }
  return (
    <AIPageContext value={{}}>
      <PageContainer className="pt-5">
        {/*//! BACK */}
        <div className="wf rbs-2">
          <p className="t33 underline cp" onClick={onBack}>
            {"<- Back"}
          </p>
        </div>

        {/*//! LOGO */}
        <div
          className="relative rsc pt-10 pb-20 wf"
          style={{ maxWidth: "35rem" }}
        >
          <p className="t86">AI Water Amount Prediction</p>
          <div className="absolute right-0">
            <SunIcon size={180} />
          </div>
        </div>

        {/*//! TITLE */}
        <div className="csc-5">
          <p className="t86c wf">Parameters</p>
          <div className="wf px-12 css-5">
            <div className="rsc-2">
              <p className="t64 o-75">Weather:</p>
              <p className="t66">{capitalizeFirstLetter(currentWeather)}</p>
            </div>
            <div className="rsc-2">
              <p className="t64 o-75">Number of Plants:</p>
              <p className="t66">{numPlants}</p>
            </div>
            <div className="rsc-2">
              <p className="t64 o-75">Soil Moisture:</p>
              <p className="t66">{soilMoisture.toFixed(0)} %</p>
            </div>
            <div className="rsc-2">
              <p className="t64 o-75">Area of Plant Bed:</p>
              <p className="t66">{area.toFixed(2)} m²</p>
            </div>
          </div>
        </div>
        {/* <MyButton
          label="Predict Amount of Water"
          className="mt-10"
          onClick={() => {}}
        /> */}
        <div className="csc-5 pt-10">
          <p className="t86c wf">Output</p>
          <div className="rsc-2">
            <p className="t64 o-75">Water Amount Prediction:</p>
            <p className="t66">{predictedWater.toFixed(2)} L/hr</p>
          </div>
        </div>
      </PageContainer>
    </AIPageContext>
  );
};

export default AIPage;
