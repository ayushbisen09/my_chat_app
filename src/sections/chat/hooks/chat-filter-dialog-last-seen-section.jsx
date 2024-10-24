import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';


// ----------------------------------------------------------------------

export function LastSeenSection({ title, content, action, open, onClose, ...other }) {
  const [lastSeenstartDate, setLastSeenStartDate] = useState(null);
  const [lastSeenEndDate, setLastSeenEndDate] = useState(null);

  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [lastseen, setLastseenStatus] = useState();
  const LASTSEENSTATUS = [
    { value: '24_Hour', label: '24 Hour' },
    { value: 'this_week', label: 'This Week' },
    { value: 'this_month', label: 'This Month' },
  ];

  const handlelastseenstatus = useCallback((event) => {
    const selectedValue = event.target.value;
    const now = dayjs(); // Get the current date and time
    setLastseenStatus(selectedValue);

    if (selectedValue === '') {
      // When nothing is selected, clear the date fields
      setLastSeenStartDate(null);
      setLastSeenEndDate(null);
    } else if (selectedValue === '24_Hour') {
      // 24 hours from current date
      setLastSeenStartDate(now.subtract(24, 'hour'));
      setLastSeenEndDate(now);
    } else if (selectedValue === 'this_week') {
      // Set to the start and end of the current week
      const startOfWeek = now.startOf('week');
      const endOfWeek = now.endOf('week');
      setLastSeenStartDate(startOfWeek);
      setLastSeenEndDate(endOfWeek);
    } else if (selectedValue === 'this_month') {
      // Set to the start and end of the current month
      const startOfMonth = now.startOf('month');
      const endOfMonth = now.endOf('month');
      setLastSeenStartDate(startOfMonth);
      setLastSeenEndDate(endOfMonth);
    }
  }, []);

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });

  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <>
      <Box>
        <Typography fontSize="14px" fontWeight="700" mb={1}>
          Last Seen
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', mb: 2 }} gap={3}>
        <Box>
          <TextField
            sx={{ width: '320px' }}
            id="select-currency-label-x"
            variant="outlined"
            select
            fullWidth
            label="Last Seen"
            value={lastseen || ''} // Default to empty string when nothing is selected
            onChange={handlelastseenstatus}
            helperText="Click here to select last seen status filter"
          >
            <MenuItem value="">None</MenuItem> {/* Add "None" option to allow clearing */}
            {LASTSEENSTATUS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From"
              value={lastSeenstartDate}
              minDate={dayjs('2017-01-01')}
              onChange={(newValue) => {
                setLastSeenStartDate(newValue);
              }}
              slotProps={{ textField: { fullWidth: false } }}
              renderInput={(params) => (
                <TextField {...params} fullWidth error={!lastSeenstartDate} />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="To"
              value={lastSeenEndDate}
              minDate={dayjs('2017-01-01')}
              onChange={(newValue) => {
                setLastSeenEndDate(newValue);
              }}
              slotProps={{ textField: { fullWidth: false } }}
              renderInput={(params) => <TextField {...params} fullWidth error={!lastSeenEndDate} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
}
