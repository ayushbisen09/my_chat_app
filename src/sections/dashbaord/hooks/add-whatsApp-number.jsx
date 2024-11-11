import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Alert,
  Divider,
  Tooltip,
  Snackbar,
  MenuItem,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function WhatsAppDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [accessToken, setAccessToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [categorylist, setCategoryList] = useState('');

  const FolderOptions = [
    { value: '1', label: 'None' },
    { value: '2', label: 'Company B' },
    { value: '3', label: 'WhatsApp Database' },
    { value: '4', label: '- Child Folder 1 - Subscription Billing' },
    { value: '5', label: '- Child Folder 2' },
    { value: '5', label: '-- Grand child 1' },
    { value: '6', label: '-- Grand child 2' },
    { value: '7', label: '--- Folder 1' },
    { value: '8', label: '--- Folder 2' },
  ];

  const handleChangeCategoryList = useCallback((event) => {
    const selectedValue = event.target.value; // Get the value from the event
    setCategoryList(selectedValue); // Update the state with the selected value
    if (selectedValue) {
      setCategoryError(false); // Remove error if a value is selected
    }
  }, []);

  const handleAdd = () => {
    // Validate if folder is selected
    if (!categorylist || categorylist === 'None') {
      setCategoryError(true); // Set error if no valid folder is selected
      return; // Stop submission if validation fails
    }

    // Show the snackbar if validation passes
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

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Add WhatsApp Number{' '}
          <Tooltip title="Click here to close the dialog box" arrow placement='top'>
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
          </Tooltip>
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Access Token"
            helperText={
              <span>
                Enter your access token here.{' '}
                <Tooltip title="If you have any doubt in this click learn more as it contains the forum Support" arrow placement='top'>
                <Link href="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </Link>
                </Tooltip>
              </span>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter your Access Token here."
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px', // Adjust the font size as needed
                    }}
                  >
                    <Iconify
                      icon="material-symbols:info-outline"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="WhatsApp Business Account ID"
            helperText={
              <span>
                Enter your WhatsApp business account ID here.{' '}
                <Tooltip title="If you have any doubt in this click learn more as it contains the forum Support" arrow placement='top'>
                <Link href="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </Link>
                </Tooltip>
              </span>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter your WhatsApp business account ID here."
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px', // Adjust the font size as needed
                    }}
                  >
                    <Iconify
                      icon="material-symbols:info-outline"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Phone Number ID"
            helperText={
              <span>
                Enter your phone number ID here.{' '}
                <Tooltip title="If you have any doubt in this click learn more as it contains the forum Support" arrow placement='top'>
                <Link href="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </Link>
                </Tooltip>
              </span>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter your phone number ID here."
                    arrow
                    placement="top"
                    sx={{
                      fontSize: '16px', // Adjust the font size as needed
                    }}
                  >
                    <Iconify
                      icon="material-symbols:info-outline"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
<Tooltip title="Click here to select the existing folder to store whatsapp number" arrow placement='top'>
          <TextField
            sx={{ width: '100%', mt: 1 }}
            id="select-currency-label-x"
            variant="outlined"
            select
            fullWidth
            label="Select Folder"
            value={categorylist}
            onChange={handleChangeCategoryList}
            helperText={categoryError ? "You must select a folder." : "Select folder name here."}
            error={categoryError} // Add error prop based on validation
            InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
            inputProps={{ id: `outlined-select-currency-label` }}
          >
            {FolderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </Tooltip>
        </DialogContent>

        <DialogActions>
        <Tooltip title="Click here to cancel" arrow placement='top'>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          </Tooltip>
          <Tooltip title="Click here to add WhatsApp number" arrow placement='top'>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add
          </Button>
          </Tooltip>
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
          WhatsApp Number Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
