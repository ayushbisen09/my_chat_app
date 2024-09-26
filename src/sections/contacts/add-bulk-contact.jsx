import { toast } from 'sonner';
import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import {
  Box,
  Card,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  Typography,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { countries } from 'src/assets/data';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

export default function AddBulkContact() {
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
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState();

  const navigate = useNavigate();

  const handleCancel = () => {
    // Replace '/your-page' with the path you want to navigate to
    navigate('/dashboard/contact');
  };

  const showToast = () => {
    toast.success('Contact Added Successfully!');
  };

  const showToast2 = () => {
    toast.error('CNo');
  };

  const addContact = () => {
    showToast();
    navigate('/app/contact');
  };
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUpload = (file) => {
    if (file) {
      setIsFileUploaded(true);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      
      <Card>
        <CardHeader title="Add Bulk Contact" sx={{ mb: 3 }} />
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
                <Divider
                  sx={{
                    borderStyle: 'dashed',
                    fontWeight: '600',
                    width: '100%',

                    mr: 2,
                    ml: 0,
                  }}
                />
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
                  label="Enter CSV file URL"
                  helperText={
                    <span>
                      Upload your contacts file in .csv format. Upto 50MB file size(~2lakhs
                      contacts) is allowed.{' '}
                      <Link href="#" style={{ color: '#078DEE' }} underline="always">
                        Download Sample CSV
                      </Link>
                    </span>
                  }
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

            <Typography
              sx={{ fontWeight: '600', width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
            >
              OR
            </Typography>
            <FormControlLabel
              control={
                <FileUpload onFileUpload={handleFileUpload} />
                // <Upload/>
              }
              sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
            />

            {isFileUploaded && (
              <FormControlLabel
                control={
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ width: '100%' }}>
                      <FormControlLabel
                        control={
                          <Divider
                            sx={{
                              borderStyle: 'dashed',
                              fontWeight: '600',
                              width: '100%',

                              mr: 2,
                              ml: 0,
                            }}
                          />
                        }
                        sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
                      />
                      <Typography
                        sx={{
                          fontWeight: '600',
                          width: '100%',
                          padding: '0px 0px 24px 0px',
                          mr: 0,
                          ml: 0,
                        }}
                      >
                        Header Identifiers
                      </Typography>
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
                      select
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Enter Value"
                    />
                        {/* <TextField
                          fullWidth
                          placeholder="Enter value"
                          type="text"
                          margin="dense"
                          variant="outlined"
                          label="Value"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="Enter the value for the respective user attribute."
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
                        /> */}
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
                      select
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
                      select
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Enter Value"
                    />
                      </Box>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        sx={{
                          fontWeight: '600',
                          width: '100%',
                          padding: '24px 0px 24px 0px',
                          mr: 0,
                          ml: 0,
                        }}
                      >
                        User Attributes (Optional)
                      </Typography>
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
                      select
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
                      select
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
                      select
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Enter Value"
                    />
                      </Box>
                    </Box>
                  </Box>
                }
                sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
              />
            )}
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
