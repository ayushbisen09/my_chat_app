import { useState } from 'react';
import { useTheme } from '@emotion/react';
import ReactCountryFlag from 'react-country-flag';

import {
  Box,
  Chip,
  Button,
  Dialog,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogActions,
  DialogContent,
  useMediaQuery,
  InputAdornment,
  FormControlLabel
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { countries } from 'src/assets/data';

import { Iconify } from 'src/components/iconify';

export function EditContactDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleCountryChange = (event) => {
    setSelectedCountry(countries.find((country) => country.code === event.target.value));
  };
  const updatedCountries = countries.map((country) => ({
    ...country,
    phone: `+${country.phone}`,
  }));



  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect',]);
  const [tagInput, setTagInput] = useState('');
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
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
          Edit Contact{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column',  }}>
        

          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Name*"
            helperText=
             
                "Enter your access token here."
               
              
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter new name."
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
            sx={{ mb: 3 }}
          />
          <FormControlLabel
              control={
                <TextField
                  fullWidth
                  helperText="Enter the mobile number."
                  placeholder="Enter mobile number"
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Select
                          value={selectedCountry.code}
                          onChange={handleCountryChange}
                          renderValue={(value) => (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginRight: 2,
                                ml: '-14px',
                              }}
                            >
                              <ReactCountryFlag
                                countryCode={value}
                                svg
                                style={{ marginRight: 8, width: '24px', height: '24px' }}
                              />
                              {updatedCountries.find((country) => country.code === value).phone}
                            </Box>
                          )}
                          sx={{
                            mr: 1,
                            minWidth: 100,
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '& .MuiSelect-select': { paddingRight: '24px' },
                          }}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 300,
                              },
                            },
                          }}
                        >
                          {updatedCountries.map((country) => (
                            <MenuItem key={country.code} value={country.code}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ReactCountryFlag
                                  countryCode={country.code}
                                  svg
                                  style={{ marginRight: 8, width: '24px', height: '24px' }}
                                />
                                {country.label} ({country.phone})
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </InputAdornment>
                    ),
                  }}
                />
              }
              sx={{ width: '100%', mr: 0, ml: 0 ,   mb : 3}}
            />
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
            <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Source"

            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Source Attribute."
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
            sx={{ mt: 3 }}
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

      {/* Snackbar component */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          zIndex: theme.zIndex.drawer + 10000000000,
          overflow: 'visible'
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
      </Snackbar> */}
    </>
  );
}
