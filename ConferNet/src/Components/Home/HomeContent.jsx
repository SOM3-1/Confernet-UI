import { useState } from "react";
import { Card, CardContent, Typography, Button, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Schedule from "../Schedule/Schedule";
import MySchedule from "../Schedule/MySchedule";

function HomeContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

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

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Welcome to Your Dashboard</Typography>
          <Typography variant="body1">Here you can view your schedule, RSVP to sessions, and invite people to join you.</Typography>
        </CardContent>
      </Card>

      <Schedule />

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>RSVP & Invite</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={() => alert("You have RSVP'd to the event!")}>RSVP to Event</Button>
            <Button variant="outlined" color="secondary" onClick={handleOpenDialog}>Invite People</Button>
          </Box>
        </CardContent>
      </Card>

      <MySchedule />

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
    </Box>
  );
}

export default HomeContent;
