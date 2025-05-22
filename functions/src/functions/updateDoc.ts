import { FieldValue, getFirestore, UpdateData } from "firebase-admin/firestore";

export default async function updateDoc<T extends {}>(
  docPath: string,
  updates: { [K in keyof T]?: UpdateData<T[K]> | FieldValue | undefined }
) {
  if (!updates) return;

  await getFirestore().doc(docPath).update(updates);
}
