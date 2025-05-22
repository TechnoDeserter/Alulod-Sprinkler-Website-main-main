// import { Device } from "../../../classes/Device";
// import DateTime from "../classes/DateTime";
// import { setDoc } from "../functions/setDoc";
// import print from "../functions/print";
// import { FieldValue, getFirestore, Timestamp } from "firebase-admin/firestore";

// export interface Logs {
//   id: string;
//   timestamp: Timestamp;
//   type: "exterminated" | "low_battery" | "full_bin";
// }

// export default async function updateLogs(oldData: Device, newData: Device) {
//   const docId = DateTime.now().getTime();
//   print("updateLogs");
//   await exterminated(oldData, newData, docId);
//   await full_bin(newData, docId + 1);
//   await low_battery(oldData, newData, docId + 2);
// }

// async function exterminated(oldData: Device, newData: Device, docId: number) {
//   if (oldData.total_rats_killed + 1 === newData.total_rats_killed) {
//     await setDoc<Logs>(`logs/${docId}`, {
//       id: `${docId}`,
//       timestamp: FieldValue.serverTimestamp(),
//       type: "exterminated",
//     });
//     print(`Updated logs/${docId} by exterminated`);
//   }
// }

// async function full_bin(newData: Device, docId: number) {
//   if (newData.total_rats_bag >= newData.max_bin) {
//     await setDoc<Logs>(`logs/${docId}`, {
//       id: `${docId}`,
//       timestamp: FieldValue.serverTimestamp(),
//       type: "full_bin",
//     });
//     print(`Updated logs/${docId} by full_bin`);
//   }
// }

// async function low_battery(oldData: Device, newData: Device, docId: number) {
//   if (
//     oldData.battery > newData.low_battery_target &&
//     newData.battery <= newData.low_battery_target
//   ) {
//     await setDoc<Logs>(`logs/${docId}`, {
//       id: `${docId}`,
//       timestamp: FieldValue.serverTimestamp(),
//       type: "low_battery",
//     });
//     print(`Updated logs/${docId} by low_battery`);
//   }
// }
