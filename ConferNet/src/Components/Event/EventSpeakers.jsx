import { useEffect, useState } from "react";
import {
  Card, CardContent, Typography, Avatar, Grid, Button, Box,
  IconButton, Tooltip, Snackbar, Alert, Link
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { getUserId, getUsersByIds } from "../../services/userService";
import { getUploadedFiles, uploadSpeakerFile } from "../../services/uploadsService";

const EventSpeakers = ({ speakers = [], eventId }) => {
  const [speakerDetails, setSpeakerDetails] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [isLoading, setIsLoading] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const loadSpeakers = async () => {
        setIsLoading(true)
      try {
        const details = await getUsersByIds(speakers);
        setSpeakerDetails(details);

        const files = await getUploadedFiles(eventId);
        setUploadedFiles(files);

        const userId = await getUserId();
        setCurrentUserId(userId);
      } catch (err) {
        setSnackbar({ open: true, message: err.message, severity: "error" });
      }
      finally{
        setIsLoading(false)
      }
    };
    if (speakers.length) loadSpeakers();
  }, [speakers, eventId]);

  const handleFileUpload = async (e, speakerId) => {
    setIsLoading(true)
    const file = e.target.files[0];
    if (!file) return;
    try {
      await uploadSpeakerFile(eventId, speakerId, file);
      const files = await getUploadedFiles(eventId);
      setUploadedFiles(files);
      setSnackbar({ open: true, message: "File uploaded!", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: "error" });
    }
    finally{
        setIsLoading(false)
    }
  };

  const renderSpeakerCard = (speaker) => {
    const isCurrentSpeaker = speaker.id === currentUserId;
    const files = uploadedFiles[speaker.id] || [];

    return (
      <Card key={speaker.id} sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <Avatar
                src={speaker.profilePicture}
                alt={speaker.name}
                sx={{ width: 64, height: 64 }}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="h6">{speaker.name}</Typography>
              {speaker.jobTitle && speaker.organization && (
                <Typography variant="body2" color="text.secondary">
                  {speaker.jobTitle} @ {speaker.organization}
                </Typography>
              )}
              {speaker.email && (
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Contact:{" "}
                  <Link href={`mailto:${speaker.email}`} underline="hover">
                    {speaker.email}
                  </Link>
                </Typography>
              )}
              {speaker.bio && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {speaker.bio}
                </Typography>
              )}

              {isCurrentSpeaker && (
                <Box mt={2}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                  >
                    Upload File
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileUpload(e, speaker.id)}
                    />
                  </Button>
                </Box>
              )}

              {files.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle2">Uploaded Files:</Typography>
                  {files.map((file, idx) => {
                    const fullPath = file.url;
                    const fileName = fullPath.substring(fullPath.lastIndexOf("-") + 1);

                    return (
                        <Box key={idx} display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                            {fileName}
                        </Typography>
                        <Tooltip title="Download">
                            <IconButton
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            <CloudDownloadIcon />
                            </IconButton>
                        </Tooltip>
                        </Box>
                    );
                    })}

                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Keynote Speakers
      </Typography>
      {speakerDetails.length ? (
        speakerDetails.map(renderSpeakerCard)
      ) : (
        <Typography>No speakers listed.</Typography>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default EventSpeakers;
