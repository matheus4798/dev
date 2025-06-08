import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAD2mC0EH3PTRK7QW33Dt27rBSKXyKcIDc",
  authDomain: "prova2-rafael.firebaseapp.com",
  projectId: "prova2-rafael",
  storageBucket: "prova2-rafael.firebasestorage.app",
  messagingSenderId: "401158866147",
  appId: "1:401158866147:web:db95a8677a7a82f78f71d6",
  measurementId: "G-N12SS4RVK2"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);   
const auth = getAuth(app);      

export { db, auth };
