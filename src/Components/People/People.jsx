/* This code snippet is a React component named `People` that represents a networking feature. Here's a
breakdown of what the component does: */
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputAdornment,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import { getAllUsers } from "../../services/userService";
import { sendMessage } from "../../services/messageService";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

function People() {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [messages, setMessages] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  };

  const handleSnackClose = () => setSnack({ ...snack, open: false });

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const currentUserId = localStorage.getItem("userId");

        const filtered = allUsers
          .filter((user) => user.id !== currentUserId)
          .map((user) => ({
            id: user.id,
            name: user.name,
            role:
              user.role === 1
                ? "Organizer"
                : user.role === 2
                ? "Speaker"
                : user.role === 3
                ? "Attendee"
                : user.organization || "Participant",
            jobTitle: user.jobTitle || "",
            organization: user.organization || "",
            bio: user.bio || "",
            location: [user.city, user.country].filter(Boolean).join(", "),
            initials: getInitials(user.name),
          }));

        setPeople(filtered);
        setFilteredPeople(filtered);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = people.filter(
      (person) =>
        person.name.toLowerCase().includes(query) ||
        person.jobTitle.toLowerCase().includes(query) ||
        person.organization.toLowerCase().includes(query)
    );
    setFilteredPeople(filtered);
  }, [searchQuery, people]);

  const handleSend = async (receiverId) => {
    const message = messages[receiverId]?.trim();
    if (!message) return;

    try {
      const senderId = localStorage.getItem("userId");
      await sendMessage(senderId, receiverId, message);
      setMessages({ ...messages, [receiverId]: "" });
      setSnack({ open: true, message: "Message sent successfully!", severity: "success" });
    } catch (error) {
      console.error("Failed to send message:", error.message);
      setSnack({ open: true, message: "Failed to send message.", severity: "error" });
    }
  };

  const handleChange = (id, value) => {
    setMessages({ ...messages, [id]: value });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Networking
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search people by name, job, or organization..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {filteredPeople.map((person) => (
            <ListItem
              key={person.id}
              alignItems="flex-start"
              sx={{ flexDirection: "column", alignItems: "stretch", mb: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemAvatar>
                  <Avatar>{person.initials}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={person.name}
                  secondary={[
                    person.role && `(${person.role})`,
                    person.jobTitle,
                    person.organization && `at ${person.organization}`,
                    person.location,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                />
              </Box>
              <Box sx={{ display: "flex", mt: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={`Message ${person.name}...`}
                  value={messages[person.id] || ""}
                  onChange={(e) => handleChange(person.id, e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(person.id)}
                />
                <IconButton color="primary" onClick={() => handleSend(person.id)} sx={{ ml: 1 }}>
                  <SendIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
      {loading && <LoadingSpinner />}

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" severity={snack.severity} onClose={handleSnackClose}>
          {snack.message}
        </MuiAlert>
      </Snackbar>
    </Card>
  );
}

export default People;
