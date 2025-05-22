import { Device } from "../../classes/Device";
import Doc from "./classes/Doc";
// import updateChart from "./custom/updateChart";
// import updateLogs from "./custom/updateLogs";
import initialize from "./functions/initialize";
import saveStorage from "./functions/saveStorage";

initialize();

const deviceDoc = new Doc("device/readings", {} as Device);

exports.deviceDocUpdated = deviceDoc.updated(
  async (oldData, newData, params) => {
    // updateChart(oldData, newData);
    // updateLogs(oldData, newData);
    // saveStorage("qrscanner711.firebasestorage.app", "device/readings.json", newData);
  }
);
