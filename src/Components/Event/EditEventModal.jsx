import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Button, TextField, MenuItem, Box, Grid, CircularProgress,
  Snackbar, Alert, FormControlLabel, Checkbox
} from '@mui/material';
import { getUsersByRoleId } from './../../services/usersByRoles';
import { updateEvent } from './../../services/eventService';

const LOCATION_OPTIONS = [
  'New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Houston',
  'Seattle', 'Boston', 'Denver', 'Miami', 'Atlanta',
  'Dallas', 'Orlando', 'Las Vegas', 'Austin', 'San Diego',
  'Washington D.C.', 'Portland', 'Phoenix', 'Philadelphia', 'Detroit'
];

export const EditEventModal = ({ open, onClose, eventData }) => {
  const [keynoteSpeakers, setKeynoteSpeakers] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  useEffect(() => {
    if (eventData) {
        console.log(eventData)
        const convertTimestampToInputFormat = (timestamp) => {
            if (!timestamp) return '';
            try {
              let date;
              if (timestamp._seconds) {
                date = new Date(timestamp._seconds * 1000);
              } else if (typeof timestamp === 'string' || timestamp instanceof Date) {
                date = new Date(timestamp);
              } else {
                return ''; 
              }
              return date.toISOString().slice(0, 16);
            } catch (err) {
              console.warn("Invalid date format:", timestamp);
              return '';
            }
          };
          

      setFormData({
        name: eventData.name || '',
        startDate: convertTimestampToInputFormat(eventData.startDate),
        endDate: convertTimestampToInputFormat(eventData.endDate),
        venue: eventData.venue || '',
        city: eventData.city || '',
        address: eventData.address || '',
        country: eventData.country || '',
        venueMapUrl: eventData.venueMapUrl || '',
        isOnline: eventData.isOnline || false,
        announcement: eventData.announcement || '',
        keynoteSpeaker: eventData.keynoteSpeakers?.[0]?.userId || eventData.keynoteSpeakers?.[0] || '',
        moderator: eventData.moderators?.[0]?.userId || eventData.moderators?.[0] || ''
      });
    }
  }, [eventData]);

  useEffect(() => {
    const loadPeople = async () => {
      setLoadingPeople(true);
      try {
        const speakers = await getUsersByRoleId(2);
        const mods = await getUsersByRoleId(3);
        setKeynoteSpeakers(speakers);
        setModerators(mods);
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to load users.', severity: 'error' });
      } finally {
        setLoadingPeople(false);
      }
    };
    if (open) loadPeople();
  }, [open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        venue: formData.venue,
        city: formData.city,
        address: formData.address,
        country: formData.country,
        venueMapUrl: formData.venueMapUrl,
        isOnline: formData.isOnline,
        announcement: formData.announcement,
        keynoteSpeakers: formData.keynoteSpeaker ? [formData.keynoteSpeaker] : [],
        moderators: formData.moderator ? [formData.moderator] : []
      };

      await updateEvent(eventData.eventId, payload);
      setSnackbar({ open: true, message: 'Event updated successfully!', severity: 'success' });
      onClose();
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Update failed.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          {loadingPeople ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField label="Event Name" name="name" fullWidth required value={formData.name} onChange={handleChange} /></Grid>
              <Grid item xs={6}><TextField label="Start Date & Time" name="startDate" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={formData.startDate} onChange={handleChange} /></Grid>
              <Grid item xs={6}><TextField label="End Date & Time" name="endDate" type="datetime-local" fullWidth InputLabelProps={{ shrink: true }} value={formData.endDate} onChange={handleChange} /></Grid>
              <Grid item xs={6}><TextField label="Venue" name="venue" fullWidth value={formData.venue} onChange={handleChange} /></Grid>
              <Grid item xs={6}><TextField label="City" name="city" fullWidth value={formData.city} onChange={handleChange} /></Grid>
              <Grid item xs={6}><TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} /></Grid>
              <Grid item xs={6}><TextField label="Country" name="country" fullWidth value={formData.country} onChange={handleChange} /></Grid>
              <Grid item xs={12}><TextField select label="Venue Map URL" name="venueMapUrl" fullWidth value={formData.venueMapUrl} onChange={handleChange}><MenuItem value="" disabled>Select a location</MenuItem>{LOCATION_OPTIONS.map(loc => (<MenuItem key={loc} value={`https://maps.google.com/?q=${encodeURIComponent(loc)}`}>{loc}</MenuItem>))}</TextField></Grid>
              <Grid item xs={12}><TextField label="Announcement" name="announcement" fullWidth multiline rows={2} value={formData.announcement} onChange={handleChange} /></Grid>
              <Grid item xs={12}><FormControlLabel control={<Checkbox checked={formData.isOnline} onChange={handleChange} name="isOnline" />} label="Is Online Event?" /></Grid>
              <Grid item xs={12}>
                <TextField select label="Keynote Speaker" name="keynoteSpeaker" fullWidth value={formData.keynoteSpeaker} onChange={handleChange}>
                  <MenuItem value="" disabled>Select a keynote speaker</MenuItem>
                  {keynoteSpeakers.map(user => (<MenuItem key={user.userId} value={user.userId}>{user.name || user.email || 'Unnamed'}</MenuItem>))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField select label="Moderator" name="moderator" fullWidth value={formData.moderator} onChange={handleChange}>
                  <MenuItem value="" disabled>Select a moderator</MenuItem>
                  {moderators.map(user => (<MenuItem key={user.userId} value={user.userId}>{user.name || user.email || 'Unnamed'}</MenuItem>))}
                </TextField>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Update Event'}
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
