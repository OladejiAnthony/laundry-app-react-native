// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import the following services
import {  getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBD-wZ1WpaV9QjpHeBX8NjXW594MfOfkno",
  authDomain: "laundry-app-dbf4c.firebaseapp.com",
  projectId: "laundry-app-dbf4c",
  storageBucket: "laundry-app-dbf4c.appspot.com",
  messagingSenderId: "936950571867",
  appId: "1:936950571867:web:253c283fcee4fe4444707e",
  measurementId: "G-WTRLJT2G15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//console.log(app)
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

