import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAVS-7dnlbNw6e6-WRmAEOVj-1EOKOfo7M",
    authDomain: "vozflex.firebaseapp.com",
    projectId: "vozflex",
    storageBucket: "vozflex.appspot.com",
    messagingSenderId: "997277014934",
    appId: "1:997277014934:web:3382832e5e77ddda479bb7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

