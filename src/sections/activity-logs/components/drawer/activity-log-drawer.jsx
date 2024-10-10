import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Alert,
  Drawer,
  styled,
  Switch,
  Divider,
  Snackbar,
  Typography,
  IconButton,
  FormControlLabel,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Custom backdrop component
const CustomBackdrop = (props) => (
  <MuiBackdrop
    {...props}
    sx={{ backgroundColor: 'transparent' }}
  />
);

const ActivityLogDrawer = ({ open, onClose }) => {
  const theme = useTheme();
  const [isSimpleData, setIsSimpleData] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleBackdropClick = (event) => {
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

  const handleSimpleDataToggle = () => {
    setIsSimpleData(!isSimpleData);
  };

  const eventData = {
    _csrf: "",
    merchant_id: "64157431afb2392d9ff09405"
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(JSON.stringify(eventData, null, 2))
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
              lg: '700px',
            },
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop,
        }}
      >
        <Box
          onClick={handleBackdropClick}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography variant="h6">Activity Log</Typography>
            <Typography fontSize={14} color="grey.600">
              Event ID - 66f4fe07357fab6725a6fd2a
            </Typography>
            <Typography fontSize={14} color="grey.600">
              Action - Created (POST)
            </Typography>
            <Typography fontSize={14} color="grey.600">
              Executed At - 26/09/2024 02:24 AM
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ top: 12, left: 12, zIndex: 9, position: 'unset' }}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Card>
            <Box p={3} display='flex' justifyContent='space-between'>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography fontSize={18} fontWeight={700}>
                  Event Data
                </Typography>
                <IconButton onClick={handleCopyClick}>
                  <Iconify sx={{ color: 'grey.600' }} icon="solar:copy-bold" />
                </IconButton>
              </Box>
              <FormControlLabel
                control={<Switch id="toggle-simple-data" checked={isSimpleData} onChange={handleSimpleDataToggle} />}
                label="Simple Data"
                labelPlacement='start'
              />
            </Box>
            <Divider />
            <Box sx={{ p: 3 }} display='flex' flexDirection='column'>
              {isSimpleData ? (
                <pre>{JSON.stringify(eventData, null, 2)}</pre>
              ) : (
                <>
                  <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '500' }}>
                    Csrf: {eventData._csrf}
                  </Typography>
                  <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '500' }}>
                    Merchant Id: {eventData.merchant_id}
                  </Typography>
                </>
              )}
            </Box>
          </Card>
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
      <Snackbar
    
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
        mt:'60px',
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          zIndex: 999999999999999,
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          JSON copied successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export { ActivityLogDrawer };