// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAixp1BEp1QjO5NJggk6jkKYxerWdrailA",
  authDomain: "solo-and-chewie-creations.firebaseapp.com",
  projectId: "solo-and-chewie-creations",
  storageBucket: "solo-and-chewie-creations.appspot.com",
  messagingSenderId: "403488502106",
  appId: "1:403488502106:web:ba4120ed232555ad398363"
};

// 403488502106-f0pi60s38vft2hp3q5654i0auqijtsu6.apps.googleusercontent.com
// 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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth };