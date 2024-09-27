// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD20O2ROwbKojKhHWro1IzuW3j0RzX9OVg",
  authDomain: "foms-f43e6.firebaseapp.com",
  projectId: "foms-f43e6",
  storageBucket: "foms-f43e6.appspot.com",
  messagingSenderId: "168736804966",
  appId: "1:168736804966:web:e7bfd5ead78def472b5da7",
  measurementId: "G-MHKEP92RSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
