import { Card, CardContent, Typography } from "@mui/material";

function Messages() {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Messages</Typography>
        <ul>
          <li>Welcome to ConferNet! 🎉</li>
          <li>Your next session starts at 2:00 PM in Hall A.</li>
          <li>You have a new connection request from Dr. Jane Smith.</li>
        </ul>
      </CardContent>
    </Card>
  );
}

export default Messages;
