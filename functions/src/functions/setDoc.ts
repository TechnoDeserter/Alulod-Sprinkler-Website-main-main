import { FieldValue, getFirestore, UpdateData } from "firebase-admin/firestore";

export async function setDoc<T extends {}>(
  docPath: string,
  data: { [K in keyof T]?: UpdateData<T[K]> | FieldValue | undefined }
) {
  await getFirestore().doc(docPath).set(data);
}
