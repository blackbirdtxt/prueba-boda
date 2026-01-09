// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRdQAFHIpamArGhV0h9MGwn0XsMvJtmho",
  authDomain: "invitaciones-boda-9a4f4.firebaseapp.com",
  projectId: "invitaciones-boda-9a4f4",
  storageBucket: "invitaciones-boda-9a4f4.firebasestorage.app",
  messagingSenderId: "113074939395",
  appId: "1:113074939395:web:089a54205465a74ce2d036"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);