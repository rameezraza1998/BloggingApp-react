import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRXLQ2JdB1HY_UdhUHqK5l2oujJLWEvPc",
  authDomain: "blogging-app-cccdf.firebaseapp.com",
  projectId: "blogging-app-cccdf",
  storageBucket: "blogging-app-cccdf.firebasestorage.app",
  messagingSenderId: "906180223094",
  appId: "1:906180223094:web:6e46bd83e86fbff9d3ff57",
  measurementId: "G-KHWC1SN71B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication 
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);