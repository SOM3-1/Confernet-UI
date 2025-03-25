import { Typography } from "@mui/material";

const EventSupport = ({ contactEmail }) => {
  return (
    <>
      <Typography variant="h6">Need Help?</Typography>
      <Typography variant="body2">
        Please contact <strong>{contactEmail}</strong> for assistance.
      </Typography>
    </>
  );
};

export default EventSupport;
