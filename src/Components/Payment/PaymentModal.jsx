import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Backdrop
} from "@mui/material";

const PaymentModal = ({ open, onClose, event, onPay }) => {
  if (!event) return null;
  const [loading, setLoading] = useState(false);

  const qrCodeUrl = event.qrCodeUrl || "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PaymentLink";
  const currency = event.currency || "USD";
  const fee = event.registrationFee ? parseFloat(event.registrationFee).toFixed(2) : "0.00";

  const handlePayment = (val) => {
    setLoading(true);
    setTimeout(() => {
      onPay(val);
      setLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Complete Payment</DialogTitle>

      <DialogContent>
        <Box position="relative">
          {/* Spinner Overlay */}
          {loading && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bgcolor="rgba(255,255,255,0.6)"
              display="flex"
              justifyContent="center"
              alignItems="center"
              zIndex={2}
            >
              <CircularProgress />
            </Box>
          )}

          {/* Actual Content */}
          <Box opacity={loading ? 0.3 : 1} pointerEvents={loading ? "none" : "auto"}>
            <Typography variant="body1" gutterBottom>
              Please scan the QR code below or use one of the options to complete your payment.
            </Typography>

            {qrCodeUrl && (
              <Box display="flex" justifyContent="center" my={2}>
                <img src={qrCodeUrl} alt="QR Code" style={{ width: "200px" }} />
              </Box>
            )}

            <Typography variant="body2" color="text.secondary">
              Payment Amount: {currency} {fee}
            </Typography>

            <Box display="flex" justifyContent="center" gap={2} mt={3}>
              <Button variant="contained" color="primary" onClick={() => handlePayment("stripe")}>
                Pay with Stripe
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handlePayment("paypal")}>
                Pay with PayPal
              </Button>
              <Button variant="outlined" onClick={() => handlePayment("card")}>
                Pay with Credit Card
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error" disabled={loading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
