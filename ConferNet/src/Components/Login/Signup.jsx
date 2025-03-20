import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, MenuItem, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("attendee");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Signup successful! Redirecting to login...");
      setAlertType("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login page
    } catch (error) {
      setMessage(getFirebaseErrorMessage(error.code));
      setAlertType("error");
      setOpenSnackbar(true);
    }
  };

  const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Email is already registered. Try logging in.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "Invalid email format. Please enter a valid email.";
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
        <Typography variant="h4" align="center" className="app-title">ConferNet Signup</Typography>
        <form onSubmit={handleSignup}>
          <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <TextField select fullWidth margin="normal" label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="attendee">Attendee</MenuItem>
            <MenuItem value="organizer">Organizer</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>Signup</Button>
        </form>

        {/*  Add Login Link Below Signup Button */}
        <Typography align="center" style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}>
            Login here
          </Link>
        </Typography>
      </Paper>

      {/* Snackbar Alert for Errors & Success */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={alertType} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Signup;
