//DO NOT SHARE THIS TO PUBLICLY
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdBO5Utbs2ErbBv8iLjizC86-4qY5d2jw",
  authDomain: "explore-email-password-a-2e026.firebaseapp.com",
  projectId: "explore-email-password-a-2e026",
  storageBucket: "explore-email-password-a-2e026.firebasestorage.app",
  messagingSenderId: "211682707460",
  appId: "1:211682707460:web:1da93802dd23f78bea0d51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);