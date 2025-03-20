import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography, Paper, Snackbar, Alert } from "@mui/material";
import "./style.css";

function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(""); // Message text
  const [alertType, setAlertType] = useState("success"); // Default success
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMessage("Logout successful! Redirecting to login...");
      setAlertType("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 sec
    } catch (error) {
      setMessage("Logout failed. Please try again.");
      setAlertType("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Paper elevation={3} className="auth-box">
        <Typography variant="h3" align="center" className="app-title">
          Welcome to ConferNet
        </Typography>
        <Typography variant="h5" align="center">
          You are logged in.
        </Typography>
        <Button onClick={handleLogout} variant="contained" color="secondary" fullWidth>
          Logout
        </Button>
      </Paper>

      {/* Snackbar Alert for Logout Success or Failure */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertType} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Home;
