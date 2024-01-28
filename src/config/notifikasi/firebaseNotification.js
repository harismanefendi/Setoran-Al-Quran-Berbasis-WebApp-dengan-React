// firebaseNotification.js
import { messaging } from "../firebase/index";

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          return messaging.getToken();
        } else {
          throw new Error("Permission not granted");
        }
      })
      .then((firebaseToken) => {
        console.log(`I have the token: ${firebaseToken}`);
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });
