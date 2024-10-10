
import { useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Card,
  Alert,
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

export default function OffHourMessageRegularMessage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currency, setCurrency] = useState('text');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [file, setFile] = useState(null); // To store uploaded file
  const [chatBoxImage, setChatBoxImage] = useState(''); // State for the image based on the selected type
  const [message, setMessage] = useState('Thank you for opting-out. In future if you ever want to connect again just send "Hello".'); // State to store the entered message

  const handleAdd = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    setSnackbarOpen(true);

    // Close the dialog after a short delay
    setTimeout(() => {}, 500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const CURRENCIES = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'file', label: 'File' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
  ];

  const handleChangeCurrency = useCallback((event) => {
    const selectedType = event.target.value;
    setCurrency(selectedType);
    if (selectedType === 'file' || selectedType === 'audio' || selectedType === 'video') {
      setMessage('');}
    

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

  const handleFileUpload = () => {
    if (file) {
      setIsFileUploaded(true);
      setFile(file);
    }
  };

  return (
    <>
      <Box sx={{ mt: '24px' }}>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} width="100%">
          <Box width={isMobile ? '100%' : '60%'} pr={isMobile ? 0 : '12px'}>
            <Tooltip title="Click here to select regular message type" arrow placement="top">
              <TextField
                sx={{ mb: 3 }}
                id="select-currency-label-x"
                select
                fullWidth
                label="Select Regular Message Type"
                value={currency}
                onChange={handleChangeCurrency}
                helperText="Select one from your WhatsApp approved template messages"
              >
                {CURRENCIES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Tooltip>

            {/* Conditional rendering based on selected type */}
            {currency === 'text' && (
              <Tooltip title="Enter message here" arrow placement="top">
                <TextField
                  rows={4}
                  fullWidth
                  multiline
                  label="Enter message here."
                  value={message}
                  onChange={handleMessageChange} // Update state on text change
                />
              </Tooltip>
            )}

            {(currency === 'image' || currency === 'video') && (
              <>
                <Tooltip title="Enter caption here" arrow placement="top">
                  <TextField
                  sx={
                    {mb: 3}
                  }
                    fullWidth
                    label="Caption"
                    value={message}
                    onChange={handleMessageChange} // Update state on text change
                    helperText='You are allowed a maximum of 4096 characters.'
                  />
                </Tooltip>

                <TextField
                  sx={{ mt:0}}
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
                  sx={{ mt:3}}
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

            {(currency === 'file' || currency === 'audio') && (
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
                  sx={{ mt:3}}
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
          <Tooltip title="Regular message type preview" arrow placement="top">
            <Box
              width={isMobile ? '100%' : '40%'}
              sx={{ pl: isMobile ? 0 : '12px', mt: isMobile ? '24px' : 0 }}
            >
              <Card
                sx={{
                  border: '1px solid #919EAB33',
                  width: '100%',
                  maxWidth: '500px',
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
                <Typography
                  variant="caption"
                  sx={{
                    pr: 2,
                    pt: 3,
                    display: 'flex',
                    color: '#919EAB',
                    justifyContent: 'end',
                  }}
                >
                  4:02 PM
                </Typography>
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
                      <img src={chatBoxImage} alt="Chat Preview" style={{ width: '100%', borderRadius: '8px' }} />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: 14, fontWeight: '500', mb: chatBoxImage ? 0: 0,  }}
                  >
                    {message}
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Tooltip>
        </Box>
        <Tooltip title="Click here to save regular message type" arrow placement="top">
          <Button sx={{ mt: '24px' }} variant="contained" onClick={handleAdd}>
            Save
          </Button>
        </Tooltip>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={30000}
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
          Opt-Out Configure Message Saved Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
