import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Home", icon: <HomeIcon />, path: "/home" },
    { label: "Account", icon: <AccountCircleIcon />, path: "/home/account" },
    { label: "People", icon: <PeopleIcon />, path: "/home/people" },
    { label: "Messages", icon: <ChatIcon />, path: "/home/messages" },
  ];

  const activeTab = tabs.find((tab) =>
    location.pathname.startsWith(tab.path)
  )?.label;

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {tabs.map(({ label, icon, path }) => (
          <ListItem
            button
            key={label}
            selected={activeTab === label}
            onClick={() => {
              navigate(path);
              onClose();
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
