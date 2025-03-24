import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Box,
  Divider,
  Grid
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import InfoIcon from "@mui/icons-material/Info";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { getUserById } from "../../services/userService";

function Account() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    return parts.slice(0, 2).map(p => p[0].toUpperCase()).join("");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  if (!userData) {
    return (
      <Typography sx={{ mt: 4 }} color="error">
        Could not load user data.
      </Typography>
    );
  }

  return (
    <Card sx={{ mb: 2, p: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            fontSize: 32,
            bgcolor: "#1976d2",
            mr: 2,
          }}
        >
          {getInitials(userData.name)}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight="bold">{userData.name}</Typography>
          <Typography color="text.secondary">{roleToLabel(userData.role)}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <CardContent>
        <Grid container spacing={2}>
          <InfoRow icon={<EmailIcon />} label="Email" value={userData.email} />
          <InfoRow icon={<PhoneIcon />} label="Phone" value={userData.phoneNumber || "Not provided"} />
          <InfoRow icon={<CalendarMonthIcon />} label="Date of Birth" value={userData.dob || "Not provided"} />
          <InfoRow icon={<BusinessIcon />} label="Organization" value={userData.organization || "N/A"} />
          <InfoRow icon={<WorkIcon />} label="Job Title" value={userData.jobTitle || "N/A"} />
          <InfoRow icon={<LocationCityIcon />} label="Country" value={userData.country || "N/A"} />
          <InfoRow icon={<LocationCityIcon />} label="City" value={userData.city || "N/A"} />
          <InfoRow icon={<InfoIcon />} label="Bio" value={userData.bio || "N/A"} />
        </Grid>
      </CardContent>
    </Card>
  );
}

const InfoRow = ({ icon, label, value }) => (
  <Grid item xs={12} sm={6}>
    <Box display="flex" alignItems="center">
      <Box sx={{ mr: 1 }}>{icon}</Box>
      <Typography variant="body1">
        <strong>{label}:</strong> {value}
      </Typography>
    </Box>
  </Grid>
);

function roleToLabel(role) {
  switch (role) {
    case 1: return "Organizer";
    case 2: return "Speaker";
    case 3: return "Attendee";
    default: return "Unknown";
  }
}

export default Account;
