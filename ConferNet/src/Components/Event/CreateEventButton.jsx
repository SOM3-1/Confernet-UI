import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { getUserById } from './../../services/userService'; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../../firebase/firebaseConfig';
import { CreateEventModal } from './CreateEventModal';

export const CreateEventButton = ({handleClose}) => {
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userData = await getUserById(); 
          if (userData?.role === 1) {
            setIsOrganizer(true);
          } else {
            setIsOrganizer(false);
          }
        } catch (err) {
          console.error("Error fetching user:", err);
          setIsOrganizer(false);
        }
      } else {
        setIsOrganizer(false);
      }
    });

    return () => unsubscribe(); 
  }, []);

  if (!isOrganizer) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <Box
        component="button"
        onClick={() => setOpenModal(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          border: "none",
          borderRadius: "50px",
          padding: "12px 20px",
          backgroundColor: "#1976d2",
          color: "#fff",
          boxShadow: 3,
          cursor: "pointer",
          transition: "width 0.3s, padding 0.3s",
          "&:hover": {
            paddingRight: "40px",
            "& .fab-label": {
              opacity: 1,
              width: "auto",
              marginLeft: 1
            }
          },
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "#1565c0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddIcon />
        </Box>
        <Typography
          className="fab-label"
          sx={{
            opacity: 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: 0,
            transition: "all 0.3s ease",
            fontSize: 16,
            fontWeight: 500,
            ml: 0,
          }}
        >
          Create Event
        </Typography>
      </Box>
      <CreateEventModal open={openModal} onClose={() => {setOpenModal(false);
        handleClose();
      }} />
    </Box>
  );
};
