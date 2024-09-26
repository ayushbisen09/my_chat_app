import dayjs from 'dayjs';
import { useState } from 'react';

import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Card, Avatar, Button, Divider, Tooltip, CardHeader,InputAdornment } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import {
  ConfigurationDrawer1,
  ConfigurationDrawer2,
} from 'src/sections/inbox-settings/hook/drawer';

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [openDrawer1, setOpenDrawer1] = useState(false);
  const [openDrawer2, setOpenDrawer2] = useState(false);

  const handleOpenDrawer1 = () => {
    setOpenDrawer1(true);
  };

  const handleCloseDrawer1 = () => {
    setOpenDrawer1(false);
  };

  const handleOpenDrawer2 = () => {
    setOpenDrawer2(true);
  };

  const handleCloseDrawer2 = () => {
    setOpenDrawer2(false);
  };

 
  const [daysClosed, setDaysClosed] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: true,
  });

  const handleToggle = (day) => {
    setDaysClosed((prev) => ({ ...prev, [day]: !prev[day] }));
  };

 
  const [startDate, setStartDate] = useState(dayjs(new Date()));

  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Inbox Settings"
        Subheading="You can customize Auto Resolving capability for users intervened for more than 24 Hours."
        showButton={false}
      />
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Auto Resolve Chats" sx={{ mb: 3 }} />
          <Divider />
          <Tooltip title="Click here to Enable/Disabled auto resolve intervened chats" arrow placement="top">
          <FormControlLabel
            control={<Switch id="toggle-taxes" />}
            label="Disable auto resolve intervened chats."
            sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
          />
          </Tooltip>
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Messages Settings" sx={{ mb: 3 }} />
          <Divider />
          <CardHeader
            title={
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Welcome Message
              </Typography>
            }
          />
          <Box sx={{ px: 3, py: 2 }}>
          <Tooltip title="Click here to Enable/Disabled configure automated reply for user's first query during working hours" arrow placement="top">
            <FormControlLabel
              control={<Switch id="toggle-taxes" />}
              label="Configure automated reply for user's first query during working hours."
            />
            </Tooltip>
          </Box>
          <Box sx={{ px: 3, pb: 3 }}>
            <Card
              sx={{
                border: '1px solid #919EAB33',
                width: '100%',
                maxWidth: '500px',
              }}
            >
              <Tooltip title="Preview" arrow placement="top">
              <CardHeader
                sx={{ mb: 2 }}
                avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                title={
                  <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                    Mireya Conner
                  </Typography>
                }
                subheader={
                  <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                    Online
                  </Typography>
                }
              />
              <Divider />
              <Typography
                variant="caption"
                sx={{
                  pr: 2,
                  pt: 3,
                  display: 'flex',
                  color: '#919EAB',
                  justifyContent: 'end',
                }}
              >
                4:02 PM
              </Typography>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#CCF4FE',
                  borderRadius: '8px',
                  m: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontSize: 14, fontWeight: '500' }}
                >
                  Hey,
                  <br />
                  {
                    ' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '
                  }
                </Typography>
              </Box>
              </Tooltip>
            </Card>
            <Tooltip title="Click here to configure automated reply for user's first query during working hours." arrow placement="top">
            <Button sx={{ mt: 3 }} variant="contained" color="inherit" onClick={handleOpenDrawer1}>
              Configure
            </Button>
            </Tooltip>
            <ConfigurationDrawer1 open={openDrawer1} onClose={handleCloseDrawer1} />
          </Box>
          <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />
          <CardHeader
            title={
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Off Hours Message
              </Typography>
            }
          />
          <Box sx={{ px: 3, py: 2 }}>
          <Tooltip title="Click here to Configure automated reply for user's first query during off hours." arrow placement="top">
            
            <FormControlLabel
              control={<Switch id="toggle-taxes" />}
              label="Configure automated reply for user's first query during off hours."
            />
            </Tooltip>
          </Box>
          <Box sx={{ px: 3, pb: 3 }}>
            <Card
              sx={{
                border: '1px solid #919EAB33',
                width: '100%',
                maxWidth: '500px',
              }}
            >
              <Tooltip title="Preview" arrow placement="top">
              <CardHeader
                sx={{ mb: 2 }}
                avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                title={
                  <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                    Mireya Conner
                  </Typography>
                }
                subheader={
                  <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                    Online
                  </Typography>
                }
              />
              <Divider />
              <Typography
                variant="caption"
                sx={{
                  pr: 2,
                  pt: 3,
                  display: 'flex',
                  color: '#919EAB',
                  justifyContent: 'end',
                }}
              >
                4:02 PM
              </Typography>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#CCF4FE',
                  borderRadius: '8px',
                  m: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontSize: 14, fontWeight: '500' }}
                >
                  Hey,
                  <br />
                  {
                    ' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '
                  }
                </Typography>
              </Box>
              </Tooltip>
            </Card>
            <Tooltip title="Click here to Configure automated reply for user's first query during off hours." arrow placement="top">
            <Button sx={{ mt: 3 }} variant="contained" color="inherit" onClick={handleOpenDrawer2}>
              Configure
            </Button>
            </Tooltip>
            
            <ConfigurationDrawer2 open={openDrawer2} onClose={handleCloseDrawer2} />
          </Box>
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          
          <CardHeader
            subheader="Configure day-wise working hours for automated replies."
            title="Working Hours"
            sx={{ mb: 3 }}
          />
          <Divider sx={{ mb: '12px' }} />
          {Object.keys(daysClosed).map((day) => (
            <Box
              key={day}
              sx={{
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600', width: '40px' }}>
                {day}
              </Typography>
              <FormControlLabel
                control={<Switch checked={!daysClosed[day]} onChange={() => handleToggle(day)} />}
                label=""
              />
              {daysClosed[day] ? (
                <Typography
                  variant="h7"
                  sx={{ fontSize: '14px', fontWeight: '600', ml: 2, minHeight: '55px' }}
                  alignContent="center"
                >
                  Closed
                </Typography>
              ) : (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      label="Start Time"
                      value={startDate}
                      minDate={dayjs('2017-01-01')}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: false,
                          InputProps: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <Iconify icon="carbon:time" width={24} height={24} />
                              </InputAdornment>
                            ),
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                  <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                    To
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileTimePicker
                      label="End Time"
                      value={startDate}
                      minDate={dayjs('2017-01-01')}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: false,
                          InputProps: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <Iconify icon="carbon:time" width={24} height={24} />
                              </InputAdornment>
                            ),
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </>
              )}
            </Box>
          ))}
          <Box sx={{ padding: '0px 24px 24px 24px' }}>
          <Tooltip title="Click here to save" arrow placement="top">
            <Button variant="contained" color="inherit">
              Save
            </Button>
            </Tooltip>
          </Box>
        </Card>
      </Box>
    </DashboardContent>
  );
}
