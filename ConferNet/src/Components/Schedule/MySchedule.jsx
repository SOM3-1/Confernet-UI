import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from "@mui/material";
import QRCode from "react-qr-code";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function MySchedule() {
  const [rsvpedEvents, setRsvpedEvents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [paymentEvent, setPaymentEvent] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const paidEvents = ["01:30 PM - Panel: Future of AI"];

  useEffect(() => {
    const stored = localStorage.getItem("rsvpedEvents");
    if (stored) setRsvpedEvents(JSON.parse(stored));
  }, []);

  const handleCancelRSVP = (event) => {
    const updated = rsvpedEvents.filter((e) => e !== event);
    setRsvpedEvents(updated);
    localStorage.setItem("rsvpedEvents", JSON.stringify(updated));
    setSnackbarMsg(`Canceled RSVP for "${event}"`);
    setSnackbarOpen(true);
  };

  const handleJoinEvent = (event) => {
    if (paidEvents.includes(event)) {
      setPaymentEvent(event);
    } else {
      navigate("/session", { state: { sessionName: event } });
    }
  };

  const simulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const handleProceedToSession = () => {
    setPaymentSuccess(false);
    navigate("/session", { state: { sessionName: paymentEvent } });
    setPaymentEvent(null);
  };

  return (
    <Grow in timeout={500}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            My Upcoming Schedule
          </Typography>

          {rsvpedEvents.length === 0 ? (
            <Typography>You haven't RSVP'd to any sessions yet.</Typography>
          ) : (
            rsvpedEvents.map((event, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  my: 1,
                  gap: 1
                }}
              >
                <Typography>{event}</Typography>
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleJoinEvent(event)}
                    sx={{ mr: 1 }}
                  >
                    Join
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleCancelRSVP(event)}
                  >
                    Cancel RSVP
                  </Button>
                </Box>
              </Box>
            ))
          )}

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="info" onClose={() => setSnackbarOpen(false)}>
              {snackbarMsg}
            </Alert>
          </Snackbar>

          <Dialog open={!!paymentEvent} onClose={() => { setPaymentEvent(null); setPaymentSuccess(false); }}>
            <DialogTitle>Payment Required</DialogTitle>
            <DialogContent>
              {!paymentSuccess ? (
                <>
                  <Typography gutterBottom>
                    The event "{paymentEvent}" requires payment. Please scan the QR code or click pay to continue.
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <QRCode value={`https://payment-portal.com/pay/${encodeURIComponent(paymentEvent)}`} />
                  </Box>
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: "block", textAlign: "center" }}>
                    Or use PayPal/Stripe for instant payment.
                  </Typography>
                </>
              ) : (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
                  <Typography variant="h6" sx={{ mt: 2 }}>Payment Successful!</Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              {!paymentSuccess ? (
                <>
                  <Button onClick={() => setPaymentEvent(null)}>Cancel</Button>
                  <Button onClick={simulatePayment} variant="contained" color="success">
                    Pay Now
                  </Button>
                </>
              ) : (
                <Button onClick={handleProceedToSession} variant="contained" color="primary">
                  Proceed to Session
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Grow>
  );
}

export default MySchedule;
