// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);