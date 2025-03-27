import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Stepper, Step, StepLabel,
  Button, TextField, MenuItem, Box, Grid, CircularProgress, Snackbar, Alert, FormControlLabel, Checkbox
} from '@mui/material';
import { getUsersByRoleId } from './../../services/usersByRoles';
import { createEvent } from './../../services/eventService';
import { getUserById } from './../../services/userService';
import { LoadingSpinner } from '../Loading/LoadingSpinner';

const steps = ['Basic Info', 'Speakers & Moderators', 'Registration'];

const LOCATION_OPTIONS = [
  'New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Houston',
  'Seattle', 'Boston', 'Denver', 'Miami', 'Atlanta',
  'Dallas', 'Orlando', 'Las Vegas', 'Austin', 'San Diego',
  'Washington D.C.', 'Portland', 'Phoenix', 'Philadelphia', 'Detroit'
];

export const CreateEventModal = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [keynoteSpeakers, setKeynoteSpeakers] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [formData, setFormData] = useState({
    name: '', startDate: '', endDate: '', venue: '', city: '',
    keynoteSpeaker: '', moderator: '', registrationFee: '', currency: 'USD', paymentMethods: 'Cash',
    address: '', country: '', venueMapUrl: '', isOnline: false,
    streamUrl: '', maxAttendees: 20, announcement: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

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
        console.error("Error loading people:", err.message);
      } finally {
        setLoadingPeople(false);
      }
    };
    if (open) loadPeople();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setFormData({
        name: '', startDate: '', endDate: '', venue: '', city: '',
        keynoteSpeaker: '', moderator: '', registrationFee: '', currency: 'USD', paymentMethods: 'Cash',
        address: '', country: '', venueMapUrl: '', isOnline: false,
        streamUrl: '', maxAttendees: '', announcement: ''
      });
      setActiveStep(0);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : String(value) }));
  };

  const validateStep = () => {
    if (activeStep === 0) {
      const now = new Date();
      const start = new Date(formData.startDate + ':00');
      const end = new Date(formData.endDate + ':00');

      if (!formData.startDate || !formData.endDate) {
        setSnackbar({ open: true, message: 'Please select both start and end date/time.', severity: 'error' });
        return false;
      }

      if (start <= now || end <= start) {
        setSnackbar({
          open: true,
          message: 'Invalid date/time. Start must be in the future and end must be after start.',
          severity: 'error'
        });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setActiveStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const organizer = await getUserById();
      if (!organizer?.id || !organizer?.name) throw new Error('Organizer details not found');

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
        streamUrl: formData.streamUrl,
        maxAttendees: formData.maxAttendees ? Number(formData.maxAttendees) : null,
        announcement: formData.announcement,
        registrationFee: Number(formData.registrationFee),
        currency: formData.currency,
        paymentMethods: formData.paymentMethods,
        keynoteSpeakers: formData.keynoteSpeaker ? [formData.keynoteSpeaker] : [],
        moderators: formData.moderator ? [formData.moderator] : [],
        organizerId: organizer.id,
        organizerName: organizer.name,
        contactEmail: organizer.email || '',
        createdAt: new Date().toISOString(),
      };
     await createEvent(payload);
      setSnackbar({ open: true, message: 'Event created successfully!', severity: 'success' });
      onClose();
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Event creation failed.', severity: 'error' });
      console.error("Event creation failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="Event Name" name="name" fullWidth required onChange={handleChange} value={formData.name} /></Grid>
            <Grid item xs={6}><TextField label="Start Date & Time" name="startDate" type="datetime-local" required fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} value={formData.startDate} /></Grid>
            <Grid item xs={6}><TextField label="End Date & Time" name="endDate" type="datetime-local" required fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} value={formData.endDate} /></Grid>
            <Grid item xs={6}><TextField label="Venue" name="venue" fullWidth onChange={handleChange} value={formData.venue} /></Grid>
            <Grid item xs={6}><TextField label="City" name="city" fullWidth onChange={handleChange} value={formData.city} /></Grid>
            <Grid item xs={6}><TextField label="Address" name="address" fullWidth onChange={handleChange} value={formData.address} /></Grid>
            <Grid item xs={6}><TextField label="Country" name="country" fullWidth onChange={handleChange} value={formData.country} /></Grid>
            <Grid item xs={12}><TextField select label="Venue Map URL" name="venueMapUrl" fullWidth value={formData.venueMapUrl} onChange={handleChange} required><MenuItem value="" disabled>Select a location</MenuItem>{LOCATION_OPTIONS.map(loc => (<MenuItem key={loc} value={`https://maps.google.com/?q=${encodeURIComponent(loc)}`}>{loc}</MenuItem>))}</TextField></Grid>
            <Grid item xs={6}><TextField label="Stream URL" name="streamUrl" fullWidth onChange={handleChange} value={formData.streamUrl} /></Grid>
            <Grid item xs={6}><TextField label="Max Attendees" name="maxAttendees" type="number" fullWidth onChange={handleChange} value={formData.maxAttendees} /></Grid>
            <Grid item xs={12}><TextField label="Announcement" name="announcement" fullWidth multiline rows={2} onChange={handleChange} value={formData.announcement} /></Grid>
            <Grid item xs={12}><FormControlLabel control={<Checkbox checked={formData.isOnline} onChange={handleChange} name="isOnline" />} label="Is Online Event?" /></Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField select label="Keynote Speaker" name="keynoteSpeaker" value={formData.keynoteSpeaker} fullWidth onChange={handleChange}>
                <MenuItem value="" disabled>Select a keynote speaker</MenuItem>
                {keynoteSpeakers.map(user => (<MenuItem key={user.userId} value={String(user.userId)}>{user.name || user.email || 'Unnamed'}</MenuItem>))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField select label="Moderator" name="moderator" fullWidth value={formData.moderator} onChange={handleChange}>
                <MenuItem value="" disabled>Select a moderator</MenuItem>
                {moderators.map(user => (<MenuItem key={user.userId} value={String(user.userId)}>{user.name || user.email || 'Unnamed'}</MenuItem>))}
              </TextField>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField label="Registration Fee" name="registrationFee" type="number" fullWidth onChange={handleChange} value={formData.registrationFee} required/></Grid>
            <Grid item xs={6}><TextField label="Currency" name="currency" fullWidth value={formData.currency} onChange={handleChange} /></Grid>
            <Grid item xs={12}><TextField select label="Payment Method" name="paymentMethods" fullWidth value={formData.paymentMethods} onChange={handleChange}><MenuItem value="Cash">Cash</MenuItem><MenuItem value="Stripe">Stripe</MenuItem><MenuItem value="PayPal">PayPal</MenuItem></TextField></Grid>
          </Grid>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label, index) => (
              <Step key={index}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          {loadingPeople ? <LoadingSpinner /> : renderStepContent(activeStep)}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>Back</Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Create Event'}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>Next</Button>
            )}
          </Box>
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
