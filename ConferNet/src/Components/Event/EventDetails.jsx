import { useState, useEffect } from "react";
import { getEventById } from "../../services/eventService";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RoomIcon from '@mui/icons-material/Room';
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import {
  getUserId,
  joinEvent,
  leaveEvent,
  bookmarkEvent,
  removeBookmarkedEvent,
  getBookmarkedEvents,
  getRegisteredEvents,
  getUserById
} from "../../services/userService";
import VenueMap from "../Schedule/VenueMap";
import { EditEventModal } from "./EditEventModal";
import EventSpeakers from "./EventSpeakers";
import EventAttendees from "./EventAttendees";

const EventDetails = ({ eventId, onBack }) => {
  const [event, setEvent] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [joined, setJoined] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [openModal, setOpenModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isOrganizer, setIsOrganizer] = useState(false);

  const fetchDetails = async () => {
    const data = await getEventById(eventId);
    setEvent(data);

    const userId = await getUserId();
    setCurrentUserId(userId);
    setIsOrganizer(userId === data.organizerId);

    if (userId) {
      const bookmarkedEvents = await getBookmarkedEvents(userId);
      const registeredEvents = await getRegisteredEvents(userId);

      setBookmarked(bookmarkedEvents.some(e => e.eventId === eventId));
      setJoined(registeredEvents.some(e => e.eventId === eventId));
    }

    if (data?.organizerId) {
      const organizerData = await getUserById(data.organizerId);
      setOrganizer(organizerData);
    }
  };

  useEffect(() => {
    if (eventId) fetchDetails();
  }, [eventId]);

  const handleJoinToggle = async () => {
    const userId = await getUserId();
    if (!userId) return;
    if (joined) {
      if (!window.confirm("Are you sure you want to leave this event?")) return;
      await leaveEvent(userId, eventId);
      setJoined(false);
      setSnackbar({ open: true, message: "You left the event.", severity: "info" });
    } else {
      await joinEvent(userId, eventId);
      setJoined(true);
      setSnackbar({ open: true, message: "Successfully joined the event!", severity: "success" });
    }
  };

  const handleBookmarkToggle = async () => {
    const userId = await getUserId();
    if (!userId) return;
    if (bookmarked) {
      await removeBookmarkedEvent(userId, eventId);
      setBookmarked(false);
      setSnackbar({ open: true, message: "Bookmark removed.", severity: "info" });
    } else {
      await bookmarkEvent(userId, eventId);
      setBookmarked(true);
      setSnackbar({ open: true, message: "Event bookmarked!", severity: "success" });
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const millis = timestamp._seconds ? timestamp._seconds * 1000 : new Date(timestamp).getTime();
    return new Date(millis).toLocaleString();
  };

  const formatCurrency = (fee) => {
    const value = typeof fee === "number" ? fee : parseFloat(fee);
    return isNaN(value) ? "N/A" : value.toFixed(2);
  };

  if (!event) return <LoadingSpinner />;

  return (
    <Box>
      <Button onClick={onBack} variant="outlined" sx={{ mb: 2 }}>← Back to Home</Button>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{event.name}</Typography>
        <Box display="flex" gap={1}>
          <Tooltip title={bookmarked ? "Remove Bookmark" : "Bookmark"}>
            <IconButton onClick={handleBookmarkToggle} color={bookmarked ? "primary" : "default"}>
              {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Tooltip>
          {isOrganizer ? (
            <Button variant="contained" color="secondary" onClick={() => setOpenModal(true)}>
              Edit Event
            </Button>
          ) : (
            <Button
              variant={joined ? "contained" : "outlined"}
              color={joined ? "error" : "primary"}
              onClick={handleJoinToggle}
            >
              {joined ? "Leave Event" : "Join Event"}
            </Button>
          )}
        </Box>
      </Box>

      <Typography variant="subtitle1" color="text.secondary" mt={1}>{event.city}, {event.country}</Typography>
      <Typography variant="body2" color="text.secondary">
        {formatDate(event.startDate)} → {formatDate(event.endDate)}
      </Typography>

      <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} sx={{ mt: 3 }} textColor="primary" indicatorColor="primary">
        <Tab label="Details" />
        <Tab label="Speakers" />
        {isOrganizer && <Tab label="Attendees" />}
        <Tab label="Support" />
      </Tabs>

      <Box mt={3}>
        {tabIndex === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6">About the Event</Typography>
              {event.description && <Typography variant="body1" mt={1}>{event.description}</Typography>}
              {organizer?.fullName && <Typography variant="body2" mt={2}><strong>Organizer:</strong> {organizer.fullName}</Typography>}
              {event.contactEmail && <Typography variant="body2"><strong>Contact:</strong> {event.contactEmail} {event.contactPhone && `| ${event.contactPhone}`}</Typography>}
              {event.venue || event.address ? <Typography variant="body2"><strong>Venue:</strong> {event.venue || event.address}</Typography> : null}
              {event.registrationFee !== undefined && <Typography variant="body2"><strong>Fee:</strong> {event.currency} {formatCurrency(event.registrationFee)}</Typography>}
              {event.paymentMethods && <Typography variant="body2"><strong>Payment Methods:</strong> {Array.isArray(event.paymentMethods) ? event.paymentMethods.join(", ") : event.paymentMethods}</Typography>}
              {event.tags && <Typography variant="body2"><strong>Tags:</strong> {event.tags.join(", ")}</Typography>}
              {event.announcement && <Typography variant="body2" mt={1}><strong>Announcement:</strong> {event.announcement}</Typography>}
              {event.qrCodeUrl && <Typography variant="body2"><strong>QR Code:</strong> <a href={event.qrCodeUrl} target="_blank" rel="noopener noreferrer">Scan Here</a></Typography>}
              {event.posterUrl && <Typography variant="body2"><strong>Poster:</strong> <a href={event.posterUrl} target="_blank" rel="noopener noreferrer">View Poster</a></Typography>}
              {typeof event.isOnline === "boolean" && <Typography variant="body2"><strong>Event Type:</strong> {event.isOnline ? "Online" : "In-Person"}</Typography>}
              {event.streamUrl && <Typography variant="body2"><strong>Stream Link:</strong> <a href={event.streamUrl} target="_blank" rel="noopener noreferrer">Watch</a></Typography>}
              {event.venueMapUrl && <Box mt={2}><VenueMap link={event.venueMapUrl} /></Box>}
            </CardContent>
          </Card>
        )}

          {tabIndex === 1 && <EventSpeakers speakers={event.keynoteSpeakers} eventId={event.eventId} />}

        {tabIndex === 2 && (
         <EventAttendees eventId={event.eventId}/>
        )}

        {tabIndex === 3 && (
          <Card><CardContent>
            <Typography variant="h6">Need Help?</Typography>
            <Typography variant="body2">Please contact <strong>{event.contactEmail}</strong> for assistance.</Typography>
          </CardContent></Card>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <EditEventModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          fetchDetails();
        }}
        eventData={event}
      />
    </Box>
  );
};

export default EventDetails;
