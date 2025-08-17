// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcwuCq_eh6sygkSj3kqEOvZAEI5hW2JKE",
  authDomain: "subspace1-dd761.firebaseapp.com",
  projectId: "subspace1-dd761",
  storageBucket: "subspace1-dd761.firebasestorage.app",
  messagingSenderId: "578869057548",
  appId: "1:578869057548:web:16062349ed018bb691f629",
  measurementId: "G-EF3V8TC6EQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
