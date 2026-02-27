// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA602I889fAducN7X0qTyUlbzBny2BLqg",
  authDomain: "affordit-9f8a0.firebaseapp.com",
  projectId: "affordit-9f8a0",
  storageBucket: "affordit-9f8a0.firebasestorage.app",
  messagingSenderId: "241912838272",
  appId: "1:241912838272:web:ef8a778e82cec91b390e65",
  measurementId: "G-4NVM09SXBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)