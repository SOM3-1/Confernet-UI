/* This code snippet is a React component named `Home` that represents a dashboard or home page of a
web application. Here's a breakdown of what the code is doing: */
import React, { useEffect, useState } from "react";
import { CssBaseline, Box, Container } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase/firebaseConfig";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentView from "./ContentView";
import SnackbarAlert from "./SnackbarAlert";

const Home = () => {
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Home");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
  const [selectedEventId, setSelectedEventId] = useState(null);


  useEffect(() => {
    localStorage.removeItem("signupInProgress");
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      setSnackbar({ open: true, message: "Logout successful!", type: "success" });
      navigate("/login");
    } catch (error) {
      setSnackbar({ open: true, message: "Logout failed.", type: "error" });
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header onDrawerOpen={() => setDrawerOpen(true)} onLogout={handleLogout} />
      <Sidebar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container>
          <ContentView
            selectedTab={selectedTab}
            selectedEventId={selectedEventId}
            onSelectEvent={setSelectedEventId}
            onBack={() => setSelectedEventId(null)}
          />

        </Container>
      </Box>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default Home;
