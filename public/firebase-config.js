// public/firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyDrBxnNoubtRA59bmrg_tv9AGzfjYPH-cE",
  authDomain: "nectar-86df2.firebaseapp.com",
  projectId: "nectar-86df2",
  storageBucket: "nectar-86df2.appspot.com",
  messagingSenderId: "408821140965",
  appId: "1:408821140965:web:11d19e67dfb3e0c63fb30c"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Rendre accessibles globalement
window.auth = firebase.auth();
window.db = firebase.firestore();
