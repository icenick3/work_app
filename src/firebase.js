import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB9VRJQNH-N6SykFcq3w9XVy4XzIQwtVOg",
    authDomain: "zone3000-33f86.firebaseapp.com",
    projectId: "zone3000-33f86",
    storageBucket: "zone3000-33f86.appspot.com",
    messagingSenderId: "828463819987",
    appId: "1:828463819987:web:883a45937184e3c8153826"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);