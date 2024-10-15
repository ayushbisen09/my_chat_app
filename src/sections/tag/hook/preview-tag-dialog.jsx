import { React, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Link as RouterLink } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Box,
  Switch,
  Divider,
  Tooltip,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function PreviewTagDialog({ open, onClose }) {
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');

  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  const [firstMessage, setFirstMessage] = useState(false); // Toggle for First Message switch
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAdd = () => {
    setSnackbarOpen(true);
    setTimeout(() => {}, 500);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={onClose}
      >
        Tag Contact{' '}
        <Iconify
          onClick={onClose}
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        />
      </DialogTitle>
      <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' , mb: 3}}>
        <TextField
          autoFocus
          fullWidth
          value="Purchase"
          disabled
          type="text"
          margin="dense"
          variant="outlined"
          label="Tag Name"
          helperText={
            <span>
              Enter tag name here.{' '}
              <RouterLink to="#" style={{ color: '#078DEE' }} underline="always">
                Learn more
              </RouterLink>
            </span>
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title="Enter tag name here."
                  arrow
                  placement="top"
                  sx={{
                    fontSize: '16px',
                  }}
                >
                  <Iconify icon="material-symbols:info-outline" style={{ width: 20, height: 20 }} />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        <Typography
          variant="subtitle1"
          sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}
        >
          First Message
        </Typography>
        <Box>
          <Tooltip
            title="Click here to allows auto-tagging if users first message matches"
            arrow
            placement="left"
          >
            <FormControlLabel
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              control={
                <Switch
                  checked={1}
                  disabled
                  onChange={(e) => setFirstMessage(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography component="span" sx={{ fontSize: 14, color: 'text.primary', ml: 0.5 }}>
                  Allows auto-tagging if users first message matches
                </Typography>
              }
            />
          </Tooltip>
        </Box>

        <Tooltip title="Add first messages as much as you want" arrow placement="right">
          <Autocomplete
            multiple
            disabled
            freeSolo
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
                {...params}
                variant="outlined"
                size="medium"
                helperText="Allows auto-tagging if users first message matches"
               
              />
            )}
          />
        </Tooltip>
      </DialogContent>
    </Dialog>
  );
}
