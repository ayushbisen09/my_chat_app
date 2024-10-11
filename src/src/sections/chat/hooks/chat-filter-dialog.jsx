import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  Alert,
  Radio,
  Stack,
  Divider,
  Tooltip,
  Snackbar,
  MenuItem,
  TextField,
  Typography,
  RadioGroup,
  useMediaQuery,
  FormControlLabel,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ChatFilterDialog({ title, content, action, open, onClose, ...other }) {
  const [lastSeenstartDate, setLastSeenStartDate] = useState(null); 
  const [lastSeenEndDate, setLastSeenEndDate] = useState(null); 

  const [createdAtstartDate, setCreatedAtStartDate] = useState(null); 
  const [createdAtEndDate, setCreatedAtEndDate] = useState(null); 
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [lastseen, setLastseenStatus] = useState();
  const [attributes, setAttributes] = useState(['']); 
  const [attributeConditions, setAttributeConditions] = useState(['']); 
  const [attributeValues, setAttributeValues] = useState(['']);
  const [cretaedat, setCreatedAtStatus] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAttributeChange = (index, event) => {
    const newAttributes = [...attributes];
    newAttributes[index] = event.target.value;
    setAttributes(newAttributes);

    // Reset condition and value when attribute changes
    const newAttributeConditions = [...attributeConditions];
    const newAttributeValues = [...attributeValues];
    newAttributeConditions[index] = '';
    newAttributeValues[index] = '';
    setAttributeConditions(newAttributeConditions);
    setAttributeValues(newAttributeValues);
  };

  const handleAttributeConditionChange = (index, event) => {
    const newAttributeConditions = [...attributeConditions];
    newAttributeConditions[index] = event.target.value;
    setAttributeConditions(newAttributeConditions);
  };

  const handleAttributeValueChange = (index, event) => {
    const newAttributeValues = [...attributeValues];
    newAttributeValues[index] = event.target.value;
    setAttributeValues(newAttributeValues);
  };

  const getFilteredConditions = (attribute) => {
    switch (attribute) {
      case 'name':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value !== 'has' && condition.value !== 'has_not'
        );
      case 'mobile_number':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value !== 'has' && condition.value !== 'has_not'
        );
      case 'text':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value === 'has' || condition.value === 'has_not'
        );
      case 'source':
      case 'first_message':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value !== 'has' && condition.value !== 'has_not'
        );
      case 'campaign':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value === 'has' || condition.value === 'has_not'
        );
      case 'closed':
      case 'requested':
        return ATTRIBUTESCONDITIONS.filter((condition) => condition.value === 'is');
      default:
        return ATTRIBUTESCONDITIONS;
    }
  };


  const shouldEnableSelectForAttributeValue = (attribute) => {
    const selectableAttributes = ['text', 'first_message', 'campaign', 'closed', 'requested'];
    return selectableAttributes.includes(attribute);
  };

  const LASTSEENSTATUS = [
    { value: '24_Hour', label: '24 Hour' },
    { value: 'this_week', label: 'This Week' },
    { value: 'this_month', label: 'This Month' },
  ];

  const ATTRIBUTES = [
    { value: 'name', label: 'Name' },
    { value: 'mobile_number', label: 'Mobile Number' },
    { value: 'text', label: 'Tags' },
    { value: 'source', label: 'Source' },
    { value: 'first_message', label: 'First Message' },
    { value: 'campaign', label: 'Campaign' },
    { value: 'closed', label: 'Closed' },
    { value: 'requested', label: 'Requested' },
    { value: 'email', label: 'Email' },
  ];

  const ATTRIBUTESCONDITIONS = [
    { value: 'is', label: 'Is' },
    { value: 'is_not', label: 'Is Not' },
    { value: 'contains', label: 'Not_Contains' },
    { value: 'has', label: 'Has' },
    { value: 'has_not', label: 'Has Not' },
  ];

  const CREATEDATSTATUS = [
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

  const handleAddFilter = () => {
    // Implement your logic to apply the Filter in the Chat
    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const [optedIn, setOptedIn] = useState('yes');
  const [incomingBlocked, setIncomingBlocked] = useState('yes');
  const [readStatus, setReadStatus] = useState('yes');

  const handleOptedInChange = (event) => setOptedIn(event.target.value);
  const handleIncomingBlockedChange = (event) => setIncomingBlocked(event.target.value);
  const handleReadStatusChange = (event) => setReadStatus(event.target.value);

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

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleAdd = () => {
    append({
      title: '',
      description: '',
    });
    setAttributes([...attributes, '']);
    setAttributeConditions([...attributeConditions, '']);
    setAttributeValues([...attributeValues, '']);
  };

  const getAttributeValueOptions = (attribute) => {
    switch (attribute) {
      case 'text':
        return ['Vip', 'Stream', 'Random Values'];
      case 'first_message':
        return ['Set', 'Not Set', 'Something'];
      case 'campaign':
        return ['Boost Your Brand 2024', 'Summer Sales Surge', 'Holiday Cheer Deals' , 'New Year, New Deals' , 'Spring Refresh Campaign' , 'Back-to-School Bonanza']; // Replace with actual campaign names
      case 'closed':
      case 'requested':
        return ['Yes', 'No'];
      default:
        return [];
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '880px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Chat Filter{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                  renderInput={(params) => (
                    <TextField {...params} fullWidth error={!lastSeenEndDate} />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>

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
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Box
              sx={{
                width: '100%',
                mb: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Opted In</Typography>

                <Tooltip title="Opted in for broadcast" arrow placement="top">
                  <Iconify
                    icon="material-symbols:info-outline"
                    style={{ width: 20, height: 20, color: '#637381' }}
                  />
                </Tooltip>
              </Box>

              <RadioGroup row value={optedIn} onChange={handleOptedInChange}>
                <FormControlLabel
                  value="yes"
                  control={<Radio size="small" />}
                  label="Yes"
                  sx={{ mr: 3 }}
                />

                <FormControlLabel
                  value="no"
                  control={<Radio size="small" />}
                  label="No"
                  sx={{ mr: 3 }}
                />

                <FormControlLabel
                  value="all"
                  control={<Radio size="small" />}
                  label="All"
                  sx={{ mr: 3 }}
                />
              </RadioGroup>
            </Box>

            <Box
              sx={{
                width: '100%',
                mb: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Incoming Blocked
                </Typography>

                <Tooltip title="User blocked due to spam/abusive behaviour" arrow placement="top">
                  <Iconify
                    icon="material-symbols:info-outline"
                    style={{ width: 20, height: 20, color: '#637381' }}
                  />
                </Tooltip>
              </Box>

              <RadioGroup row value={incomingBlocked} onChange={handleIncomingBlockedChange}>
                <FormControlLabel
                  value="yes"
                  control={<Radio size="small" />}
                  label="Yes"
                  sx={{ mr: 3 }}
                />

                <FormControlLabel
                  value="no"
                  control={<Radio size="small" />}
                  label="No"
                  sx={{ mr: 3 }}
                />

                <FormControlLabel
                  value="all"
                  control={<Radio size="small" />}
                  label="All"
                  sx={{ mr: 3 }}
                />
              </RadioGroup>
            </Box>

            <Box
              sx={{
                width: '100%',
                mb: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Read Status</Typography>

                <Tooltip title="User based on read and unread messages" arrow placement="top">
                  <Iconify
                    icon="material-symbols:info-outline"
                    style={{ width: 20, height: 20, color: '#637381' }}
                  />
                </Tooltip>
              </Box>

              <RadioGroup row value={readStatus} onChange={handleReadStatusChange}>
                <FormControlLabel
                  value="read"
                  control={<Radio size="small" />}
                  label="Read"
                  sx={{ mr: 3 }}
                />

                <FormControlLabel
                  value="unread"
                  control={<Radio size="small" />}
                  label="Unread"
                  sx={{ mr: 3 }}
                />

                <FormControlLabel
                  value="all"
                  control={<Radio size="small" />}
                  label="All"
                  sx={{ mr: 3 }}
                />
              </RadioGroup>
            </Box>
          </Box>

          <Box>
            <Box sx={{ mr: 6 }}>
              {!isTabletOrMobile && (
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ mb: { xs: 2, sm: 0 }, width: '50%' }}>
                    <Typography fontSize="14px" sx={{ fontWeight: 700, mb: 2 }}>
                      Attributes
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
            <Stack spacing={3}>
            {fields.map((item, index) => (
              <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={2}
                  sx={{ width: 1 }}
                  alignItems="center"
                >
                  <TextField
                    id="select-currency-label-x"
                    variant="outlined"
                    select
                    fullWidth
                    label="Attributes"
                    value={attributes[index] || ''}
                    onChange={(event) => handleAttributeChange(index, event)}
                    helperText="Click here to select Attributes"
                  >
                    {ATTRIBUTES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="select-currency-label-x"
                    variant="outlined"
                    select
                    fullWidth
                    label="Attributes Condition"
                    value={attributeConditions[index] || ''}
                    onChange={(event) => handleAttributeConditionChange(index, event)}
                    helperText="Click here to select condition"
                  >
                    {getFilteredConditions(attributes[index]).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  {shouldEnableSelectForAttributeValue(attributes[index]) ? (
                    <TextField
                      id="select-currency-label-x"
                      variant="outlined"
                      select
                      fullWidth
                      label="Attributes Value"
                      value={attributeValues[index] || ''}
                      onChange={(event) => handleAttributeValueChange(index, event)}
                      helperText="Select Attribute value"
                    >
                      {getAttributeValueOptions(attributes[index]).map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      id="select-currency-label-x"
                      variant="outlined"
                      fullWidth
                      label="Attributes Value"
                      value={attributeValues[index] || ''}
                      onChange={(event) => handleAttributeValueChange(index, event)}
                      helperText="Enter Attribute value here"
                    />
                  )}

                  {!isTabletOrMobile && (
                    <Tooltip title="Click here to delete attribute" arrow placement="top">
                      <Button
                        size="small"
                        sx={{ color: 'grey.600', minWidth: 'auto' }}
                        onClick={() => handleRemove(index)}
                        disabled={fields.length === 1}
                      >
                        <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                      </Button>
                    </Tooltip>
                  )}
                </Stack>
                {isTabletOrMobile && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: '100%',
                      justifyItems: 'center',
                    }}
                  >
                    <Button
                      size="small"
                      sx={{ color: 'grey.600', minWidth: 'auto' }}
                      onClick={() => handleRemove(index)}
                      disabled={fields.length === 1}
                    >
                      <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                    </Button>
                  </Box>
                )}
              </Stack>
            ))}
          </Stack>
            <Tooltip title="click here to add more attribute" arrow placement="top">
              <Button
                size="small"
                color="primary"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={handleAdd}
                sx={{ mt: 3, alignSelf: 'flex-start' }}
              >
                Add More Attribute
              </Button>
            </Tooltip>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAddFilter} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
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
          Filter Applied Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
