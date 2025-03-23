import { useState, useEffect } from "react";
import {
  Card, CardContent, Typography, TextField,
  IconButton, Box, Avatar, List, ListItem, ListItemAvatar, ListItemText
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import { getAllUsers } from "../../services/userService";

function People() {
  const [people, setPeople] = useState([]);
  const [messages, setMessages] = useState({});

  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    return parts.slice(0, 2).map(p => p[0].toUpperCase()).join("");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        const currentUserId = localStorage.getItem("userId");
        console.log(allUsers)
        const filtered = allUsers
          .filter(user => user.id !== currentUserId)
          .map(user => ({
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
            initials: getInitials(user.name)
          }));

        setPeople(filtered);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleSend = (id) => {
    if (messages[id]?.trim()) {
      alert(`Message to ${people.find(p => p.id === id).name}: ${messages[id]}`);
      setMessages({ ...messages, [id]: "" });
    }
  };

  const handleChange = (id, value) => {
    setMessages({ ...messages, [id]: value });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Networking</Typography>

        <List>
          {people.map(person => (
            <ListItem key={person.id} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'stretch', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemAvatar>
                  <Avatar>{person.initials}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={person.name}
                  secondary={[
                    person.role && `(${person.role})`,
                    person.jobTitle,
                    person.organization && `at ${person.organization}`,
                    person.location
                  ].filter(Boolean).join(" • ")}
                />
              </Box>
              <Box sx={{ display: 'flex', mt: 1 }}>
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
    </Card>
  );
}

export default People;