import dayjs from 'dayjs';
import { useState } from 'react';

import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Card, Button, Divider, Tooltip, CardHeader, InputAdornment } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function WorkingHours() {
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
 
  );
}
