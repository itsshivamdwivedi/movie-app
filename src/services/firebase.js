// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu_2qQMZFKkGRWggHbwm49hz4fiW0cL28",
  authDomain: "movie-app-67c70.firebaseapp.com",
  projectId: "movie-app-67c70",
  storageBucket: "movie-app-67c70.appspot.com",
  messagingSenderId: "261251454156",
  appId: "1:261251454156:web:c573a1863476329cdede69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
