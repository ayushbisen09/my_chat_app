import { useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Card,
  Alert,
  Avatar,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  Snackbar,
  TextField,
  CardHeader,
  Typography,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

export default function RegularMessage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [messageType, setMessageType] = useState('text');
  const [file, setFile] = useState(null);
  const [chatBoxImage, setChatBoxImage] = useState('');
  const [message, setMessage] = useState(
    'Thank you for opting-out. In the future, if you ever want to connect again just send "Hello".'
  );

  const MESSAGETYPES = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'file', label: 'File' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
  ];

  const handleChangeMessageType = useCallback((event) => {
    const selectedType = event.target.value;
    setMessageType(selectedType);

    const defaultImages = {
      text: '',
      image: '../../assets/images/chatImage/imagechat.png',
      video: '../../assets/images/chatImage/video.png',
      file: '../../assets/images/chatImage/document.png',
      audio: '../../assets/images/chatImage/audio.png',
    };

    setChatBoxImage(defaultImages[selectedType] || defaultImages.text);
    if (['file', 'audio', 'video'].includes(selectedType)) {
      setMessage('');
    }
  }, []);

  const handleFileUpload = useCallback((uploadedFile) => {
    setFile(uploadedFile);
  }, []);

  const handleAdd = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = useCallback((event, reason) => {
    if (reason !== 'clickaway') {
      setSnackbarOpen(false);
    }
  }, []);

  const handleMessageChange = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} width="100%">
          <Box width="100%" pr={isMobile ? 0 : 2}>
            <Tooltip title="Select regular message type" arrow placement="top">
              <TextField
                sx={{ mb: 3 }}
                select
                fullWidth
                label="Select Regular Message Type"
                value={messageType}
                onChange={handleChangeMessageType}
                helperText="Select one from your WhatsApp approved template messages"
              >
                {MESSAGETYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Tooltip>

            {messageType === 'text' && (
              <Tooltip title="Enter your message" arrow placement="top">
                <TextField
                  rows={4}
                  fullWidth
                  multiline
                  label="Message"
                  value={message}
                  onChange={handleMessageChange}
                />
              </Tooltip>
            )}

            {(messageType === 'image' || messageType === 'video') && (
              <>
                <Tooltip title="Enter caption" arrow placement="top">
                  <TextField
                    sx={{ mb: 3 }}
                    fullWidth
                    label="Caption"
                    value={message}
                    onChange={handleMessageChange}
                    helperText="You are allowed a maximum of 4096 characters."
                  />
                </Tooltip>

                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Header File URL"
                  helperText="Size < 5MB, Accepted formats: .png, .jpeg"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Enter header URL" arrow placement="top">
                          <Iconify icon="material-symbols:info-outline" style={{ width: 20, height: 20 }} />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography sx={{ textAlign: 'center', fontWeight: 600, py: 3 }}>OR</Typography>

                <FileUpload onFileUpload={handleFileUpload} />

                <TextField
                  sx={{ mt: 3 }}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="File Name"
                  helperText="Display name of media file, visible on download."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Enter the name of media file, visible on download" arrow placement="top">
                          <Iconify icon="material-symbols:info-outline" style={{ width: 20, height: 20 }} />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}

            {(messageType === 'file' || messageType === 'audio') && (
              <>
                <TextField
                  sx={{ mb: 3 }}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Header File URL"
                  helperText="Size < 5MB, Accepted formats: .png, .jpeg"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Enter header URL" arrow placement="top">
                          <Iconify icon="material-symbols:info-outline" style={{ width: 20, height: 20 }} />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography sx={{ textAlign: 'center', fontWeight: 600, py: 3 }}>OR</Typography>

                <FileUpload onFileUpload={handleFileUpload} />

                <TextField
                  sx={{ mt: 3 }}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="File Name"
                  helperText="Display name of media file, visible on download."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Enter the name of media file, visible on download" arrow placement="top">
                          <Iconify icon="material-symbols:info-outline" style={{ width: 20, height: 20 }} />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
          </Box>

          <Tooltip title="Regular message preview" arrow placement="top">
            <Box width={isMobile ? '100%' : '40%'} sx={{ pl: isMobile ? 0 : 2, mt: isMobile ? 3 : 0 }}>
              <Card sx={{ border: '1px solid #919EAB33', width: '391.77px' }}>
                <CardHeader
                  sx={{ mb: 2 }}
                  avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                  title={
                    <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 700 }}>
                      Mireya Conner
                    </Typography>
                  }
                  subheader={
                    <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: 400 }}>
                      Online
                    </Typography>
                  }
                />
                <Divider />
                <Typography
                  variant="caption"
                  sx={{ pr: 2, pt: 3, display: 'flex', color: '#919EAB', justifyContent: 'flex-end' }}
                >
                  4:02 PM
                </Typography>
                <Box sx={{ p: 2, backgroundColor: '#CCF4FE', borderRadius: 1, m: 2 }}>
                  {chatBoxImage && (
                    <Box sx={{ mb: 2 }}>
                      <img src={chatBoxImage} alt="Chat Preview" style={{ width: '100%', borderRadius: 8 }} />
                    </Box>
                  )}
                  <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500 }}>
                    {message}
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Tooltip>
        </Box>

        <Tooltip title="Save regular message type" arrow placement="top">
          <Button sx={{ mt: 3 }} variant="contained" onClick={handleAdd}>
            Save
          </Button>
        </Tooltip>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)' }}
        >
          Your template regular message is saved successfully.
        </Alert>
      </Snackbar>
    </>
  );
}
