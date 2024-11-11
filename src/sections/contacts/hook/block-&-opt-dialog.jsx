import { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Alert,
  Button,
  Dialog,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  Snackbar,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  useMediaQuery,
  FormHelperText,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

export function BlockandOptDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const [Incoming, setIncoming] = useState('Open');
  const [helperText1, setHelperText1] = useState('Make no change to incoming message behaviour.');

  const [OptedIn, setOptedIn] = useState('Open');
  const [helperText2, setHelperText2] = useState('Make no change to Opt-in preferences.');

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleStatusChange1 = (event) => {
    const { value } = event.target;
    setIncoming(value);

    switch (value) {
      case 'Open':
        setHelperText1('Make no change to incoming message behaviour.');
        break;
      case 'On Hold':
        setHelperText1('Block all incoming messages from user.');
        break;
      case 'Replied':
        setHelperText1('Unblock all incoming messages from user.');
        break;
      default:
        setHelperText1('');
    }
  };

  const handleStatusChange2 = (event) => {
    const { value } = event.target;
    setOptedIn(value);

    switch (value) {
      case 'Open':
        setHelperText2('Make no change to Opt-in preferences.');
        break;
      case 'On Hold':
        setHelperText2('Opt-in to all business messages.');
        break;
      case 'Replied':
        setHelperText2('Opt-out from all business messages.');
        break;
      default:
        setHelperText2('');
    }
  };

  const handleAdd = () => {
    setSnackbarOpen(true);
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
          Block and Opt{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Label
              color="primary"
              sx={{ width: '100%', display: 'block', fontSize: '16px', p: 3, my: 3 }}
            >
              1 Contact Selected
            </Label>
          </Box>

          {/* First FormControl */}
          <FormControl fullWidth sx={{ mb: 3, mt: 0 }}>
            <InputLabel id="status-select-label-1">Incoming</InputLabel>
            <Tooltip title={helperText1} arrow placement='top'>
              <Select
                labelId="status-select-label-1"
                id="status-select-1"
                value={Incoming}
                label="Incoming"
                onChange={handleStatusChange1}
                size="large"
              >
                <MenuItem value="Open">None</MenuItem>
                <MenuItem value="On Hold">Block</MenuItem>
                <MenuItem value="Replied">Unblock</MenuItem>
              </Select>
            </Tooltip>
            <FormHelperText>{helperText1}</FormHelperText>
          </FormControl>

          {/* Second FormControl */}
          <FormControl fullWidth sx={{ mt: 0 }}>
            <InputLabel id="status-select-label-2">Opted In</InputLabel>
            <Tooltip title={helperText2} arrow placement='top'>
              <Select
                labelId="status-select-label-2"
                id="status-select-2"
                value={OptedIn}
                label="Opted In"
                onChange={handleStatusChange2}
                size="large"
              >
                <MenuItem value="Open">None</MenuItem>
                <MenuItem value="On Hold">Yes</MenuItem>
                <MenuItem value="Replied">No</MenuItem>
              </Select>
            </Tooltip>
            <FormHelperText>{helperText2}</FormHelperText>
          </FormControl>
        </DialogContent>

        <DialogActions>
        <Tooltip title="If you don't want to change the block and opt click this cancel button ." arrow placement="top">
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          </Tooltip>
          <Tooltip title="Click to save changes" arrow placement='top'>
            <Button onClick={handleAdd} variant="contained" color="primary">
              Save
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          zIndex: theme.zIndex.drawer + 10000000000,
          overflow: 'visible',
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
          Updating conversation preferences!
        </Alert>
      </Snackbar>
    </>
  );
}
