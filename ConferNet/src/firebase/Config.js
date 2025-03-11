// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDdCytUbR-JtVTEX95h1sTdWurQqhsYNUI",
    authDomain: "confernet-ce87a.firebaseapp.com",
    databaseURL: "https://confernet-ce87a-default-rtdb.firebaseio.com",
    projectId: "confernet-ce87a",
    storageBucket: "confernet-ce87a.firebasestorage.app",
    messagingSenderId: "964954855629",
    appId: "1:964954855629:web:56688c918f97e945db3184",
    measurementId: "G-8BLN1TD1EB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
