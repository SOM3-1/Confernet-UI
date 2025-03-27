/**
 * The `Signup` function in this code snippet handles user registration by capturing user input,
 * creating a new account with Firebase authentication, and storing user details in a database.
 * @returns The `Signup` component is being returned. It contains a form for user signup with fields
 * for name, email, password, role, date of birth, phone number, organization, job title, country,
 * city, and bio. Upon submission, it handles the signup process by creating a new user account using
 * Firebase authentication, storing user details in localStorage, and redirecting to the home page upon
 * successful signup
 */
import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { registerUser } from "./../../services/registerService";
import "./style.css";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("attendee");

  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [organization, setOrganization] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");

  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const roleMapping = {
    organizer: 1,
    speaker: 2,
    attendee: 3,
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      localStorage.setItem("signupInProgress", "true");

      localStorage.setItem("userName", name);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      await registerUser(
        userId,
        name,
        email,
        dob,
        roleMapping[role],
        phoneNumber,
        organization,
        jobTitle,
        country,
        city,
        bio,
        null
      );

      setMessage(`Welcome, ${name}! Signup successful. Redirecting to home...`);
      setAlertType("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        localStorage.removeItem("signupInProgress");
        navigate("/home");
      }, 1000);
      
    } catch (error) {
      setMessage(error.message || "Signup failed. Please try again.");
      setAlertType("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Container maxWidth="sm" className="auth-container">
      <Paper elevation={3} className="auth-box">
        <Typography variant="h4" align="center" className="app-title">
          ConferNet Signup
        </Typography>
        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            margin="normal"
            size="small"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <TextField
            select
            fullWidth
            margin="normal"
            label="Role"
            value={role}
            size="small"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="attendee">Attendee</MenuItem>
            <MenuItem value="organizer">Organizer</MenuItem>
            <MenuItem value="speaker">Speaker</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Date of Birth"
            type="date"
            value={dob}
            size="small"
            onChange={(e) => setDob(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            value={phoneNumber}
            size="small"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Organization"
            value={organization}
            size="small"
            onChange={(e) => setOrganization(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Job Title"
            value={jobTitle}
            size="small"
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Country"
            value={country}
            size="small"
            onChange={(e) => setCountry(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="City"
            value={city}
            size="small"
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            fullWidth
            multiline
            rows={1}
            margin="normal"
            label="Bio"
            value={bio}
            size="small"
            onChange={(e) => setBio(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Signup
          </Button>
        </form>

        <Typography align="center" style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#1976d2",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login here
          </Link>
        </Typography>
      </Paper>
      {loading && <LoadingSpinner />}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Signup;
