/* This code snippet is a React component named `Login` that represents a login form for a web
application. Here's a breakdown of what the code is doing: */
import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, MenuItem, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      localStorage.setItem("userId", userId);
      setMessage("Login successful! Redirecting...");
      setAlertType("success");
      setOpenSnackbar(true);
    } catch (error) {
      setMessage("Invalid email or password. Please try again.");
      setAlertType("error");
      setOpenSnackbar(true);
    }finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm" className="auth-container">
      <Paper elevation={3} className="auth-box">
        <Typography variant="h4" align="center" className="app-title">ConferNet Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </form>

        <Typography align="center" style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}>
            Sign up here
          </Link>
        </Typography>
      </Paper>
            {loading && 
          <LoadingSpinner /> }

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={alertType} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
