import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';

import {
  Box,
  Alert,
  Dialog,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function RenameFolderDialog({ open, onClose, workflowName }) {
  const [newWorkflowName, setNewWorkflowName] = useState(workflowName); // Store the editable workflow name
  const [hasError, setHasError] = useState(false); // Track if there's an error
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setNewWorkflowName(workflowName); // Update the state when the dialog opens with the initial name
  }, [workflowName]);

  const handleAdd = () => {
    if (!newWorkflowName.trim()) {
      // Check if the field is empty
      setHasError(true);
      return; // Prevent form submission if empty
    }
    setHasError(false);
    setSnackbarOpen(true);
    onClose(); // Close the dialog when Update is clicked
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleNameChange = (event) => {
    setNewWorkflowName(event.target.value); // Update the name when typing
    if (event.target.value.trim()) {
      setHasError(false); // Reset the error if there's text
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle
          sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
          onClick={dialog.onFalse}
        >
          Rename Folder
          <Tooltip title="Click here to close the dialog box" arrow placement='top'>
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
          </Tooltip>
        </DialogTitle>
        <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
          <Tooltip title="Enter new name of folder here." arrow placement='top'>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Folder Name"
              value={newWorkflowName} // Set value from state
              onChange={handleNameChange} // Allow editing
              error={hasError} // Show error if validation fails
              helperText={
                hasError ? (
                  'Please enter folder name.'
                ) : (
                  <span>
                    You can rename folder from here.{' '}
                    <Tooltip title="If you have any doubt in this click learn more as it contains the forum Support" arrow placement='top'>
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                    </Tooltip>
                  </span>
                )
              }
            />
            </Tooltip>
          </Box>
        </DialogContent>

        <DialogActions>
        <Tooltip title="Click here to update the new name of the folder" arrow placement='top'>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Update
          </Button>
          </Tooltip>
          <Tooltip title="If you don't want to change the folder name click here." arrow placement='top'>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        Z-index={100}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          mt: 7,
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
          Updated!
        </Alert>
      </Snackbar>
    </>
  );
}
