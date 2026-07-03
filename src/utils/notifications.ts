import { getToken } from "firebase/messaging";
import { getFirebaseMessaging} from "../firebase/config";
import { baseUrl } from "@/config/api";
import { authHeaders } from "./Functions";


const sendTokenToServer = async (token: string) => {
  try {
    const response = await fetch(`${baseUrl}/notifications/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...await authHeaders()
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error("Failed to send token to server");
    }
  } catch (error) {
    console.error("Error sending token to server:", error);
  }
};

export async function enableNotifications() {

  const messaging = await getFirebaseMessaging();

  const permission = await Notification.requestPermission();

  if(!messaging){
    throw new Error("Firebase messaging is not supported in this browser");
  }

  if (permission !== "granted") {
    throw new Error("Notification permission denied");
  }


  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
  });

  // call the function to send the token to your server
  await sendTokenToServer(token);

  if (!token) {
    throw new Error("No token generated");
  }


  console.log("FCM TOKEN:", token);


  return token;
}