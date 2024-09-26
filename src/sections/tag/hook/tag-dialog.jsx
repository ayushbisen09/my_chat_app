import { React, useState } from 'react';
import { useTheme } from '@emotion/react';
import { Link as RouterLink } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Box,
  Alert,
  Switch,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function TagDialog({ open, onClose }) {
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState(''); // State to manage the selected category
  const [newCategory, setNewCategory] = useState(''); // State to handle new category input
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  const [customerJourney, setCustomerJourney] = useState(false);
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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    if (event.target.value === 'new') {
      setNewCategory('');
    }
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
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

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TextField
            autoFocus
            fullWidth
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
                    <Iconify
                      icon="material-symbols:info-outline"
                      style={{ width: 20, height: 20 }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
{/* 
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="option1">Event</MenuItem>
              <MenuItem value="option2">VIP</MenuItem>
              <MenuItem value="option3">Pabbly Hiring</MenuItem>
              <MenuItem value="new">Create New</MenuItem>
            </Select>
            <FormHelperText>
              <span>
                You can select from existing categories or create a new one.{' '}
                <RouterLink to="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </RouterLink>
              </span>
            </FormHelperText>
          </FormControl> */}

          {/* {category === 'new' && (
            <TextField
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="New Category"
              value={newCategory}
              onChange={handleNewCategoryChange}
              placeholder="Enter new category name"
              helperText="Enter a name for your new category"
            />
          )} */}

          {/* <Typography variant="subtitle1" sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>
            Customer Journey
          </Typography>
          <Box>
            <FormControlLabel
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2 }}
              control={
                <Switch
                  checked={customerJourney}
                  onChange={(e) => setCustomerJourney(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography component="span" sx={{ fontSize: 14, color: 'text.primary', ml: 0.5 }}>
                  Enable to track this tag in your customers journey
                </Typography>
              }
            />
          </Box> */}

          <Typography variant="subtitle1" sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>
            First Message
          </Typography>
          <Box>
            <Tooltip title="Click here to allows auto-tagging if users first message matches" arrow placement="left">
            <FormControlLabel
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
              control={
                <Switch
                  checked={firstMessage}
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

          {firstMessage && (
            <Tooltip title="Add first messages as much as you want" arrow placement="right">
            <Autocomplete
              multiple
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
                  placeholder="+ Enter Keywords"
                />
              )}
            />
            </Tooltip>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Tooltip title="Click here to add tag" arrow placement="top">
          <Button onClick={handleAdd} variant="contained">
            Add
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
          Tag Contact Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
