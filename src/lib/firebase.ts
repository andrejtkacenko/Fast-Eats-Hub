import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "fast-eats-hub",
  appId: "1:525071735816:web:f0dc4b4230caa6a7d5c5bd",
  storageBucket: "fast-eats-hub.firebasestorage.app",
  apiKey: "AIzaSyAVg9V5LUkPv0ly-VqZY0xAkT5gvM5stp4",
  authDomain: "fast-eats-hub.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "525071735816"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
