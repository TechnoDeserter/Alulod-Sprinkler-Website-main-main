import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getMessaging, isSupported } from "firebase/messaging"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyvVJJGtdd_SW6bibHF-CYYmN9pIMNt3g",
  authDomain: "alulod-sprinkler.firebaseapp.com",
  projectId: "alulod-sprinkler",
  storageBucket: "alulod-sprinkler.firebasestorage.app",
  messagingSenderId: "766646404662",
  appId: "1:766646404662:web:a1495b6ff910d1d2627a97"
};;

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported()
    if (isSupportedBrowser) {
      return getMessaging(app)
    }
    return null
  } catch (err) {
    console.log(err)
    return null
  }
})()
