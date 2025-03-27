/* This code snippet is a React component called `Header` that represents a header bar for a dashboard
application. Here's a breakdown of what the code is doing: */
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ onDrawerOpen, onLogout }) => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={onDrawerOpen}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
        ConferNet Dashboard
      </Typography>
      <Button color="inherit" onClick={onLogout}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
