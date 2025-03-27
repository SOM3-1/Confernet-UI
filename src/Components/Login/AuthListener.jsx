import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { auth } from "./../../firebase/firebaseConfig";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

export const AuthListener = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const isSignupPending = localStorage.getItem("signupInProgress") === "true";

  useEffect(() => {
    if (!authChecked) return;
  
    const publicRoutes = ["/", "/login", "/signup"];
    const isPublic = publicRoutes.includes(location.pathname);
  
    const timeout = setTimeout(() => {
      if (user && isPublic && !isSignupPending) {
        navigate("/home", { replace: true });
      } else if (!user && !isPublic) {
        navigate("/login", { replace: true });
      }
    }, isSignupPending ? 1000 : 0);
  
    return () => clearTimeout(timeout);
  }, [authChecked, user, location.pathname, navigate]);
  

  if (!authChecked) return <LoadingSpinner />;

  return <Outlet />;
};
