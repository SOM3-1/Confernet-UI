/* This code snippet is a React component called `EventAttendees`. Here's a breakdown of what it does: */
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import { getEventAttendees } from "../../services/eventService";
import { getUsersByIds } from "../../services/userService";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

const EventAttendees = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const userIds = await getEventAttendees(eventId);
        if (userIds.length > 0) {
          const users = await getUsersByIds(userIds);
          console.log(users)
          setAttendees(users);
        } else {
          setAttendees([]);
        }
      } catch (err) {
        console.error("Failed to load attendees", err);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchAttendees();
  }, [eventId]);

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Registered Attendees ({attendees.length})
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : attendees.length === 0 ? (
        <Typography variant="body2">No attendees yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {attendees.map((attendee) => (
            <Grid item xs={12} sm={6} md={4} key={attendee.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={attendee.profilePicture} alt={attendee.name} />
                    <Box>
                      <Typography variant="subtitle1">{attendee.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {attendee.email}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {loading && <LoadingSpinner/>}
    </Box>
  );
};

export default EventAttendees;
