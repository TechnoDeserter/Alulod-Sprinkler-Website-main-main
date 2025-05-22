import { FieldValue } from "firebase-admin/firestore";

export default function serverTimestamp() {
  return FieldValue.serverTimestamp();
}
