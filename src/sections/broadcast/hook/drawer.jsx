import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Drawer,
  styled,
  Typography,
  IconButton,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import DrawerTable from './select-contact-drawer-table';

// Custom backdrop component
const CustomBackdrop = (props) => (
  <MuiBackdrop
    {...props}
    sx={{ backgroundColor: 'transparent' }} // Make the backdrop transparent
  />
);

const SelectContactDrawer = ({ open, onClose }) => {
  const handleBackdropClick = (event) => {
    // Prevent clicks inside the drawer from closing it
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const CustomLink = styled(Link)({
    color: '#078DEE',
  });

  const [messageType, setMessageType] = useState('g');

  const handleRadioChange = (event) => {
    setMessageType(event.target.value);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: 'auto',
              lg: '1110px',
            }, // Adjust width as needed
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop, // Use the custom backdrop
        }}
      >
        <Box
          onClick={handleBackdropClick} // Handle clicks outside the drawer
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h6">Select Contact</Typography>
          <IconButton onClick={onClose} sx={{ top: 12, left: 12, zIndex: 9, position: 'unset' }}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
        <DrawerTable />
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

export { SelectContactDrawer };
