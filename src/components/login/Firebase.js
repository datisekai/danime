// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClxUwpz6r6Ib4RbMhYqm7XWLavZHJjx6Q",
  authDomain: "danime-c49f3.firebaseapp.com",
  projectId: "danime-c49f3",
  storageBucket: "danime-c49f3.appspot.com",
  messagingSenderId: "527568071796",
  appId: "1:527568071796:web:1506f06f6c91f5cac6f521",
  measurementId: "G-6QTPQGEH4D",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();
export const db = getFirestore(app);

// try {
//   const docRef = addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
