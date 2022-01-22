// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDNimBoVNusjswgO6smOG70pvqR33hKeFY",
  authDomain: "danime-b7944.firebaseapp.com",
  projectId: "danime-b7944",
  storageBucket: "danime-b7944.appspot.com",
  messagingSenderId: "1060955780850",
  appId: "1:1060955780850:web:459db93b2f13157fcbc26b",
  measurementId: "G-1EMJJ48SGX",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();
export const db = getFirestore();



