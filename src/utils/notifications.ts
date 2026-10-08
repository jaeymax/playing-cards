import { getToken } from "firebase/messaging";
import { getFirebaseMessaging} from "../firebase/config";
//import { baseUrl } from "@/config/api";
import { registerDevice } from "./Functions";


// const sendTokenToServer = async (token: string, installationId: string) => {
//   try {
//     const response = await fetch(`${baseUrl}/notifications/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...await authHeaders()
//       },
//       body: JSON.stringify({ token, installationId,
//         platform: /Android/i.test(navigator.userAgent)
//             ? "android"
//             : /iPhone|iPad/i.test(navigator.userAgent)
//             ? "ios"
//             : "desktop",
//         browser: navigator.userAgent,
//        }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to send token to server");
//     }
//   } catch (error) {
//     console.error("Error sending token to server:", error);
//   }
// };

export async function enableNotifications() {

  console.log('before secure context check:', window.isSecureContext);
   if (!window.isSecureContext) {
    console.warn("Push notifications require HTTPS.");
    return null;
  }

  console.log('before service worker check:', 'serviceWorker' in navigator);

  const messaging = await getFirebaseMessaging();

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
  await registerDevice(
    null,
    permission
  );

  return null;
}
console.log('permission', permission)

if(!messaging){
  console.warn("Firebase Messaging is unavailable.");
  return null;
}

  console.log('messaging', messaging)
  const registration = await navigator.serviceWorker.ready;

  console.log('registration', registration)

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });
  
  console.log('token', token)




  if (!token) {
    throw new Error("No token generated");
  }

  await registerDevice(token, "granted");

  console.log("FCM device registered:", token);


  return token;
}