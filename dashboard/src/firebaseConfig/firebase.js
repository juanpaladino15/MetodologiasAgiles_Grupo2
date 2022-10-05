
//para instalar firebase al proyecto npm install firebase 

import { getFirestore } from "@firebase/firestore"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWImzpXtGFxlT78H4SibJRafdDm7bT1kg",
  authDomain: "trapitos-test.firebaseapp.com",
  projectId: "trapitos-test",
  storageBucket: "trapitos-test.appspot.com",
  messagingSenderId: "548919502851",
  appId: "1:548919502851:web:67704ecbafe85c912bc636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)