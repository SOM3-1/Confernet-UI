import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {auth} from "./../../firebase/firebaseConfig";

export const AuthListener = () => {
  const [user, setUser] = useState(undefined); 
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  const protectedRoutes = [
    "/home",
    "/account",
    "/people",
    "/messages",
    "/MyContent",
    "/schedule",
    "/mySchedule",
    "/venue",
    "/session",
  ];

  if (!user && protectedRoutes.includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  if (user && (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/")) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
