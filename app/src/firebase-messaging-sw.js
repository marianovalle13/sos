importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '883269818599',
});

const messaging = firebase.messaging();
// console.log(1);
// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log(2);
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   var notificationTitle = 'Background Message Title';
//   var notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/assets/imgs/logo.png'
//   };
//
//   console.log(3);
//
//   return self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
