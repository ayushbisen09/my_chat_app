import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import {
  Box,
  Card,
  Stack,
  Alert,
  Button,
  Divider,
  Tooltip,
  useTheme,
  Snackbar,
  CardHeader,
  Typography,
  useMediaQuery,
  InputAdornment
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

export default function Page() {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });

  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({
      title: '',
      description: '',
    });
  };

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const saveAttributes = () => {
    // Show Snackbar
    setSnackbarOpen(true);
  };

  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="User Attributes"
        Subheading="Attributes hold Dialogflow parameters' value & you can also assign them custom value from contacts page."
      />
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="User Attributes" sx={{ mb: 3 }} />
          <Divider />
          <Box sx={{ p: 3 }}>
            <Box sx={{ mr: 6 }}>
              {!isTabletOrMobile && (
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Box sx={{ mb: { xs: 2, sm: 0 }, width: '50%' }}>
                    <Typography variant="h7" sx={{ mb: 3, fontWeight: 600 }}>
                      Attribute Name
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2, width: '50%' }}>
                    <Typography variant="h7" sx={{ mb: 3, fontWeight: 600 }}>
                      Attribute Description
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
            <Stack spacing={3}>
              {fields.map((item, index) => (
                <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    sx={{ width: 1 }}
                    alignItems="center"
                  >
                    <TextField variant="outlined" fullWidth label="Attribute name" 
                     InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter Attribute Name."
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
                    }}/>
                    <TextField variant="outlined" fullWidth label="Attribute description"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter Attribute Description."
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
                    }}/>
                    {!isTabletOrMobile && (
                      <Tooltip title="Click here to delete attribute" arrow placement="top">
                      <Button
                        size="small"
                        sx={{ color: 'grey.600', minWidth: 'auto' }}
                        onClick={() => handleRemove(index)}
                        disabled={fields.length === 1}
                      >
                        <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                      </Button>
                      </Tooltip>
                    )}
                  </Stack>
                  {isTabletOrMobile && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                      <Button
                        size="small"
                        sx={{ color: 'grey.600', minWidth: 'auto' }}
                        onClick={() => handleRemove(index)}
                        disabled={fields.length === 1}
                      >
                        <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                      </Button>
                    </Box>
                  )}
                </Stack>
              ))}
            </Stack>
            <Tooltip title="click here to add more attribute" arrow placement="top">
            <Button
              size="small"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAdd}
              sx={{ mt: 3, alignSelf: 'flex-start' }}
            >
              Add More Attribute
            </Button>
            </Tooltip>

            <Box sx={{ mt: 3 }}>
            <Tooltip title="Click here to save attribute" arrow placement="top">
              <Button onClick={saveAttributes} variant="contained" color="inherit">
                Save
              </Button>
              </Tooltip>
            </Box>
          </Box>
        </Card>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000} // Adjust duration as needed
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
          Attributes Saved Successfully!
        </Alert>
      </Snackbar>
    </DashboardContent>
  );
}
