importScripts(
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
"https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);


firebase.initializeApp({
  apiKey: "AIzaSyDIxVgVum4_9eSBrqyGBKIQdPYSXbDAPn0",
  authDomain: "playspa-25ac0.firebaseapp.com",
  projectId: "playspa-25ac0",
  storageBucket: "playspa-25ac0.firebasestorage.app",
  messagingSenderId: "730028488208",
  appId: "1:730028488208:web:9af891ee591dff6c8cfc95",
  measurementId: "G-5CENK3KXX1"
});


const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload)=>{

  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/cards.png' 
  };
  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

//   self.addEventListener('notificationclick', (event) => {
//   event.notification.close(); // Close the notification banner immediately

//   // URL you want to open
//   const urlToOpen = payload.notification.link; 

//   event.waitUntil(
//     self.clients.matchAll({ type: 'window', includeUncontrolled: true })
//       .then((windowClients) => {
//         // 1. Check if the app/website is already open in a tab
//         for (let i = 0; i < windowClients.length; i++) {
//           const client = windowClients[i];
//           if (client.url === urlToOpen && 'focus' in client) {
//             return client.focus(); // Bring existing tab to front
//           }
//         }
//         // 2. If it's not open, launch a new tab
//         if (self.clients.openWindow) {
//           return self.clients.openWindow(urlToOpen);
//         }
//       })
//   );
// });


});