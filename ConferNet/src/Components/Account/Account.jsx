import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  Divider,
  Grid,
  Tabs,
  Tab,
  Button
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  LocationCity as LocationCityIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  getUserById,
  getUserId,
  getBookmarkedEvents,
  getRegisteredEvents,
} from "../../services/userService";
import { getAllEvents } from "../../services/eventService";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Account() {
  const [userData, setUserData] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [organized, setOrganized] = useState([]);
  const [speaking, setSpeaking] = useState([]);

  const navigate = useNavigate();

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
        const allEvents = await getAllEvents();

        setUserData(user);
        setBookmarked(bookmarkedEvents);
        setRegistered(registeredEvents);

        // Organizer events
        const orgEvents = allEvents.filter(e => e.organizerId === userId);
        setOrganized(orgEvents);

        // Speaker events
        const spkEvents = allEvents.filter(e =>
          Array.isArray(e.keynoteSpeakers) && e.keynoteSpeakers.includes(userId)
        );
        setSpeaking(spkEvents);

      } catch (error) {
        console.error("Error loading account data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!userData) return <Typography sx={{ mt: 4 }} color="error">Could not load user data.</Typography>;

  const tabs = [
    { label: "Joined Events", data: registered },
    { label: "Bookmarked Events", data: bookmarked },
  ];

  if (userData.role === 1) tabs.push({ label: "Events You Organized", data: organized });
  if (userData.role === 2) tabs.push({ label: "Events You're Speaking At", data: speaking });

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
        {tabs.map((tab, idx) => (
          <Tab key={idx} label={tab.label} />
        ))}
      </Tabs>

      <Box mt={2}>
        <EventList events={tabs[tabIndex].data} title={tabs[tabIndex].label} />
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
  const navigate = useNavigate();

  const handleViewDetails = (eventId) => {
    navigate(`/home/${eventId}`);
  };

  if (!events || !events.length) {
    return <Typography>No events to display.</Typography>;
  }

  return (
    <>
      <Typography variant="h6" mb={2}>{title}</Typography>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} md={6} key={event.eventId}>
            <Card sx={{ cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6">{event.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.city}, {event.country}
                    </Typography>
                    <Typography variant="body2">
                      {new Date(event.startDate._seconds * 1000).toLocaleDateString()} -{" "}
                      {new Date(event.endDate._seconds * 1000).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                      startIcon={<VisibilityIcon />}
                      variant="contained"
                      size="small"
                      onClick={() => handleViewDetails(event.eventId)}
                    >
                      View More Details
                    </Button>
                  </Box>
                </Box>
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
