// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIxVgVum4_9eSBrqyGBKIQdPYSXbDAPn0",
  authDomain: "playspa-25ac0.firebaseapp.com",
  projectId: "playspa-25ac0",
  storageBucket: "playspa-25ac0.firebasestorage.app",
  messagingSenderId: "730028488208",
  appId: "1:730028488208:web:9af891ee591dff6c8cfc95",
  measurementId: "G-5CENK3KXX1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);