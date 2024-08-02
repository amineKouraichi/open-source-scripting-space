// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVSLIL_S6WPdC7KVryJNKdlgERKFNCvRo",
  authDomain: "open-source-scripting-space.firebaseapp.com",
  projectId: "open-source-scripting-space",
  storageBucket: "open-source-scripting-space.appspot.com",
  messagingSenderId: "810220839404",
  appId: "1:810220839404:web:53aa991b6ed1481b5020c9",
  measurementId: "G-ET4Y9VTBT0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
