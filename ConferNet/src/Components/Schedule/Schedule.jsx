import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Grow,
  TextField,
  InputAdornment,
  Tooltip
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getUpcomingEvents } from "../../services/eventService";
import {
  bookmarkEvent,
  removeBookmarkedEvent,
  getUserId,
  joinEvent,
  leaveEvent,
  getBookmarkedEvents,
  getRegisteredEvents,
} from "../../services/userService";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

function Schedule({ onSelectEvent }) {
  const [events, setEvents] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [joined, setJoined] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false)

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const upcoming = await getUpcomingEvents();
      console.log(upcoming)
      setEvents(upcoming);
      await fetchUserPreferences(); 
    } catch (err) {
      console.error(err);
    }
    finally{
      setLoading(false)
    }
  };

  const fetchUserPreferences = async () => {
    try {
      const userId = await getUserId();
      if (!userId) return;

      const bookmarkedEvents = await getBookmarkedEvents(userId);
      const registeredEvents = await getRegisteredEvents(userId);

      setBookmarked(bookmarkedEvents.map(e => e.eventId));
      setJoined(registeredEvents.map(e => e.eventId));
    } catch (error) {
      console.error("Error fetching user preferences:", error);
    }
  };

  const handleBookmarkToggle = async (eventId) => {
    const userId = await getUserId();
    if (!userId) return;

    try {
      if (bookmarked.includes(eventId)) {
        await removeBookmarkedEvent(userId, eventId);
        setBookmarked(prev => prev.filter(id => id !== eventId));
        setSnackbar({ open: true, message: "Event removed from bookmarks", severity: "info" });
      } else {
        await bookmarkEvent(userId, eventId);
        setBookmarked(prev => [...prev, eventId]);
        setSnackbar({ open: true, message: "Event bookmarked!", severity: "success" });
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
  };

  const handleJoinToggle = async (eventId) => {
    const userId = await getUserId();
    if (!userId) return;
  
    if (joined.includes(eventId)) {
      const confirmLeave = window.confirm("Are you sure you want to leave this event?");
      if (!confirmLeave) return;
  
      try {
        await leaveEvent(userId, eventId);
        setJoined((prev) => prev.filter((id) => id !== eventId));
        setSnackbar({ open: true, message: "You left the event.", severity: "info" });
      } catch (err) {
        setSnackbar({ open: true, message: err.message, severity: "error" });
      }
    } else {
      try {
        await joinEvent(userId, eventId);
        setJoined((prev) => [...prev, eventId]);
        setSnackbar({ open: true, message: "Successfully joined the event!", severity: "success" });
      } catch (err) {
        setSnackbar({ open: true, message: err.message, severity: "error" });
      }
    }
  };
  
  const handleViewDetails = (eventId) => {
    onSelectEvent(eventId);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Grow in timeout={500}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <TextField
              placeholder="Search events..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "70%" }}
            />
            <Tooltip title="Refresh Events">
              <IconButton onClick={fetchEvents}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {filteredEvents.length === 0 ? (
            <Typography>No events to register</Typography>
          ) : (
            filteredEvents.map((event, index) => (
              <Grow in timeout={300 + index * 100} key={event.eventId}>
                <Card variant="outlined" sx={{ my: 2, p: 2 }}>
                  {/* Header: Title + Actions */}
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="h6">{event.name}</Typography>
                      <Typography variant="body2">
                      {new Date((event.startDate._seconds || event.startDate.seconds || 0) * 1000).toLocaleString()} →
                      {new Date((event.endDate._seconds || event.endDate.seconds || 0) * 1000).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.city}, {event.country}
                      </Typography>
                    </Box>

                    <Box display="flex" gap={1}>
                      <Tooltip title={bookmarked.includes(event.eventId) ? "Remove Bookmark" : "Bookmark"}>
                        <IconButton onClick={() => handleBookmarkToggle(event.eventId)} color={bookmarked.includes(event.eventId) ? "primary" : "default"}>
                          {bookmarked.includes(event.eventId) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                      </Tooltip>
                      <Button
                        variant={joined.includes(event.eventId) ? "contained" : "outlined"}
                        size="small"
                        color={joined.includes(event.eventId) ? "error" : "primary"}
                        onClick={() => handleJoinToggle(event.eventId)}
                      >
                        {joined.includes(event.eventId) ? "Leave Event" : "Join"}
                    </Button>
                    </Box>
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
                </Card>
              </Grow>
            ))
          )}
        </CardContent>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Card>
    </Grow>

    {loading && <LoadingSpinner/>}
    </>
  );
}

export default Schedule;
