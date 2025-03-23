import { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Divider,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";

function SessionInteraction() {
  const [question, setQuestion] = useState("");
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSubmitQuestion = () => {
    if (question.trim()) {
      setSubmittedQuestions([...submittedQuestions, question]);
      setQuestion("");
      setSnackbar({ open: true, message: "Question submitted!", severity: "success" });
    }
  };

  const handleSubmitFeedback = () => {
    setSnackbar({ open: true, message: "Feedback submitted. Thank you!", severity: "info" });
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Live Session Interaction
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Ask a Question</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmitQuestion}>
            Submit
          </Button>
        </Box>

        {submittedQuestions.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Your Submitted Questions:</Typography>
            <ul>
              {submittedQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6">Rate This Session</Typography>
        <Rating
          name="session-rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          label="Additional Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button variant="outlined" onClick={handleSubmitFeedback} sx={{ mt: 1 }}>
          Submit Feedback
        </Button>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}

export default SessionInteraction;
