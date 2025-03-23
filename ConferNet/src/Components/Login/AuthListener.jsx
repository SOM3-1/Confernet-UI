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

  useEffect(() => {
    if (!authChecked) return;

    const publicRoutes = ["/", "/login", "/signup"];
    const isPublic = publicRoutes.includes(location.pathname);

    if (user && isPublic) {
      navigate("/home", { replace: true });
    } else if (!user && !isPublic) {
      navigate("/login", { replace: true });
    }
  }, [authChecked, user, location.pathname, navigate]);

  if (!authChecked) return <LoadingSpinner />;

  return <Outlet />;
};
