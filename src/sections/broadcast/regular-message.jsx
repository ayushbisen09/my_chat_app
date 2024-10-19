/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Alert,
  Button,
  Tooltip,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';

import FileType from '../optIn-management/hook/messages-type/file';

export default function RegularMessage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [messageType, setMessageType] = useState('text');
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState('');
  const [chatBoxImage, setChatBoxImage] = useState('');
  const [message, setMessage] = useState(
    'Thank you for opting-out. In the future, if you ever want to connect again just send "Hello" .'
  );

  const [fileName, setFileName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

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

    // Reset file, file URL, and message when the type changes
    setFile(null);
    setFileURL('');

    const defaultImages = {
      text: '',
      image: '../../assets/images/chatImage/imagechat.png',
      video: '../../assets/images/chatImage/video.png',
      file: '../../assets/images/chatImage/document.png',
      audio: '../../assets/images/chatImage/audio.png',
    };

    setChatBoxImage(defaultImages[selectedType] || defaultImages.text);

    if (['file', 'audio', 'video'].includes(selectedType)) {
      setMessage(''); // Clear message for non-text types
    }
  }, []);
  const handleFileUpload = useCallback((uploadedFile) => {
    setFile(uploadedFile);
    const uploadedFileURL = URL.createObjectURL(uploadedFile);
    setFileURL(uploadedFileURL); // Populate the file URL
    setFileName(uploadedFile.name); // Set file name for preview
  }, []);

  const handleRemoveFile = () => {
    setFile(null); // Reset file data
    setFileURL(''); // Reset file URL
    setFileName(''); // Clear file name
  };

  const handleConfirmURLChange = (event) => {
    setFileURL(event.target.value); // Update file URL after confirmation
    setShowConfirmation(false); // Close the confirmation dialog
  };
  const handleURLChange = (event) => {
    setShowConfirmation(true); // Show confirmation dialog before changing the URL
  };

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

  const handleFileNameChange = useCallback((event) => {
    setFileName(event.target.value);
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
                  value={fileURL}
                  onChange={handleURLChange}
                  helperText={`Size < 5MB, Accepted formats: ${
                    messageType === 'image'
                      ? '.png, .jpeg'
                      : messageType === 'video'
                        ? '.mp4'
                        : messageType === 'audio'
                          ? '.mp3, .wav'
                          : '.pdf, .doc, .txt'
                  }`}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Enter header URL" arrow placement="top">
                          <Iconify
                            icon="material-symbols:info-outline"
                            style={{ width: 20, height: 20 }}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography sx={{ textAlign: 'center', fontWeight: 600, py: 3 }}>OR</Typography>

                {(messageType === 'image' ||
                  messageType === 'video' ||
                  messageType === 'file' ||
                  messageType === 'audio') && (
                  <>
                    {/* Always render the FileUpload component */}
                    <FileUpload
                      onFileUpload={handleFileUpload}
                      accept={
                        messageType === 'image'
                          ? 'image/png, image/jpeg'
                          : messageType === 'video'
                            ? 'video/mp4'
                            : messageType === 'audio'
                              ? 'audio/mpeg, audio/wav'
                              : '.pdf, .doc, .txt'
                      }
                    />

                    {file && (
                      <Box sx={{ mt: 3 }}>
                        <Button onClick={handleURLChange} variant="outlined" color="error">
                          Remove Uploaded File
                        </Button>
                      </Box>
                    )}
                  </>
                )}

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
                        <Tooltip
                          title="Enter the name of media file, visible on download"
                          arrow
                          placement="top"
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
                          <Iconify
                            icon="material-symbols:info-outline"
                            style={{ width: 20, height: 20 }}
                          />
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
                  value={fileName}
                  onChange={handleFileNameChange}
                  helperText="Display name of media file, visible on download."
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Enter the name of media file, visible on download"
                          arrow
                          placement="top"
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

          <Tooltip title="Regular message preview" arrow placement="top">
            <Box
              width={isMobile ? '100%' : '40%'}
              sx={{ pl: isMobile ? 0 : 2, mt: isMobile ? 3 : 0 }}
            >
              <Box sx={{ p: 2, backgroundColor: '#CCF4FE', borderRadius: 1 }}>
                {fileURL && messageType === 'image' && (
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={fileURL}
                      alt="Chat Preview"
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </Box>
                )}

                {fileURL && messageType === 'video' && (
                  <Box sx={{ mb: 2 }}>
                    <video controls width="100%" style={{ borderRadius: 8 }}>
                      <source src={fileURL} type="video/mp4" />
                    </video>
                  </Box>
                )}

                {fileURL && messageType === 'audio' && (
                  <Box sx={{ mb: 2 }}>
                    <audio controls style={{ width: '100%' }}>
                      <source src={fileURL} type="audio/mpeg" />
                    </audio>
                  </Box>
                )}

                {fileURL && messageType === 'file' && (
                  <Box sx={{ mb: 2 }}>
                    <FileType />
                  </Box>
                )}
                <Typography
                  variant="body2"
                  sx={{ fontSize: 14, fontWeight: 500, whiteSpace: 'pre-line' }}
                >
                  {message}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
        </Box>
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

      <ConfirmDialog
        open={showConfirmation} // Controlled by state
        onClose={() => setShowConfirmation(false)} // Close dialog
        title="Remove"
        content="Are you sure you want to remove uploaded file?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleConfirmURLChange(); // Call the delete function
              setShowConfirmation(false); // Close the dialog after deletion
            }}
          >
            Remove
          </Button>
        }
      />
    </>
  );
}
