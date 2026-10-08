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

  const {title, body, link} = payload.data;

  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: '/cards.png' 
  // };
  self.registration.showNotification(
    title,
    {
      body,
      icon: '/cards.png',
      data: {
        link
      }
    }
  );

  self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const link = event.notification.data?.link;

  if (!link) {
    return;
  }

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {

      for (const client of clientList) {
        if ("focus" in client) {
          client.navigate(link);
          return client.focus();
        }
      }

      return clients.openWindow(link);
    })
  );
});


});