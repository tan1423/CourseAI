// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "al-generator-course.firebaseapp.com",
  projectId: "al-generator-course",
  storageBucket: "al-generator-course.appspot.com",
  messagingSenderId: "477615667399",
  appId: "1:477615667399:web:48e3f611c8586e84b8a6e2",
  measurementId: "G-GFLQTQ60K1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)