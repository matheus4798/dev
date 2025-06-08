import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDJEsLK9oQKf1tPzmrNskudOs5PWg240y4",
  authDomain: "apppiunipam-matheus.firebaseapp.com",
  projectId: "apppiunipam-matheus",
  storageBucket: "apppiunipam-matheus.firebasestorage.app",
  messagingSenderId: "192970524974",
  appId: "1:192970524974:web:df9413519357bf8e86d2bf",
  measurementId: "G-RLVCCGWWTQ"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);   
const auth = getAuth(app);      

export { db, auth };
