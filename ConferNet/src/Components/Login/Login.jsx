import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, MenuItem, Snackbar, Alert } from "@mui/material";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("attendee");
  const [message, setMessage] = useState(""); // Store error/success message
  const [alertType, setAlertType] = useState("error"); // Default to error
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
      setAlertType("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/home"), 2000); // Navigate to home after 2 sec
    } catch (error) {
      setMessage(getFirebaseErrorMessage(error.code));
      setAlertType("error");
      setOpenSnackbar(true);
    }
  };

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email format. Please enter a valid email.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-credential":
        return "Invalid credentials. Check your email and password.";
      default:
        return "An error occurred. Please try again.";
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
          <TextField select fullWidth margin="normal" label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="attendee">Attendee</MenuItem>
            <MenuItem value="organizer">Organizer</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </form>
      </Paper>

      {/* Snackbar Alert for Error and Success Messages */}
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

export default Login;
