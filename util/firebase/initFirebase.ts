// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp} from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtqbsz5KHfSI5FpLfZa98pGqFOCBlg9aE",
  projectId: "project1-bb5e2",
  messagingSenderId: "729098212038",
  appId: "1:729098212038:web:e24b600bb98334d111bdc7",
};

// Initialize Firebase
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
