import { toast } from 'sonner';
import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Button,
  Divider,
  Tooltip,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
} from '@mui/material';

import { countries } from 'src/assets/data';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

export default function AddBulkContact() {
  

  // Contact List Events

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
        <CardContent>
          <TextField
            sx={{ mb: 3 }}
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            label="Enter CSV file URL"
            helperText={
              <span>
                Upload your contacts file in .csv format. Upto 50MB file size(~2lakhs contacts) is
                allowed.{' '}
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
          <Typography sx={{ fontWeight: '600', mb: 3 }}>OR</Typography>
          <Box mb={3}>
            <FileUpload onFileUpload={handleFileUpload} />
          </Box>
          {isFileUploaded && (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ width: '100%', mb: 3 }}>
                <Divider
                  sx={{
                    borderStyle: 'dashed',
                    fontWeight: '600',
                    mb: 3,
                  }}
                />

                <Typography
                  sx={{
                    fontWeight: '600',
                    mb: 3,
                  }}
                >
                  Header Identifiers
                </Typography>
                <Box sx={{ width: '100%', display: 'flex', gap: 2, mb: 3 }}>
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
                    select
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="Enter Value"
                  />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', gap: 2, mb: 3 }}>
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
                <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
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
                    mb: 3,
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
          )}
        </CardContent>

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
          <Button onClick={addContact} variant="contained" size="medium" color="primary">
            Add Contact
          </Button>
          <Button onClick={handleCancel} variant="outlined" size="medium" color="inherit">
            Cancel
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
