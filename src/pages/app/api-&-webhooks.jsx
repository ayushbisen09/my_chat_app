import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import TextField from '@mui/material/TextField';
import {
  Box,
  Card,
  Alert,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  CardHeader,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import { WebhookDialog } from 'src/sections/api-&-webhook/hook/add-webhook';
import BigCard from 'src/sections/api-&-webhook/components/bigcard/big-card';
import { ApiWebhookTable } from 'src/sections/api-&-webhook/components/table/api-webhook-table';

// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dialog = useBoolean();



  const copyToClipboard = () => {
    navigator.clipboard
      .writeText('●●●●●●●●●●●●●●●●●●')
      .then(() => {
        // Show a Snackbar or some feedback that the text was copied
        showSnackbar('API Token copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* <BlankView title="Notification Preferences" /> */}
      <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="API & Webhooks"
          Subheading="API & Webhooks is the secret key used for authentication while making a request to our APIs."
          showButton={false}
        />
        <Tooltip title="Click here to add WhatsApp Number." arrow placement="top">
        <Button
          onClick={dialog.onTrue}
          sx={{ mt: isMobile ? 2 : 0 }}
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          color="primary"
        >
          Add Webhook
        </Button>
        </Tooltip>
        <WebhookDialog open={dialog.value} onClose={dialog.onFalse} />
</Box>
        <Box sx={{ mt: 4 }}>
          {' '}
          {/* Add margin-top and padding for spacing */}
          <Card sx={{ p: 3 }}>
            {' '}
            {/* Add padding to the Card */}
            <CardHeader title="API" sx={{ px: 0, pt: 0, pb: 3 }} />
            <Divider sx={{ mx: -3 }} /> {/* Extend Divider to full width */}
            <Box sx={{ mt: 3 }}>
              <TextField
       
                variant="outlined"
                // fullWidth
                label="Here's your Pabbly Broadcasting API Token"
                value="●●●●●●●●●●●●●●●●●●"
                helperText={
                  <span>
                    Enter the above API token for the Pabbly Broadcasting Manager app. When a new
                    API token will be generated, the previous API token will no longer be valid.
                  </span>
                }
                InputProps={{
                  endAdornment: (
                    <Tooltip
                      title="Copy API Token"
                      arrow
                      placement="top"
                      sx={{
                        fontSize: '16px',
                      }}
                    >
                      <Box component="span" sx={{ cursor: 'pointer' }}>
                        <Iconify
                          icon="solar:copy-bold"
                          onClick={copyToClipboard}
                          style={{ width: 20, height: 20, color: '#637381' }}
                        />
                      </Box>
                    </Tooltip>
                  ),
                }}
              />
              <Box sx={{ mt: 2 }}>
              <Tooltip title="Click here to generate API token." arrow placement="top">
                <Button variant="contained" color="primary">
                  Generate API Token
                </Button>
                </Tooltip>
              </Box>
            </Box>
          </Card>
          {/* card section started */}

          <BigCard />
          <ApiWebhookTable/>
        </Box>
      </DashboardContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000} // Adjust duration as needed
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
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
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
