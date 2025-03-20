import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, MenuItem, Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("attendee");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful! Redirecting...");
      setAlertType("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/"), 2000); // Redirect to Home Page
    } catch (error) {
      setMessage("Invalid email or password. Please try again.");
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

        {/*  Add Signup Link Below Login Button */}
        <Typography align="center" style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#1976d2", fontWeight: "bold", textDecoration: "none" }}>
            Sign up here
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

export default Login;
