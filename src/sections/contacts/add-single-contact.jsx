import { toast } from 'sonner';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { useForm, FormProvider } from 'react-hook-form';

import {
  Box,
  Card,
  Chip,
  Button,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  Typography,
  Autocomplete,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { countries } from 'src/assets/data';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export default function AddSingleContact() {
  const methods = useForm();

  // Contact List Events
  const [contactlist, setContatList] = useState('Pabbly_Connect_list');

  const handleChangeContactList = useCallback((event) => {
    setContatList(event.target.value);
  }, []);

  const CONTACTLISTS = [
    { value: 'Pabbly_Connect_list', label: 'Pabbly Connect list' },
    { value: 'Pabbly_Subscription_Billing_list', label: 'Pabbly Subscription Billing list' },
    { value: 'Pabbly_Form_Builder_list', label: 'Pabbly Form Builder list' },
  ];

  // Optin Status Events
  const [optinstatus, setOptinStatus] = useState('Opted_in');

  const optinStatusChange = useCallback((event) => {
    setOptinStatus(event.target.value);
  }, []);

  const OPTINSTATUS = [
    { value: 'Opted_in', label: 'Opted In' },
    { value: 'Opted_out', label: 'Opted Out' },
  ];

  // Country code Events
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (event) => {
    setSelectedCountry(countries.find((country) => country.code === event.target.value));
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const updatedCountries = countries.map((country) => ({
    ...country,
    phone: `+${country.phone}`,
  }));

  // Form Events
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  // Tag Events
  const TAGS = [
    { value: 'Purchase', label: 'Purchase' },
    { value: 'Pabbly_Connect', label: 'Pabbly Connect' },
    { value: 'Pabbly_Subscription_Billing', label: 'Pabbly Subscription Billing' },
  ];
  const [tagInput, setTagInput] = useState();
  const [tags, setTags] = useState();

  const navigate = useNavigate();

  const handleCancel = () => {
    // Replace '/your-page' with the path you want to navigate to
    navigate('/dashboard/contact');
  };

  const showToast = () => {
    toast.success('Contact Added Successfully!');
  };

  const addContact = () => {
    showToast();
    navigate('/app/contact');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Card>
        <CardHeader title="Add Single Contact" sx={{ mb: 3 }} />
        <Divider />
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            {/* ... (other form controls remain unchanged) ... */}
            <FormControlLabel
              control={
                <TextField
                  sx={{ width: '100%' }}
                  id="select-currency-label-x"
                  variant="outlined"
                  select
                  fullWidth
                  label="Select Contact List  (Required)"
                  value={contactlist}
                  onChange={handleChangeContactList}
                  helperText="Select contact list in which this contact is added."
                  InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
                  inputProps={{ id: `outlined-select-currency-label` }}
                >
                  {CONTACTLISTS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              }
              sx={{ width: '100%', padding: '32px 24px 24px 24px', mr: 0, ml: 0 }}
            />

            <FormControlLabel
              control={
                <TextField
                  fullWidth
                  helperText="Enter the contact's mobile number."
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
              sx={{ width: '100%', padding: '0px 24px 32px 24px', mr: 0, ml: 0 }}
            />
            <FormControlLabel
              control={
                <TextField
                  sx={{ width: '100%' }}
                  id="select-currency-label-x"
                  variant="outlined"
                  select
                  fullWidth
                  label="Optin Status (Required)"
                  value={optinstatus}
                  onChange={optinStatusChange}
                  helperText="Select opt-in status here."
                  InputLabelProps={{ htmlFor: `outlined-select-currency-label` }}
                  inputProps={{ id: `outlined-select-currency-label` }}
                >
                  {OPTINSTATUS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              }
              sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
            />
            <FormControlLabel
              control={
                <TextField
                  fullWidth
                  type="text"
                  margin="dense"
                  variant="outlined"
                  label="Name (Optional)"
                  helperText="Enter the name of the contact."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Enter the name of the contact."
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
              }
              sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
            />
            <FormControlLabel
              control={
                <Autocomplete
                  disableClearable
                  multiple
                  freeSolo
                  options={TAGS}
                  getOptionLabel={(option) => option.label || option}
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
                        label={typeof option === 'string' ? option : option.label}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      helperText="Select the tag you want to assign to this contact."
                      label="Tags Optional"
                      {...params}
                      variant="outlined"
                      size="large"
                      placeholder="+ Add a tag"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                            <InputAdornment position="end">
                              <Iconify
                                icon="mingcute:down-line"
                                style={{ width: 20, height: 20 }}
                              />
                            </InputAdornment>
                          </>
                        ),
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
                  renderOption={(props, option) => (
                    <MenuItem {...props} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )}
                  sx={{ width: '100%' }}
                />
              }
              sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
            />
            <Typography
              sx={{ fontWeight: '600', width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
            >
              User Attributes (Optional)
            </Typography>
            <FormControlLabel
              control={
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ width: '100%', display: 'flex', gap: '16px', mb: '24px' }}>
                    <TextField
                      fullWidth
                      value="city"
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Label"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="User Attributes defined in setting page."
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
                      fullWidth
                      // placeholder="Enter value"
                      
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Enter Value"
                    />
                  </Box>
                  <Box sx={{ width: '100%', display: 'flex', gap: '16px', mb: '24px' }}>
                    <TextField
                      fullWidth
                      value="email"
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Label"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="User Attributes defined in setting page."
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
                      fullWidth
                      // placeholder="Enter value"
                      
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Enter Value"
                    />
                  </Box>
                  <Box sx={{ width: '100%', display: 'flex', gap: '16px' }}>
                    <TextField
                      fullWidth
                      value="order id"
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Label"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="User Attributes defined in setting page."
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
                      fullWidth
                      // placeholder="Enter value"
                      
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Enter Value"
                    />
                  </Box>
                </Box>
              }
              sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
            />
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                padding: '0px 24px 24px 24px',
                mr: 0,
                ml: 0,
              }}
            >
              <Button onClick={addContact} variant="contained" size="large" color="inherit">
                Add Contact
              </Button>
              <Button onClick={handleCancel} variant="outlined" size="large" color="inherit">
                Cancel
              </Button>
            </Box>
          </Form>
        </FormProvider>
      </Card>
    </Box>
  );
}
