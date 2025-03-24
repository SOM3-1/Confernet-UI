import { useState, useEffect } from "react";
import { getEventById } from "../../services/eventService";
import {
    Box, Typography, Button
  } from '@mui/material';
import { LoadingSpinner } from "../Loading/LoadingSpinner";
const EventDetails = ({ eventId, onBack }) => {
    const [event, setEvent] = useState(null);
  
    useEffect(() => {
      if (eventId) {
        getEventById(eventId).then(setEvent);
      }
    }, [eventId]);
  
    if (!event) return <LoadingSpinner/>;
  
    return (
      <Box>
        <Button onClick={onBack} variant="outlined">← Back to Home</Button>
        <Typography variant="h5" mt={2}>{event.name}</Typography>
      </Box>
    );
  };
  
  export default EventDetails;
  