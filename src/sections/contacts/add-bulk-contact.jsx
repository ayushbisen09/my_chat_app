import { toast } from 'sonner';
import { useState } from 'react';
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

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

export default function AddBulkContact() {
  const [isFileValid, setIsFileValid] = useState(false);
  const [error, setError] = useState('');
  const [isFileUploaded, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  const handleCancel = () => {
    // Replace '/your-page' with the path you want to navigate to
    navigate('/dashboard/contact');
  };

  const showToast = () => {
    toast.success('Contact Added Successfully!');
  };

  // const addContact = () => {
  //   showToast();
  //   navigate('/app/contact');
  // };
  // const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUpload = (file) => {
    // Check if the file type is .csv
    if (file && file.type === 'text/csv') {
      setIsFileValid(true); // File is valid
      setError(''); // Clear any existing error
      setUploadedFile(file); // Save the file for any further processing if needed
    } else {
      setIsFileValid(false); // File is invalid
      setError('Only .csv files are allowed.'); // Display error message
    }
  };

  const addContact = () => {
    if (isFileValid) {
      // Perform the save operation
      console.log('Contact added successfully with the uploaded file.');
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
                    title="If you have the url of CSV file enter here if don't have upload the file from your locale."
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
            {error && (
              <Typography color="error" variant="body2" mt={1}>
                {error}
              </Typography>
            )}
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
          <Tooltip title="Click here to add the contact" arrow placement="top">
            <Button onClick={addContact} variant="contained" size="medium" color="primary">
              Add Contact
            </Button>
          </Tooltip>
          <Tooltip
            title="If you don't want to add new contact click this cancel button"
            arrow
            placement="top"
          >
            <Button onClick={handleCancel} variant="outlined" size="medium" color="inherit">
              Cancel
            </Button>
          </Tooltip>
        </Box>
      </Card>
    </Box>
  );
}
