import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Snackbar,
  Alert,
  CssBaseline,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";

import Schedule from "../Schedule/Schedule";
import MySchedule from "../Schedule/MySchedule";
import VenueMap from "../Schedule/VenueMap";
import Account from "../Account/Account";
import People from "../People/People";
// import Messages from "../Messages/Message";

const drawerWidth = 240;

function Home() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Home");
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMessage("Logout successful! Redirecting to login...");
      setAlertType("success");
      setOpenSnackbar(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Logout failed. Please try again.");
      setAlertType("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Account":
        return <Account />;
      case "People":
        return <People />;
      case "Home":
      default:
        return (
          <>
            <Schedule />
            <MySchedule />
            <VenueMap />
          </>
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ConferNet Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem button selected={selectedTab === "Home"} onClick={() => { setSelectedTab("Home"); setDrawerOpen(false); }}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button selected={selectedTab === "Account"} onClick={() => { setSelectedTab("Account"); setDrawerOpen(false); }}>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem button selected={selectedTab === "People"} onClick={() => { setSelectedTab("People"); setDrawerOpen(false); }}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="People" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container>{renderContent()}</Container>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertType} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;
