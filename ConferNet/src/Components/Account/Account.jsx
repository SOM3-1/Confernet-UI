import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Avatar,
  Box,
  Divider,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  LocationCity as LocationCityIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import {
  getUserById,
  getUserId,
  getBookmarkedEvents,
  getRegisteredEvents,
} from "../../services/userService";

function Account() {
  const [userData, setUserData] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState([]);
  const [registered, setRegistered] = useState([]);

  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    return parts.slice(0, 2).map(p => p[0].toUpperCase()).join("");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById();
        const userId = await getUserId();
        const bookmarkedEvents = await getBookmarkedEvents(userId);
        const registeredEvents = await getRegisteredEvents(userId);

        setUserData(user);
        setBookmarked(bookmarkedEvents);
        setRegistered(registeredEvents);
      } catch (error) {
        console.error("Error loading account data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (!userData) return <Typography sx={{ mt: 4 }} color="error">Could not load user data.</Typography>;

  return (
    <Box>
      <Card sx={{ mb: 2, p: 3 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ width: 80, height: 80, fontSize: 32, bgcolor: "#1976d2", mr: 2 }}>
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

      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} centered>
        <Tab label="Joined Events" />
        <Tab label="Bookmarked Events" />
      </Tabs>

      <Box mt={2}>
        {tabIndex === 0 && <EventList events={registered} title="Events You've Joined" />}
        {tabIndex === 1 && <EventList events={bookmarked} title="Bookmarked Events" />}
      </Box>
    </Box>
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

function EventList({ events, title }) {
  if (!events || !events.length) {
    return <Typography>No events to display.</Typography>;
  }

  return (
    <>
      <Typography variant="h6" mb={2}>{title}</Typography>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} md={6} key={event.eventId}>
            <Card>
              <CardContent>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body2" color="text.secondary">{event.city}, {event.country}</Typography>
                <Typography variant="body2">
                  {new Date(event.startDate._seconds * 1000).toLocaleDateString()} -{" "}
                  {new Date(event.endDate._seconds * 1000).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function roleToLabel(role) {
  switch (role) {
    case 1: return "Organizer";
    case 2: return "Speaker";
    case 3: return "Attendee";
    default: return "Unknown";
  }
}

export default Account;
