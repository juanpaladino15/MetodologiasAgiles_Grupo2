
//para instalar firebase al proyecto npm install firebase 

import { initializeApp } from "firebase/app";

import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA6bvsBEjWfSZbUKPw7rFpt5MY2NOsRmQ8",
  authDomain: "g2agiles2022.firebaseapp.com",
  projectId: "g2agiles2022",
  storageBucket: "g2agiles2022.appspot.com",
  messagingSenderId: "804659025270",
  appId: "1:804659025270:web:024550fa5ca36a4e025657"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)