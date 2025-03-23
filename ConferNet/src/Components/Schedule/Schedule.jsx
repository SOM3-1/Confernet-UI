import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Grow
} from "@mui/material";

function Schedule() {
  const allEvents = [
    "09:30 AM - Registration & Welcome",
    "10:00 AM - Opening Keynote by Dr. Jane Smith",
    "12:00 PM - Lunch Break",
    "01:30 PM - Panel: Future of AI",
    "03:00 PM - Networking Session"
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [rsvpedEvents, setRsvpedEvents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("rsvpedEvents");
    if (stored) setRsvpedEvents(JSON.parse(stored));
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setInviteEmail("");
    setOpenDialog(false);
  };

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      alert(`Invitation sent to ${inviteEmail}`);
      handleCloseDialog();
    }
  };

  const handleRSVPClick = (event) => {
    const updatedEvents = [...rsvpedEvents, event];
    setRsvpedEvents(updatedEvents);
    localStorage.setItem("rsvpedEvents", JSON.stringify(updatedEvents));
    setSnackbarMsg("RSVP successful!");
    setSnackbarType("success");
    setSnackbarOpen(true);
  };

  const filteredEvents = allEvents.filter(event => !rsvpedEvents.includes(event));

  return (
    <Grow in timeout={500}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Sessions</Typography>
          {filteredEvents.length === 0 ? (
            <Typography>All available sessions are in your schedule.</Typography>
          ) : (
            filteredEvents.map((event, index) => (
              <Grow in timeout={300 + index * 100} key={index}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
                  <Typography>{event}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleRSVPClick(event)}
                  >
                    RSVP
                  </Button>
                </Box>
              </Grow>
            ))
          )}

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={handleOpenDialog}>Invite People</Button>
          </Box>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Invite Someone to an Event</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleInvite} variant="contained">Send Invite</Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarType} sx={{ width: "100%" }}>
              {snackbarMsg}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Grow>
  );
}

export default Schedule;
