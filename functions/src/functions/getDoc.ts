import { getFirestore } from "firebase-admin/firestore";

export default async function getDoc<T>(docPath: string) {
  const docSnapshot = await getFirestore().doc(docPath).get();

  if (!docSnapshot.exists) return null;

  const data = docSnapshot.data() as T;

  if (!data) return null;

  return data;
}
