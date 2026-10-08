// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import {getMessaging, isSupported } from "firebase/messaging"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//const messaging = getMessaging(app);

export async function getFirebaseMessaging() {

  if (!window.isSecureContext) {
    console.warn("Firebase Messaging requires a secure context.");
    return null;
  }


  try {
    const supported = await isSupported();

    if (!supported) {
      console.warn("Firebase Messaging is not supported in this browser.");
      return null;
    }

    return getMessaging(app);
  } catch (error) {
    console.warn("Firebase Messaging unavailable:", error);
    return null;
  }

  // if (!(await isSupported())) {
  //   console.warn("Firebase Messaging is not supported in this browser.");
  //   return null;
  // }

  // return getMessaging(app);
}

export { app, analytics,  logEvent };