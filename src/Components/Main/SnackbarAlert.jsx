import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ open, message, type, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={4000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
      {message}
    </Alert>
  </Snackbar>
);
export default SnackbarAlert;
