import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { useForm, useFieldArray } from 'react-hook-form';
import { javascript } from '@codemirror/lang-javascript';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Alert,
  Stack,
  Drawer,
  styled,
  Button,
  Divider,
  Tooltip,
  Snackbar,
  TextField,
  Typography,
  IconButton,
  useMediaQuery,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

// Custom backdrop component
const CustomBackdrop = (props) => (
  <MuiBackdrop {...props} sx={{ backgroundColor: 'transparent' }} />
);

const TestCampaignDrawer = ({ open, onClose }) => {
  const theme = useTheme();
  const [isSimpleData, setIsSimpleData] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const initialJsonData = {
    apiKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzRhZDgwMzU2MDZjMTM1Zjk5NTgxZiIsIm5hbWUiOiJBaVNlbnN5IERlbW8gQWNjb3VudCIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2MzAyOWM3Mjg1ODcxODUxYTQ5MzJmNTgiLCJhY3RpdmVQbGFuIjoiUFJPX01PTlRITFkiLCJpYXQiOjE3MjgzNzQ5ODV9.6N7-Y7rYAIkyYkf_ti5TRfCChwKyWY0Gai5tzP2QnVI',
    campaignName: 'New Camp 16 Oct',
    destination: '919581984489',
    userName: 'AiSensy Demo Account',
    templateParams: ['$FirstName', '$FirstName'],
    source: 'new-landing-page form',
    media: {},
    buttons: [],
    carouselCards: [],
    location: {},
    paramsFallbackValue: {
      FirstName: 'user',
    },
  };

  const [code, setCode] = useState(JSON.stringify(initialJsonData, null, 2));
  const [showAdditionalEditor, setShowAdditionalEditor] = useState(false);
  const handleShowAdditionalEditor = () => {
    setShowAdditionalEditor(true);
  };

  const additionalEditorValue = JSON.stringify({
    success: "true",
    submitted_message_id: "6b5d5c61-af21-4d28-9d22-2c5438185139"
  }, null, 2);

  const handleCodeChange = (value) => {
    setCode(value); // Update code as a string

    try {
      const parsedData = JSON.parse(value); // Attempt to parse JSON
      console.log('Parsed JSON:', parsedData); // For debugging or additional handling
    } catch (error) {
      console.error('Invalid JSON format:', error); // Handle invalid JSON
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const CustomLink = styled(Link)({
    color: '#078DEE',
  });


  const onCopyClick = () => {
    setSnackbarOpen(true);  // Show the Snackbar

    // Optional: Copy JSON to clipboard
    navigator.clipboard.writeText(code).then(() => {
      console.log("JSON copied to clipboard");
    }).catch(err => {
      console.error("Failed to copy JSON: ", err);
    });
  };

  

  const [messageType, setMessageType] = useState('g');

  const handleRadioChange = (event) => {
    setMessageType(event.target.value);
  };

  const handleSimpleDataToggle = () => {
    setIsSimpleData(!isSimpleData);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleConfirmRemove = (index) => {
    setConfirmDelete({ open: true, index });
  };

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

  const [confirmDelete, setConfirmDelete] = useState({ open: false, index: null });

  const handleRemove = () => {
    if (confirmDelete.index !== null) {
      remove(confirmDelete.index);
      setConfirmDelete({ open: false, index: null });
    }
  };

  const handleDrawerClose = () => {
    setShowAdditionalEditor(false);  // Reset the state
    onClose();  // Call the provided onClose function
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}  // Attach modified handleDrawerClose
        PaperProps={{
          sx: {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: 'auto',
              lg: '700px',
            },
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop,
        }}
      >
        <Box
          onClick={handleBackdropClick}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography variant="h6">Test API Campaign</Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ top: 12, left: 12, zIndex: 9, position: 'unset' }}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Card>
            <Box p={3} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap={2}>
                <Typography fontSize={18} fontWeight={700}>
                  Test API Campaign
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ p: 3 }}>
              <Box sx={{ mr: 6 }}>
                {!isTabletOrMobile && (
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Box sx={{ mb: { xs: 2, sm: 0 }, width: '50%' }}>
                      <Typography variant="h7" sx={{ mb: 1, fontWeight: 600 }}>
                        WhatsApp Number
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
              <Stack spacing={3}>
                {fields.map((item, index) => (
                  <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                      <TextField fullWidth label="WhatsApp Number" />
                      {!isTabletOrMobile && (
                        <Tooltip title="Click here to delete WhatsApp number" arrow placement="top">
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
                Add More WhatsApp Number
              </Button>

              <Box
                sx={{
                  border: '1px dashed #ccc', // Dashed border styling
                  borderRadius: 1,
                  padding: 1,
                  mt: 2,
                }}
              >
                <CodeMirror
                  value={code}
                  height="200px"
                  extensions={[javascript()]}
                  onChange={(value) => handleCodeChange(value)}
                  theme="light"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
              <Tooltip title="Clear here to copy the URL" arrow placement="top">
                <Button
                  sx={{ mr: 2 }}
                  startIcon={<Iconify icon="solar:copy-bold" style={{ width: 18, height: 18 }} />}
                  size="medium"
                  variant="contained"
                  onClick={onCopyClick}  // Attach onCopyClick handler
                >
                  Copy URL
                </Button>
                </Tooltip>
                <Tooltip title="Clear here to send API campaign for testing" arrow placement="top">
                  <Button
                    onClick={handleShowAdditionalEditor}
                    sx={{ mt: isTabletOrMobile ? 2 : 0 }}
                    startIcon={<Iconify icon="bxs:send" style={{ width: 18, height: 18 }} />}
                    size="medium"
                    variant="outlined"
                    color="primary"
                  >
                    Send Test
                  </Button>
                </Tooltip>

                {showAdditionalEditor && (
              <Box
                sx={{
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  padding: 1,
                  mt: 2,
                }}
              >
                <CodeMirror
                  value= {additionalEditorValue}
                  height="auto"
                  extensions={[javascript()]}
                  onChange={(value) => handleCodeChange(value, false)}
                  theme="light"
                />
              </Box>
            )}

              </Box>
            </Box>
          </Card>
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
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
        content="Are you sure you want to remove this whatsApp number?"
        action={
          <Button variant="contained" color="error" onClick={handleRemove}>
            Delete
          </Button>
        }
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          mt: '60px',
          boxShadow: '0px 8px 16px rgba(145, 158, 171, 0.16)',
          zIndex: 999999935131,
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
          JSON copied successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export { TestCampaignDrawer };
