/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/media-has-caption */
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
  Alert,
  Divider,
  Tooltip,
  Snackbar,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';

import FileType from 'src/sections/optIn-management/hook/messages-type/file';

// ----------------------------------------------------------------------
export function QuickRepliesDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
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
      setMessage('');
    }
  }, []);
  const handleFileUpload = useCallback((uploadedFile) => {
    setFile(uploadedFile);
    const uploadedFileURL = URL.createObjectURL(uploadedFile);
    setFileURL(uploadedFileURL); 
    setFileName(uploadedFile.name); 
  }, []);
  const handleRemoveFile = () => {
    setFile(null); 
    setFileURL(''); 
    setFileName(''); 
  };
  const handleConfirmURLChange = (event) => {
    setFileURL(event.target.value); 
    setShowConfirmation(false); 
  };
  const handleURLChange = (event) => {
    setShowConfirmation(true); 
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
          Quick Replies{' '}
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column',  }}>
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
              <Tooltip title="Click here to select message type" arrow placement="top">
                <TextField
                  sx={{ mb: 3 }}
                  select
                  fullWidth
                  label="Select Message Type"
                  value={messageType}
                  onChange={handleChangeMessageType}
                  helperText="Select one fo the message types to proceed"
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
                    sx={{ mb: 2 }}
                    onChange={handleMessageChange}
                    helperText="Use text formatting - *bold* & _italic_ Text can be upto 4096 characters long
Personalize messages with - $FirstName, $Name, $MobileNumber, $LastName & custom attributes.
Customize messages with dynamic parameters e.g. - Your verification code is {{1}}."
                  />
                </Tooltip>
              )}

              {(messageType === 'image' || messageType === 'video') && (
                <>
                  <Tooltip title="Enter caption" arrow placement="top">
                    <TextField
                      sx={{ mb: 3 }}
                      fullWidth
                      label="Enter message here."
                      value={message}
                      onChange={handleMessageChange}
                      helperText="Use text formatting - *bold* & _italic_ Text can be upto 4096 characters long
                      Personalize messages with - $FirstName, $Name, $MobileNumber, $LastName & custom attributes.
                      Customize messages with dynamic parameters e.g. - Your verification code is{{1}}."
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
                    sx={{ mt: 3 ,mb:2 }}
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
                    sx={{ mb: 3, mt:0 }}
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
                    sx={{ mt: 3 , mb:2 }}
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
          </Box>

          <Box>
            <Divider />
            <Tooltip title="Quick replies preview" arrow placement="top">
              <Box sx={{ p: 2, backgroundColor: '#CCF4FE', borderRadius: 1, mt: 2 }}>
                {messageType === 'image' && !fileURL && (
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={chatBoxImage || '../../assets/images/chatImage/imagechat.png'}
                      alt="Image Preview"
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </Box>
                )}
                {fileURL && messageType === 'image' && (
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={fileURL}
                      alt="Image Preview"
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </Box>
                )}
                {messageType === 'video' && !fileURL && (
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={chatBoxImage || '../../assets/images/chatImage/video.png'}
                      alt="Video Preview"
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

                {messageType === 'audio' && !fileURL && (
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={chatBoxImage || '../../assets/images/chatImage/audio.png'}
                      alt="Audio Preview"
                      style={{ width: '100%', borderRadius: 8 }}
                    />
                  </Box>
                )}
                {fileURL && messageType === 'audio' && (
                  <Box sx={{ mb: 2 }}>
                    <audio controls style={{ width: '100%' }}>
                      <source src={fileURL} type="audio/mpeg" />
                    </audio>
                  </Box>
                )}

                {messageType === 'file' && !fileURL && (
                  <Box sx={{ mb: 2 }}>
                    <img
                      src={chatBoxImage || '../../assets/images/chatImage/document.png'}
                      alt="File Preview"
                      style={{ width: '100%', borderRadius: 8 }}
                    />
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
            </Tooltip>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
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
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Remove"
        content="Are you sure you want to remove uploaded file?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setFile(null);
              setFileURL('');
              setFileName('');
              setShowConfirmation(false);
            }}
          >
            Remove
          </Button>
        }
      />
    </>
  );
}
