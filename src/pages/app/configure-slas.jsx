import dayjs from 'dayjs';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  Card,
  Grid,
  Alert,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  CardHeader,
  useMediaQuery,
  InputAdornment
} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [value, setValue] = useState(dayjs(new Date()));
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {}, 500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const [startDate, setStartDate] = useState(dayjs(new Date()));


  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Configure SLAs"
        Subheading="Setup and manage service level agreement (SLA) to set expected response time for all customer chats."
        showButton={false}
      />
      <Box sx={{ mt: 4 }}>
        <Card sx={{ p: 3 }}>
          <CardHeader title="Configure SLAs" sx={{ px: 0, pt: 0, pb: 3 }} />
          <Divider sx={{ mx: -3 }} />
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2} sx={{ width: '100%', maxWidth: 'md' }}>
              
              <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      label="Start Time"
                      value={startDate}
                      minDate={dayjs('2017-01-01')}
                      onChange={(newValue) => setStartDate(newValue)}
                      
                      ampm={false}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          InputProps: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                    title="select configure SLAs start time "
                    arrow
                    placement="top"
                    
                  >
                                <Iconify icon="carbon:time" width={24} height={24} />
                                </Tooltip>
                              </InputAdornment>
                            ),
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
            <Tooltip
                    title="click here to save configure SLAs time"
                    arrow
                    placement="top"
                    
                  >
              <Button variant="contained" color="inherit" onClick={handleAdd}>
                Save
              </Button>
              </Tooltip>
            </Box>
          </Box>
        </Card>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
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
          Configure SLAs Added Successfully!
        </Alert>
      </Snackbar>
    </DashboardContent>
  );
}
