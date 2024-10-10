import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

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
  TextField,
  CardHeader,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import PageHeader from 'src/components/page-header/page-header';

export default function Page() {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, index: null });

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

  const handleConfirmRemove = (index) => {
    setConfirmDelete({ open: true, index });
  };

  const handleRemove = () => {
    if (confirmDelete.index !== null) {
      remove(confirmDelete.index);
      setConfirmDelete({ open: false, index: null });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const saveAttributes = () => {
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
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <TextField fullWidth label="Attribute name" />
                    <TextField fullWidth label="Attribute description" />
                    {!isTabletOrMobile && (
                      <Tooltip title="Click here to delete attribute" arrow placement="top">
                        <Button
                          size="small"
                          sx={{ color: 'grey.600', minWidth: 'auto' }}
                          onClick={() => handleConfirmRemove(index)}
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
                        onClick={() => handleConfirmRemove(index)}
                        disabled={fields.length === 1}
                      >
                        <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                      </Button>
                    </Box>
                  )}
                </Stack>
              ))}
            </Stack>

            <Button
              size="small"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAdd}
              sx={{ mt: 3 }}
            >
              Add More Attribute
            </Button>

            <Box sx={{ mt: 3 }}>
              <Button onClick={saveAttributes} variant="contained" color="inherit">
                Save
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Attributes Saved Successfully!
        </Alert>
      </Snackbar>

      <ConfirmDialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, index: null })}
        title="Delete"
        content="Are you sure you want to remove this attribute?"
        action={
          <Button variant="contained" color="error" onClick={handleRemove}>
            Delete
          </Button>
        }
      />
    </DashboardContent>
  );
}
