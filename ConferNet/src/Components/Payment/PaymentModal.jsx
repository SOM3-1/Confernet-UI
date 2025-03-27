
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";

const PaymentModal = ({ open, onClose, event, onPay }) => {
  if (!event) return null;

  const qrCodeUrl = event.qrCodeUrl || "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PaymentLink";
  const currency = event.currency || "USD";
  const fee = event.registrationFee ? parseFloat(event.registrationFee).toFixed(2) : "0.00";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Complete Payment</DialogTitle>
      <DialogContent>
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
          <Button variant="contained" color="primary" onClick={() => onPay("stripe")}>
            Pay with Stripe
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => onPay("paypal")}>
            Pay with PayPal
          </Button>
          <Button variant="outlined" onClick={() => onPay("card")}>
            Pay with Credit Card
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;