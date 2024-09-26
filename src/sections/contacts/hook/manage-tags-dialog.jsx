import { useState } from 'react';
import { useTheme } from '@emotion/react';

import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  Divider,
  TextField,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
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
    }, 500);
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
  return (
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
          Manage Tags{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Label color="primary" sx={{ width: '100%', display: 'block', fontSize: '16px', p: 3 ,my : '16px' }}>
            1 Contact Selected
          </Label>
        </Box>
        <Autocomplete
              multiple
              freeSolo
              sx={{p:'0.5'}}
              options={[]}
              value={tags}
              onChange={(event, newValue) => setTags(newValue)}
              inputValue={tagInput}
              onInputChange={(event, newInputValue) => {
                setTagInput(newInputValue);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && tagInput.trim()) {
                  setTags([...tags, tagInput.trim()]);
                  setTagInput('');
                  event.preventDefault();
                }
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="soft"
                    color="info"
                    size="small"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  onClick={handleAddTag}
                  {...params}
                  variant="outlined"
                  size="large"
                  helperText="Manage Tags"
                  placeholder="+ Add a tag"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <InputAdornment position="Start" />,
                  }}
                  sx={{
                    '& .MuiAutocomplete-inputRoot': {
                      minHeight: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                    },
                  }}
                />
              )}
            />
          
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
  );
}
