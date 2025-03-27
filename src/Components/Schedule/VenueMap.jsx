/* The code snippet provided is a React component named `VenueMap` that displays a card containing a
Google Maps embedded iframe showing the location of a conference venue. Here's a breakdown of what
the code is doing: */
import {
    Typography,
    Card,
    CardContent,
    Box,
    Divider
  } from "@mui/material";
  
  function VenueMap({link}) {
    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
             Venue Map
          </Typography>
  
          <Box sx={{ mt: 2, position: "relative", paddingTop: "56.25%" }}>
            <iframe
              title="Conference Venue Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.140881046518!2d-118.32866168478257!3d34.092809180591915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf0b6f5f354f%3A0x57ea2c388e3dbd44!2sHollywood%20High%20School!5e0!3m2!1sen!2sus!4v1677605898335!5m2!1sen!2sus"
              width="100%"
              height="800"
              style={{ border: 0, position: "absolute", top: 0, left: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
  
          <Divider sx={{ my: 2 }} />
        </CardContent>
      </Card>
    );
  }
  
  export default VenueMap;
  