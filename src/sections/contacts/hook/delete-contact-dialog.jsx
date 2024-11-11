import { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Button,
  Dialog,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  useMediaQuery,
  FormHelperText,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

export function DeleteContactDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  // State for the first FormControl
  const [deleteContact, setDeleteContact] = useState('Current List');
  const [helperText, setHelperText] = useState('Delete contact from current contact list.');

  // State to control ConfirmDialog visibility
  const [confirmOpen, setConfirmOpen] = useState(false);

  // State for ConfirmDialog content and title
  const [confirmDialogTitle, setConfirmDialogTitle] = useState('');
  const [confirmDialogContent, setConfirmDialogContent] = useState('');

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleStatusChange1 = (event) => {
    const { value } = event.target;
    setDeleteContact(value);

    // Update helper text based on the selected value
    if (value === 'Current List') {
      setHelperText('Delete contact from current contact list');
    } else if (value === 'All List') {
      setHelperText('Delete contact from all contact list');
    }
  };

  const handleDelete = () => {
    if (deleteContact === 'Current List') {
      setConfirmDialogTitle('Delete Contact from Current List');
      setConfirmDialogContent('Are you sure to delete this contact from this contact list');
    } else if (deleteContact === 'All List') {
      setConfirmDialogTitle('Delete Contact from All Lists');
      setConfirmDialogContent('Are you sure to delete this contact from all contact list');
    }
    setConfirmOpen(true); // Open the ConfirmDialog
  };

  const handleConfirmClose = (confirmed) => {
    setConfirmOpen(false); // Close the ConfirmDialog
    if (confirmed) {
      setSnackbarOpen(true); // Open the Snackbar if confirmed
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const getTooltipMessage = () => {
    switch (deleteContact) {
      case 'Current List':
        return 'This option will delete contacts only from the currently selected list.';
      case 'All List':
        return 'This option will delete contacts from all lists.';
      default:
        return 'Please choose an option to see the effect.';
    }
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
          Delete Contact From Current or All List{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="status-select-label-1">Choose List</InputLabel>
            <Tooltip title={getTooltipMessage()} arrow placement="top">
              <Select
                labelId="status-select-label-1"
                id="status-select-1"
                value={deleteContact}
                label="Choose List"
                onChange={handleStatusChange1}
                size="large"
              >
                <MenuItem value="Current List">Current List</MenuItem>
                <MenuItem value="All List">All List</MenuItem>
              </Select>
            </Tooltip>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </DialogContent>

        <DialogActions>
        <Tooltip title="If you don't want to delete contact click this cancel button." arrow placement="top">
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          </Tooltip>
          <Tooltip title="Click here to delete." arrow placement="top">
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => handleConfirmClose(false)}
        title={confirmDialogTitle}
        content={confirmDialogContent}
        action={
          <Button variant="contained" color="error" onClick={() => handleConfirmClose(true)}>
            Confirm
          </Button>
        }
      />

      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        message="Contact deleted successfully"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      /> */}
    </>
  );
}
