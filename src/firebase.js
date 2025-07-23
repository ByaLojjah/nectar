// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Ton config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDrBxnNoubtRA59bmrg_tv9AGzfjYPH-cE",
  authDomain: "nectar-86df2.firebaseapp.com",
  projectId: "nectar-86df2",
  storageBucket: "nectar-86df2.appspot.com",
  messagingSenderId: "408821140965",
  appId: "1:408821140965:web:11d19e67dfb3e0c63fb30c"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter auth et db pour l'utiliser dans les autres composants
export const auth = getAuth(app);
export const db = getFirestore(app);
