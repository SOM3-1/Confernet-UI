import { useEffect, useState } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import { auth } from "../../firebase/firebaseConfig";

function Account() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Assuming name and role are stored in localStorage during signup
      const name = localStorage.getItem("name") || "Not Provided";
      const role = localStorage.getItem("role") || "Attendee";
      setUserData({ name, email: user.email, role });
    }
  }, []);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Account Information</Typography>
        <Typography><strong>Name:</strong> {userData.name}</Typography>
        <Typography><strong>Email:</strong> {userData.email}</Typography>
        <Typography><strong>Role:</strong> {userData.role}</Typography>
      </CardContent>
    </Card>
  );
}

export default Account;
