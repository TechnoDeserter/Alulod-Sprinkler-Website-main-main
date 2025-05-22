// import { FieldValue, getFirestore } from "firebase-admin/firestore";
// import { Device } from "../../../classes/Device";
// import DateTime from "../classes/DateTime";
// import updateDoc from "../functions/updateDoc";
// import { Analytics } from "../../../classes/Analytics";
// import print from "../functions/print";
// import getDoc from "../functions/getDoc";

// export default async function updateChart(oldData: Device, newData: Device) {
//   if (oldData.total_rats_killed != newData.total_rats_killed) {
//     const diff = newData.total_rats_killed - oldData.total_rats_killed;
//     const year = DateTime.now().getFullYear();
//     const monthAbbrev = DateTime.getMonthAbbrev();

//     // const db = getFirestore();

//     await updateDoc<Analytics>(`analytics/${year}`, {
//       [monthAbbrev]: FieldValue.increment(diff),
//     });

//     print(`Updated analytics/${year}/${monthAbbrev} by ${diff}`);
//   }
// }
