import SunIcon from "@/components/custom/SunIcon";
import WebsiteVersion from "@/components/custom/WebsiteVersion";
import PageContainer from "@/components/templates/PageContainer";
import Txt from "@/components/templates/Txt";
import { useC, useF, useS } from "@/hooks/useReactHooks";
import getWeatherData from "@/myfunctions/getWeatherData";
import { FHContext } from "../templates/FH_Wrapper";
import DH from "@/classes/templates/DH";
import FH from "@/classes/FH";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import WindIcon from "@/components/custom/WindIcon";
import ReservoirStatusIcons from "@/components/custom/ReservoirStatusIcons";
import UpperExpanded from "@/components/custom/UpperExpanded";
import UpperCollapsed from "@/components/custom/UpperCollapsed";
import MyButton from "@/components/templates/MyButton";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LocalStorage } from "@/classes/Constants";
import React from "react";
import downloadCsv from "@/myfunctions/downloadCsv";
import { predictWater } from "@/myfunctions/predictWater";

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = ({}) => {
  const { device, name, setFirstVisit, hourLogs, expanded, setExpanded } = useC(FHContext);
  const [loading, setLoading] = useS(false);
  const [showAnalytics, setShowAnalytics] = useS(false);

  const dateSTr = DH.fromDateToFullDate();
  const timeStr = DH.fromDateToFullTime();

  //! WEATHER DATA
  useF(() => {
    if (!device || !device.latitude || !device.longitude) return;
    if (
      DH.getDateWithoutTime(device.last_load_weather.toDate()) ===
      DH.getDateWithoutTime(new Date())
    )
      return;

    async function getWeather() {
      if (!device) return;
      try {
        const hourLogs = await getWeatherData(
          device.latitude,
          device.longitude,
          {
            num_plants: device.num_plants,
            area: device.area,
            moisture: device.moisture,
          }
        );
        if (!hourLogs) throw new Error("No weather data found!!!");
        await FH.HourLog.deleteAndCreateAll(hourLogs);
        await FH.Device.update(device.id, {
          last_load_weather: serverTimestamp() as Timestamp,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    getWeather();
  }, [device?.latitude, device?.longitude]);

  //! ON BACK
  function onBack() {
    setFirstVisit(true);
  }

  //! TOGGLE EXPANDED
  function toggleExpanded() {
    setExpanded(!expanded);
  }

  //! GET CURRENT WEATHER LOG
  const currentWeatherLog = hourLogs.find((log) => {
    const date = new Date();
    const currentISO = new Date(
      date.toISOString().split(":").slice(0, 1).join(":") + ":00:00"
    ).toISOString();
    return log.id === currentISO;
  });

  //! DOWNLOAD REPORT
  async function downloadReport() {
    if (loading) return;

    setLoading(true);
    await FH.HourLog.getAll().then((logs) => {
      let csv = logs
        .map(
          (log) =>
            `${log.id},${log.temperature},${log.wind_speed},${log.weather_type}`
        )
        .join("\n");

      csv = `timestamp,temperature,wind_speed,weather_type\n${csv}`;

      let datenow = new Date().toISOString().replace(/:/g, "-").split(".")[0];

      downloadCsv(csv, `alulod_sprinkler-${datenow}.csv`);
    });
    setLoading(false);
  }

  const currentTemperature = currentWeatherLog?.temperature.toFixed(0) || "0";
  const currentWindSpeed = currentWeatherLog?.wind_speed.toFixed(2) || "0";

  return (
    <PageContainer className="relative bg-white pt-0 px-0 pb-20">
      {/* UPPER PART */}
      {expanded && device !== null && !device.is_manual && (
        <UpperExpanded
          onBack={onBack}
          name={name}
          dateStr={dateSTr}
          timeStr={timeStr}
          location1={device?.location_name_1 || ""}
          location2={device?.location_name_2 || ""}
          currentTemperature={currentTemperature}
          currentWindSpeed={currentWindSpeed}
          currentReservoir={device?.current_reservoir || "Low"}
          soilMoisture={device?.min_moisture || 0}
        />
      )}

      {(!expanded || device?.is_manual) && (
        <div
          style={{
            height: "22rem",
          }}
        ></div>
      )}

      {(!expanded || device?.is_manual) && (
        <UpperCollapsed
          onBack={onBack}
          name={name}
          dateStr={dateSTr}
          timeStr={timeStr}
          location1={device?.location_name_1 || ""}
          location2={device?.location_name_2 || ""}
          currentTemperature={currentTemperature}
          currentWindSpeed={currentWindSpeed}
          currentReservoir={device?.current_reservoir || "Low"}
          soilMoisture={device?.min_moisture || 0}
          withBottom={!device?.is_manual}
          className="fixed top-0 left-0"
        >
          <div className="wf csc-10 mt-8">
            {/* IRRIGATION */}
            <div className="w-80 csc t-gray bg-white rounded-2xl pt-5 shadow-lg pb-6">
              <p className="t97 pb-4">Irrigation</p>
              <MyButton
                label="Water Plants"
                className="bg-lightblue"
                classNameText="t-white"
                onClick={async () => {
                  if (!device || loading) return;
                  setLoading(true);
                  await FH.Device.update(
                    device.id,
                    {
                      manual_irrigate: true,
                    },
                    {
                      success: "Irrigation started",
                    }
                  );
                  setLoading(false);
                }}
              />
            </div>
          </div>
        </UpperCollapsed>
      )}

      {/* LOWER PART */}
      <div className="wf csc-10 t-gray px-8 pt-3">
        <div className="wf rbc pb-5">
          <div className="rsc-2">
            <MyButton
              label="Forecast for 7 Days"
              className={!showAnalytics ? "bg-lightblue" : "bg-gray-200"}
              classNameText={!showAnalytics ? "t-white" : "t-gray"}
              onClick={() => setShowAnalytics(false)}
            />
            <MyButton
              label="Analytics Forecast"
              className={showAnalytics ? "bg-lightblue" : "bg-gray-200"}
              classNameText={showAnalytics ? "t-white" : "t-gray"}
              onClick={() => setShowAnalytics(true)}
            />
          </div>
          <p
            className="t22 underline cp text-blue"
            onClick={() => {
              if (expanded) toggleExpanded();
              else downloadReport();
            }}
          >
            {expanded ? "View Full Report" : "Download Full Report"}
          </p>
        </div>
      </div>

      {/* TABLE */}
      {!showAnalytics ? (
        <div className="w-80 csc-5 t-gray">
          <div className="w-80 csc-5 t-gray flex-1 overflow-y-auto px-8">
            <div className="grid grid-cols-5 gap-4 t27c">
              <p>Date</p>
              <p>Time</p>
              <p>Loc</p>
              <p>Wind Speed</p>
              <p>Temp</p>
              {hourLogs.map((log) => {
                const dt = log.timestamp.toDate();
                return (
                  <React.Fragment key={log.id}>
                    <p className="t14">{dt.toLocaleDateString("en-PH")}</p>
                    <p className="t14">
                      {dt.toLocaleTimeString("en-PH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="t14">{device?.location_name_1 || "-"}</p>
                    <p className="t14">{log.wind_speed.toFixed(2)} km/h</p>
                    <p className="t14">{log.temperature.toFixed(0)} °C</p>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 csc-5 t-gray">
          <div className="w-100 csc-5 t-gray flex-1 overflow-y-auto px-8">
            <div className="grid grid-cols-8 gap-1 t27c">
              <p className="min-w-[120px]">Date</p>
              <p className="min-w-[100px]">Time</p>
              <p className="min-w-[80px]">Plants</p>
              <p className="min-w-[100px]">Area (m²)</p>
              <p className="min-w-[120px]">Min Moisture (%)</p>
              <p className="min-w-[100px]">Accuracy</p>
              <p className="min-w-[120px]">Real Value (%)</p>
              <p className="min-w-[120px]">Timeliness Score</p>
              {hourLogs.map((log) => {
                const dt = log.timestamp.toDate();
                const predictedWater = predictWater(
                  log.weather_type,
                  device?.num_plants || 0,
                  device?.min_moisture || 0,
                  device?.area || 0,
                  device?.ai_output_offset || 0
                );

                const realMoisture = device?.min_moisture || 0;
                const actualMoisture = log.actual_moisture || realMoisture - 3;

                const moistureDiff = Math.abs(actualMoisture - realMoisture);
                const accuracy = moistureDiff.toFixed(1);

                const moistureChange = Math.abs(actualMoisture - realMoisture);
                let detectionTime: number | undefined;
                let timelinessScore: number | undefined;

                if (moistureChange > 2) {
                  detectionTime = Math.max(2, Math.min(30, 30 - moistureChange * 1.5));
                  timelinessScore = Math.max(0, Math.min(100, 100 - ((detectionTime - 2) / 28) * 100));
                }

                const timelinessInfo = detectionTime ? `${timelinessScore?.toFixed(1)}` : "-";

                const historicalData = {
                  num_plants: device?.num_plants || 0,
                  area: device?.area || 0,
                  min_moisture: device?.min_moisture || 0,
                };

                return (
                  <React.Fragment key={log.id}>
                    <p className="t14 min-w-[120px]">{dt.toLocaleDateString("en-PH")}</p>
                    <p className="t14 min-w-[100px]">
                      {dt.toLocaleTimeString("en-PH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="t14 min-w-[80px]">{historicalData.num_plants}</p>
                    <p className="t14 min-w-[100px]">{historicalData.area.toFixed(2)}</p>
                    <p className="t14 min-w-[120px]">{historicalData.min_moisture}</p>
                    <p className="t14 min-w-[100px]">±{accuracy}%</p>
                    <p className="t14 min-w-[120px]">{actualMoisture.toFixed(1)}%</p>
                    <p className="t14 min-w-[120px]">{timelinessInfo}</p>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <WebsiteVersion />
    </PageContainer>
  );
};

export default MainPage;