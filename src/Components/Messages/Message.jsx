/* The above code is a React component called `Message` that handles messaging functionality. Here is a
summary of what the code is doing: */
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
  Button,
  Tooltip,
  Divider,
  Paper
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { getAllUsers } from "../../services/userService";
import { sendMessage, getConversations } from "../../services/messageService";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import ChatPopup from "./MessageModal";

function Message() {
  const [people, setPeople] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [inbox, setInbox] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const currentUserId = localStorage.getItem("userId");

  const getInitials = (name) => {
    if (!name) return "NA";
    const parts = name.trim().split(" ");
    return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const allUsers = await getAllUsers();
        const userMapTemp = {};
        const mappedPeople = allUsers.map((user) => {
          userMapTemp[user.id] = user.name;
          return {
            id: user.id,
            name: user.name,
            initials: getInitials(user.name),
          };
        });
        setUserMap(userMapTemp);
        setPeople(mappedPeople);
      } catch (err) {
        console.error("Error fetching users:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const conversations = await getConversations(currentUserId);
        setInbox(conversations);
      } catch (err) {
        console.error("Error fetching conversations:", err.message);
      }
    };

    fetchInbox();
    const interval = setInterval(fetchInbox, 5000);
    return () => clearInterval(interval);
  }, [currentUserId]);

  const filteredInbox = inbox.filter((conv) => {
    const name = userMap[conv.otherUserId] || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleOpenPopup = (userId = null) => {
    setSelectedUserId(null);
    setChatLoading(true);
    setPopupOpen(true);
    setTimeout(() => {
      setSelectedUserId(userId);
      setChatLoading(false);
    }, 100);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">Inbox</Typography>
          <Button variant="contained" size="small" onClick={() => handleOpenPopup(null)} disabled={true}>
            New Message
          </Button>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name..."
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

        {loading ? (
          <LoadingSpinner />
        ) : (
          <List>
            {filteredInbox.map((conv) => {
              const isUnread = conv.lastSender !== currentUserId;
              return (
                <Paper key={conv.id} variant="outlined" sx={{ mb: 2 }}>
                  <ListItem alignItems="flex-start" sx={{ flexDirection: "column", alignItems: "stretch", p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ListItemAvatar>
                          <Avatar>{getInitials(userMap[conv.otherUserId])}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle1" fontWeight={isUnread ? "bold" : "normal"}>
                                From {userMap[conv.otherUserId] || conv.otherUserId}
                              </Typography>
                              {isUnread && (
                                <FiberManualRecordIcon color="primary" sx={{ fontSize: 10 }} />
                              )}
                            </Box>
                          }
                          secondary={
                            <Typography
                              variant="body1"
                              fontWeight={isUnread ? "bold" : "normal"}
                              display="inline"
                            >
                              {conv.lastMessage}
                            </Typography>
                          }
                        />
                      </Box>
                      <Button variant="outlined" size="small" onClick={() => handleOpenPopup(conv.otherUserId)}>
                        Continue Chat
                      </Button>
                    </Box>
                  </ListItem>
                </Paper>
              );
            })}
          </List>
        )}
      </CardContent>

      {popupOpen && (chatLoading ? (
        <LoadingSpinner />
      ) : (
        <ChatPopup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          senderId={currentUserId}
          receiverId={selectedUserId}
          receiverName={selectedUserId ? userMap[selectedUserId] : "Select a user"}
        />
      ))}
    </Card>
  );
}
export default Message;