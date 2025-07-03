import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config from the console
const firebaseConfig = {
  apiKey: "AIzaSyD-A0YuhtMhx1EVV05paVUApiakAQWEpZw",
  authDomain: "newsapp-9c37a.firebaseapp.com",
  projectId: "newsapp-9c37a",
  storageBucket: "newsapp-9c37a.firebasestorage.app",
  messagingSenderId: "848925566158",
  appId: "1:848925566158:web:2c507c204bdf4ba2a99c9f",
  measurementId: "G-LX3Y7X15M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
