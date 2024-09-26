import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Card,
  Radio,
  Drawer,
  styled,
  Divider,
  Tooltip,
  CardHeader,
  Typography,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import RegularMessage from '../regular-message';
import PreApprovedMessage from '../pre-approved-message';

// Custom backdrop component
const CustomBackdrop = (props) => (
  <MuiBackdrop
    {...props}
    sx={{ backgroundColor: 'transparent' }} // Make the backdrop transparent
  />
);

const ConfigurationDrawer1 = ({ open, onClose }) => {
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
          <Typography variant="h6">Configure Message</Typography>
          <IconButton onClick={onClose} sx={{ top: 12, left: 12, zIndex: 9, position: 'unset' }}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardHeader
              subheader="Setup keywords that user can type to Opt-in & Opt-out from messaging campaign. "
              title="Welcome Message"
              sx={{ mb: 3 }}
            />

            <Divider />
            <Box sx={{ p: 3 }}>
            <Tooltip title="Message type" arrow placement="top">
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Select Message Type
              </Typography>
              </Tooltip>
              <RadioGroup row value={messageType} onChange={handleRadioChange}>
              <Tooltip title="Pre-approved template message" arrow placement="left">
                <FormControlLabel
                  value="g"
                  control={<Radio size="small" />}
                  label="Pre-approved template message"
                />
                </Tooltip>
                <Tooltip title="Regular message" arrow placement="right">
                <FormControlLabel
                  value="p"
                  control={<Radio size="small" />}
                  label="Regular Message"
                />
                </Tooltip>
              </RadioGroup>
              {messageType === 'g' && (
                <form>
                  <PreApprovedMessage />
                </form>
              )}

              {messageType === 'p' && (
                <form>
                  <RegularMessage />
                </form>
              )}
            </Box>
          </Card>
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

const ConfigurationDrawer2 = ({ open, onClose }) => {
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
          <Typography variant="h6">Configure Message</Typography>
          <IconButton onClick={onClose} sx={{ top: 12, left: 12, zIndex: 9, position: 'unset' }}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardHeader
              subheader="Setup keywords that user can type to Opt-in & Opt-out from messaging campaign. "
              title="Off Hours Message"
              sx={{ mb: 3 }}
            />

            <Divider />
            <Box sx={{ p: 3 }}>
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Select Message Type
              </Typography>
              <RadioGroup row value={messageType} onChange={handleRadioChange}>
                <FormControlLabel
                  value="g"
                  control={<Radio size="small" />}
                  label="Pre-approved template message"
                />
                <FormControlLabel
                  value="p"
                  control={<Radio size="small" />}
                  label="Regular Message"
                />
              </RadioGroup>
              {messageType === 'g' && (
                <form>
                  <PreApprovedMessage />
                </form>
              )}

              {messageType === 'p' && (
                <form>
                  <RegularMessage />
                </form>
              )}
            </Box>
          </Card>
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

export { ConfigurationDrawer1, ConfigurationDrawer2 };
