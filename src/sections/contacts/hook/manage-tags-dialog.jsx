import { useState } from 'react';
import { useTheme } from '@emotion/react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  Alert,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
// import { Iconify } from './';

// ----------------------------------------------------------------------

export function ManageTagsDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [accessToken, setAccessToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  const [orderId, setOrderId] = useState('#56767');
  const [email, setEmail] = useState('ankit.mandli@pabbly.com');
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
          Manage Attributes{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            {/* <Label color="primary" sx={{ width: '100%', display: 'block', fontSize: '16px', p: 3 ,my : '16px' }}>
            1 Contact Selected
          </Label> */}
            <Box width="40%"><Tooltip title="Attribute name." arrow placement="top">
              <Typography mb={2} fontWeight={600}>
                Attribute Name
              </Typography>
              </Tooltip>
            </Box>
            <Box width="60%">
            <Tooltip title="Attribute value if you want to enter or change the value of attribute enter the text following below input field." arrow placement="top">
              <Typography mb={2} fontWeight={600}>
                Attribute Value
              </Typography>
              </Tooltip>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box width="40%">
                <Typography fontSize={14}>Order Id</Typography>
              </Box>
              <Box width="60%">
                <TextField
                  fullWidth
                  size="small"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box width="40%">
                <Typography fontSize={14}>Email</Typography>
              </Box>
              <Box width="60%">
                <TextField
                  fullWidth
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
        <Tooltip title="If you don't want to change the attribute click this cancel button." arrow placement="top">
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          </Tooltip>
          <Tooltip title="Click here to save the attribute for this contact." arrow placement="top">
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
          mt: '50px',
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
          Attributes Updated Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
