/* The provided code is a React component called `ChatPopup`. It is a chat interface that allows users
to send and receive messages in a dialog popup. Here is a breakdown of what the code is doing: */

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { getChatHistory, sendMessage } from "../../services/messageService";

const ChatPopup = ({ open, onClose, senderId, receiverId, receiverName }) => {
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadChat = async () => {
    try {
      const history = await getChatHistory(senderId, receiverId);
      setChat(history);
    } catch (err) {
      console.error("Failed to fetch chat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadChat();
      const interval = setInterval(loadChat, 3000);
      return () => clearInterval(interval);
    }
  }, [open, receiverId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      await sendMessage(senderId, receiverId, newMessage);
      setNewMessage("");
      await loadChat();
    } catch (err) {
      console.error("Send failed:", err);
    }
  };
  const formatTimestamp = (timestamp) => {
    if (!timestamp?._seconds) return "";
    return new Date(timestamp._seconds * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" data-testid="chat-popup">
      <DialogTitle>
        Chat with {receiverName}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ maxHeight: 400, overflowY: "auto" }}>
        <List>
          {chat.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{ justifyContent: msg.senderId === senderId ? "flex-end" : "flex-start" }}
            >
              <Paper
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  maxWidth: "75%",
                  backgroundColor: msg.senderId === senderId ? "#DCF8C6" : "#F1F0F0",
                }}
              >
                <Typography>{msg.message}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}>
  {formatTimestamp(msg.timestamp)}
</Typography>
              </Paper>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            fullWidth
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <IconButton color="primary" onClick={handleSend} aria-label="send">
            <SendIcon />
          </IconButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ChatPopup;
