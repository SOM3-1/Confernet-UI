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
  
  const drawerWidth = 240;
  
  const Sidebar = ({ open, onClose, selectedTab, onSelectTab }) => (
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
        {[
          { label: "Home", icon: <HomeIcon /> },
          { label: "Account", icon: <AccountCircleIcon /> },
          { label: "People", icon: <PeopleIcon /> },
        ].map(({ label, icon }) => (
          <ListItem
            button
            key={label}
            selected={selectedTab === label}
            onClick={() => {
              onSelectTab(label);
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
  
  export default Sidebar;
  