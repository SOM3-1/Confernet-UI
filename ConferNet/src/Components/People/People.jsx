import { useState } from "react";
import { Card, CardContent, Typography, TextField, IconButton, Box, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";

function People() {
  const people = [
    { id: 1, name: "Dr. Jane Smith", role: "Keynote Speaker" },
    { id: 2, name: "Arjun Patel", role: "Developer, Attendee" },
    { id: 3, name: "Emily Zhang", role: "Researcher, Organizer" },
  ];

  const [messages, setMessages] = useState({});

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
        <Typography variant="h6" gutterBottom>
          Networking
        </Typography>

        <List>
          {people.map((person) => (
            <ListItem key={person.id} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'stretch', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemAvatar>
                  <Avatar><ChatIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={person.name} secondary={person.role} />
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
