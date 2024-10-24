import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';


// ----------------------------------------------------------------------

export function CreateSection() {
  const [createdAtstartDate, setCreatedAtStartDate] = useState(null);
  const [createdAtEndDate, setCreatedAtEndDate] = useState(null);

  const [cretaedat, setCreatedAtStatus] = useState();

  const CREATEDATSTATUS = [
    { value: '24_Hour', label: '24 Hour' },
    { value: 'this_week', label: 'This Week' },
    { value: 'this_month', label: 'This Month' },
  ];

  const handleCreatedAtstatus = useCallback((event) => {
    const selectedValue = event.target.value;
    const now = dayjs(); // Get the current date and time
    setCreatedAtStatus(selectedValue);

    if (selectedValue === '') {
      // When nothing is selected, clear the date fields
      setCreatedAtStartDate(null);
      setCreatedAtEndDate(null);
    } else if (selectedValue === '24_Hour') {
      // 24 hours from current date
      setCreatedAtStartDate(now.subtract(24, 'hour'));
      setCreatedAtEndDate(now);
    } else if (selectedValue === 'this_week') {
      // Set to the start and end of the current week
      const startOfWeek = now.startOf('week');
      const endOfWeek = now.endOf('week');
      setCreatedAtStartDate(startOfWeek);
      setCreatedAtEndDate(endOfWeek);
    } else if (selectedValue === 'this_month') {
      // Set to the start and end of the current month
      const startOfMonth = now.startOf('month');
      const endOfMonth = now.endOf('month');
      setCreatedAtStartDate(startOfMonth);
      setCreatedAtEndDate(endOfMonth);
    }
  }, []);

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <>
      <Box>
        <Typography fontSize="14px" fontWeight="700" mb={1}>
          Created At
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
            label="Created At"
            value={cretaedat || ''} // Default to empty string when nothing is selected
            onChange={handleCreatedAtstatus}
            helperText="Click here to select created at status filter"
          >
            <MenuItem value="">None</MenuItem> {/* Add "None" option to allow clearing */}
            {CREATEDATSTATUS.map((option) => (
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
              value={createdAtstartDate}
              minDate={dayjs('2017-01-01')}
              onChange={(newValue) => {
                setCreatedAtStartDate(newValue);
              }}
              slotProps={{ textField: { fullWidth: false } }}
              renderInput={(params) => (
                <TextField {...params} fullWidth error={!createdAtstartDate} />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="To"
              value={createdAtEndDate}
              minDate={dayjs('2017-01-01')}
              onChange={(newValue) => {
                setCreatedAtEndDate(newValue);
              }}
              slotProps={{ textField: { fullWidth: false } }}
              renderInput={(params) => (
                <TextField {...params} fullWidth error={!createdAtEndDate} />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
}
