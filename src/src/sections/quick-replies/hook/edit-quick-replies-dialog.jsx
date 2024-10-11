import { useTheme } from '@emotion/react';
import React, { useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  Card,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  Typography,
  CardHeader,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

// ----------------------------------------------------------------------
export function EditQuickRepliesDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [chatBoxImage, setChatBoxImage] = useState(''); // State for the image based on the selected type

  const handleChangemessagetype = useCallback((event) => {
    const selectedType = event.target.value;
    setmessagetype(selectedType);
    if (selectedType === 'file' || selectedType === 'audio' || selectedType === 'video') {
      setMessage('');
    }

    // Update the chat box image based on the selected type
    switch (selectedType) {
      case 'text':
        setChatBoxImage('');
        break;
      case 'image':
        setChatBoxImage('../../assets/images/chatImage/imagechat.png');
        break;
      case 'video':
        setChatBoxImage('../../assets/images/chatImage/video.png');
        break;
      case 'file':
        setChatBoxImage('../../assets/images/chatImage/document.png');
        break;
      case 'audio':
        setChatBoxImage('../../assets/images/chatImage/audio.png');
        break;
      default:
        setChatBoxImage('../../assets/images/chatImage/default.png');
    }
  }, []);
  const MESSAGETYPE = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'file', label: 'File' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
  ];
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
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
  const handleFileUpload = () => {
    if (file) {
      setIsFileUploaded(true);
      setFile(file);
    }
  };
  const [file, setFile] = useState(null); // To store uploaded file
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [messagetype, setmessagetype] = useState('text');
  const [message, setMessage] = useState(
    'Thank you for opting-out. In future if you ever want to connect again just send "Hello".'
  ); // State to store the entered message
  
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
         Edit Quick Replies{' '}
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
            label="Enter Shortcut"
            helperText={
              <span>
                Enter shortcut for your quick reply.{' '}
                <RouterLink to="#" style={{ color: '#078DEE' }} underline="always">
                  Learn more
                </RouterLink>
              </span>
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title="Enter shortcut for your quick reply."
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
          <Box sx={{ mt: '24px' }}>
            <Box flexDirection={isMobile ? 'column' : 'row'} width="100%">
              <Tooltip title="Click here to select regular message type" arrow placement="top">
                <TextField
                  sx={{ mb: 3 }}
                  id="select-messagetype-label-x"
                  select
                  fullWidth
                  label="Message Type"
                  value={messagetype}
                  onChange={handleChangemessagetype}
                  helperText="Select one fo the message types to proceed"
                >
                  {MESSAGETYPE.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Tooltip>

              {/* Conditional rendering based on selected type */}
              {messagetype === 'text' && (
                <Tooltip title="Enter message here" arrow placement="top">
                  <TextField
                    rows={4}
                    fullWidth
                    multiline
                    label="Enter message here."
                    value={message}
                    onChange={handleMessageChange} // Update state on text change
                    helperText=""
                  />
                </Tooltip>
              )}

              {(messagetype === 'image' || messagetype === 'video') && (
                <>
                  <Tooltip title="Enter caption here" arrow placement="top">
                    <TextField
                      sx={{ mb: 3 }}
                      fullWidth
                      label="Caption"
                      value={message}
                      onChange={handleMessageChange} // Update state on text change
                      helperText="You are allowed a maximum of 4096 characters."
                    />
                  </Tooltip>

                  <TextField
                    sx={{ mt: 0 }}
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="Header File URL"
                    helperText="Size < 5MB, Accepted formats : .png or .jpeg"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter header url"
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
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      width: '100%',
                      padding: '24px 0px 24px 0px',
                      mr: 0,
                      ml: 0,
                    }}
                  >
                    OR
                  </Typography>

                  <FileUpload onFileUpload={handleFileUpload} />
                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="File Name"
                    helperText="Display name of media file, visible on download."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter the name of media file, visible on download"
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
                </>
              )}

              {(messagetype === 'file' || messagetype === 'audio') && (
                <>
                  <TextField
                    sx={{ mt: 0 }}
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="Header File URL"
                    helperText="Size < 5MB, Accepted formats : .png or .jpeg"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter header url"
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
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: '600',
                      width: '100%',
                      padding: '24px 0px 24px 0px',
                      mr: 0,
                      ml: 0,
                    }}
                  >
                    OR
                  </Typography>

                  <FileUpload onFileUpload={handleFileUpload} />
                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="File Name"
                    helperText="Display name of media file, visible on download."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter the name of media file, visible on download"
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
                </>
              )}
            </Box>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            margin="dense"
            variant="outlined"
            label="Enter Text"
            helperText="Use text formatting - *bold* & _italic_ Text can be upto 4096 characters long
Personalize messages with - $FirstName, $Name, $MobileNumber, $LastName & custom attributes.
Customize messages with dynamic parameters e.g. - Your verification code is {{1}}."
          />
          <Tooltip title="Quick replies message type preview" arrow placement="top">
            <Box>
              <Card
                sx={{
                  border: '1px solid #919EAB33',
                  width: '100%',
                  // maxWidth: '500px',
                }}
              >
                <CardHeader
                  sx={{ mb: 2 }}
                  title={
                    <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                      Mireya Conner
                    </Typography>
                  }
                />
                <Divider />

                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#CCF4FE',
                    borderRadius: '8px',
                    m: 2,
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {chatBoxImage && (
                      <img
                        src={chatBoxImage}
                        alt="Chat Preview"
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: 14, fontWeight: '500', mb: chatBoxImage ? 0 : 0 }}
                  >
                    {message}
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Tooltip>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
          Quick Replies Updated Successfully!
        </Alert>
      </Snackbar> */}
    </>
  );
}
