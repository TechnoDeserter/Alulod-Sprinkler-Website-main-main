import { initializeApp } from "firebase-admin/app";
import { setGlobalOptions } from "firebase-functions/v2";

export default function initialize() {
  initializeApp();
  setGlobalOptions({ region: "asia-east1", maxInstances: 10 });
}
