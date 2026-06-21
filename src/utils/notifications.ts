import { getToken } from "firebase/messaging";
import { messaging } from "../firebase/config";


export async function enableNotifications() {

  const permission = await Notification.requestPermission();


  if (permission !== "granted") {
    throw new Error("Notification permission denied");
  }


  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
  });


  if (!token) {
    throw new Error("No token generated");
  }


  console.log("FCM TOKEN:", token);


  return token;
}