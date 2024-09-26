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
import { ConfirmDialog } from 'src/components/custom-dialog';

import FileType from './hook/messages-type/file';
import VideoType from './hook/messages-type/video';
import AudioType from './hook/messages-type/audio';

export default function RegularMessage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const handleFileUpload = (file) => {
    if (file) {
      setIsFileUploaded(true);
    }
  };
  const onDeleteUploadedFile = () => {
    // Logic to delete the file
    setIsFileUploaded(false); // Reset the state to indicate no file is uploaded
    setUploadKey((prevKey) => prevKey + 1); // Increment the key to force a re-render
  };
  const handleRemove = (index) => {};
  const [uploadKey, setUploadKey] = useState(0); // Create a key to force re-render

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [messagetype, setmessagetype] = useState('text');

  const [file, setFile] = useState(null); // To store uploaded file
  const [chatBoxImage, setChatBoxImage] = useState(''); // State for the image based on the selected type
  const [message, setMessage] = useState(
    'Thank you for opting-out. In future if you ever want to connect again just send "Hello".'
  ); // State to store the entered message

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

  const MESSAGETYPE = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'file', label: 'File' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
  ];

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
        setChatBoxImage('');
        break;
      case 'file':
        setChatBoxImage('');
        break;
      case 'audio':
        setChatBoxImage('');
        break;
      default:
        setChatBoxImage('../../assets/images/chatImage/default.png');
    }
  }, []);

  return (
    <>
      <Box sx={{ mt: '24px' }}>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} width="100%">
          <Box width={isMobile ? '100%' : '60%'} pr={isMobile ? 0 : '12px'}>
            <Tooltip title="Click here to select regular message type" arrow placement="top">
              <TextField
                sx={{ mb: 3 }}
                id="select-messagetype-label-x"
                select
                fullWidth
                label="Select Regular Message Type"
                value={messagetype}
                onChange={handleChangemessagetype}
                helperText="Select one from your WhatsApp approved template messages"
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

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{ width: '100%' }}>
                    <FileUpload key={uploadKey} onFileUpload={handleFileUpload} />{' '}
                    {/* Reset the component */}
                  </Box>
                  <Box sx={{ pl: 2 }}>
                    <Tooltip title="Click here to remove uploaded file" arrow placement="top">
                      <Button
                        size="small"
                        sx={{ color: 'grey.600', minWidth: 'auto' }}
                        onClick={() => setConfirmDelete(true)} // Open the confirm dialog
                        disabled={!isFileUploaded} // Disable if no file is uploaded
                      >
                        <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                      </Button>
                    </Tooltip>
                  </Box>
                </Box>
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

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{ width: '100%' }}>
                    <FileUpload key={uploadKey} onFileUpload={handleFileUpload} />{' '}
                    {/* Reset the component */}
                  </Box>
                  <Box sx={{ pl: 2 }}>
                    <Tooltip title="Click here to delete attribute" arrow placement="top">
                      <Button
                        size="small"
                        sx={{ color: 'grey.600', minWidth: 'auto' }}
                        onClick={() => setConfirmDelete(true)} // Open the confirm dialog
                        disabled={!isFileUploaded} // Disable if no file is uploaded
                      >
                        <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                      </Button>
                    </Tooltip>
                  </Box>
                </Box>
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
                  avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                  title={
                    <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                      Mireya Conner
                    </Typography>
                  }
                  subheader={
                    <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                      Online
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
                  {messagetype === 'video' && (
                    <VideoType
                      videoSrc="../../../public/assets/videos/chat-videos/advertisement.mp4"
                      captionsSrc="../../assets/captions/sample.vtt"
                    />
                  )}

                  {messagetype === 'audio' && (
                    <AudioType audioSrc="../../../public/assets/audios/new-instrumental.mp3" />
                  )}

                  {messagetype === 'file' && <FileType />}

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
        </Box>
        <Tooltip title="Click here to save regular message type" arrow placement="top">
          <Button sx={{ mt: '24px', mr: 2 }} variant="contained" onClick={handleAdd}>
            Save
          </Button>
        </Tooltip>
        <Tooltip title="Click here to cancel regular message type" arrow placement="top">
          <Button sx={{ mt: '24px' }} variant="outlined">
            Cancel
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

      <ConfirmDialog
        open={confirmDelete} // Controlled by state
        onClose={() => setConfirmDelete(false)} // Close dialog
        title="Remove"
        content="Are you sure you want to remove uploaded file?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteUploadedFile(); // Call the delete function
              setConfirmDelete(false); // Close the dialog after deletion
            }}
          >
            Remove
          </Button>
        }
      />
    </>
  );
}
