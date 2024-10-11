import { useTheme } from '@emotion/react';
import { useState,useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  Alert,
  Switch,
  Divider,
  Tooltip,
  Snackbar,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,InputAdornment,
  FormControlLabel
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';
// import { Iconify } from './';

// ----------------------------------------------------------------------

export function FallbackAndIntentDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const [messagetype, setmessagetype] = useState('text');
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [file, setFile] = useState(null); // To store uploaded file

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

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
  const MESSAGETYPE = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Video' },
  ];
   const handleChangemessagetype = useCallback((event) => {
    const selectedType = event.target.value;
    setmessagetype(selectedType);
    
  }, []);
  const handleFileUpload = () => {
    if (file) {
      setIsFileUploaded(true);
      setFile(file);
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
          Fallback and Intents{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
  <Typography variant="subtitle1" sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>
    Default Message
  </Typography>
  <Box>
    <FormControlLabel
      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}
      control={
        <Switch
          id="toggle-taxes"
          // checked={includeTaxes}
          // onChange={handleChangeIncludeTaxes}
        />
      }
      label={
        <Typography component="span" sx={{ fontSize: 14, color: 'text.primary', ml: 0.5 }}>
          This message will trigger when the user does not respond as per the flow
        </Typography>
      }
    />
  </Box>
</Box>
        <TextField
                sx={{ mb: 3,mt: 1 }}
                id="select-messagetype-label-x"
                select
                fullWidth
                label="Select Regular Message Type"
                value={messagetype}
                onChange={handleChangemessagetype}
                helperText="Select one from your WhatsApp approved template messages"
              >
                {MESSAGETYPE.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {messagetype === 'text' && (
              <Tooltip title="Enter message here" arrow placement="top">
                <TextField
                sx={{mt:-1}}
                 
                  fullWidth
                  multiline
                  label="Enter message here"
                  placeholder='Enter message here'
                />
              </Tooltip>
            )}
            {(messagetype === 'image' || messagetype === 'video') && (
              <>
                <Tooltip title="Enter caption here" arrow placement="top">
                  <TextField
                  sx={
                    {mb: 3, mt: -1}
                  }
                    fullWidth
                    label="Caption"
                    
                    // onChange={handleMessageChange} // Update state on text change
                    helperText='You are allowed a maximum of 4096 characters.'
                  />
                </Tooltip>

                <TextField
                  sx={{ mt:-1}}
                  fullWidth
                  type="text"
                  margin="dense"
                  variant="outlined"
                  label="Header File URL"
                  helperText="Size < 5MB, Accepted formats : .png or .jpeg"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Enter header url"
                          arrow
                          placement="top"
                          sx={{
                            fontSize: '16px',
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
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600',
                    width: '100%',
                    padding: '24px 0px 24px 0px',
                    my: 0
                  }}
                >
                  OR
                </Typography>

                <FileUpload onFileUpload={handleFileUpload} />
                
              </>
            )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained">
            Save
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
          WhatsApp Number Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
