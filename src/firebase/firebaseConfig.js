import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdCytUbR-JtVTEX95h1sTdWurQqhsYNUI",
  authDomain: "confernet-ce87a.firebaseapp.com",
  databaseURL: "https://confernet-ce87a-default-rtdb.firebaseio.com",
  projectId: "confernet-ce87a",
  storageBucket: "confernet-ce87a.appspot.com",
  messagingSenderId: "964954855629",
  appId: "1:964954855629:web:56688c918f97e945db3184",
  measurementId: "G-8BLN1T1DEB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
