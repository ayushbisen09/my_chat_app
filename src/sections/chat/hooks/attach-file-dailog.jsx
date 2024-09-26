import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import React, { useRef, useState, useCallback } from 'react';

import {
  Box,
  Alert,
  Button,
  Dialog,
  Divider,
  Tooltip,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  useMediaQuery,
  FormControlLabel,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';

export function AttachFileDialog({ open, onFileAttached, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileType, setFileType] = useState('text');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileUploadRef = useRef(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [tempUrl, setTempUrl] = useState('');

  const handleAdd = () => {
    setSnackbarOpen(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChangeContactList = useCallback((event) => {
    setFileType(event.target.value);
    setIsFileUploaded(false);
    setPreviewUrl('');
    setSelectedFile(null);
    if (fileUploadRef.current) {
      fileUploadRef.current.resetFile();
    }
  }, []);

  const CONTACTLISTS = [
    { value: 'text', label: 'Text File' },
    { value: 'audio', label: 'Audio File' },
    { value: 'image', label: 'Image File' },
    { value: 'video', label: 'Video File' },
    { value: 'doc', label: 'Document File (pdf, word, doc)' },
  ];

  const handleFileUpload = (file) => {
    if (file) {
      setIsFileUploaded(true);
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    if (isFileUploaded && newUrl !== previewUrl) {
      setTempUrl(newUrl);
      setShowConfirmDialog(true);
    } else {
      setPreviewUrl(newUrl);
    }
  };

  const handleConfirmRemove = () => {
    setIsFileUploaded(false);
    setSelectedFile(null);
    setPreviewUrl('');
    setTempUrl('');
    setShowConfirmDialog(false);
    if (fileUploadRef.current) {
      fileUploadRef.current.resetFile();
    }
  };

  const handleCancelRemove = () => {
    setShowConfirmDialog(false);
    setTempUrl('');
  };

  const getAcceptedFileTypes = () => {
    switch (fileType) {
      case 'text':
        return '.txt';
      case 'image':
        return 'image/*';
      case 'video':
        return 'video/*';
      case 'doc':
        return '.pdf,.doc,.docx,.csv';
      case 'audio':
        return '.mp3, .mp4';
       
      default:
        return '';
    }
  };

  const handleSendMessage = () => {
    if (isFileUploaded) {
      console.log('Message sent with file:', selectedFile);
      onFileAttached(selectedFile);
      handleAdd(); // Close the dialog after attaching the file
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        {...other}
        PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
      >
        <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
          Attach File
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </DialogTitle>
        <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Tooltip title="Select file type from here." arrow placement="top">
            <TextField
              sx={{ width: '100%', mt: 1 }}
              variant="outlined"
              select
              fullWidth
              label="Select File Type (Required)"
              value={fileType}
              onChange={handleChangeContactList}
              helperText="Choose file type."
            >
              {CONTACTLISTS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Tooltip>
          <Box>
            <TextField
              sx={{ width: '100%' }}
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              label="Enter URL or choose file."
              value={previewUrl}
              onChange={handleUrlChange}
              helperText={
                <span>
                  Choose file or enter the file URL.{' '}
                  <Link href="#" style={{ color: '#078DEE' }} underline="always">
                    Learn more
                  </Link>
                </span>
              }
            />

            <Typography sx={{ fontWeight: '600', width: '100%', mb: 3, mt: 3 }}>OR</Typography>

            <Tooltip title="Click here to upload file." arrow placement="top">
              <FormControlLabel
                control={
                  <FileUpload
                    ref={fileUploadRef}
                    onFileUpload={handleFileUpload}
                    accept={getAcceptedFileTypes()}
                    selectedFile={selectedFile}
                  />
                }
                sx={{ width: '100%' }}
              />
            </Tooltip>
          </Box>

          {isFileUploaded && previewUrl && (
            <Box sx={{ mt: 2, borderRadius: 2 }}>
              {fileType === 'image' && (
                <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%' }} />
              )}
              {fileType === 'audio' && (
                <audio src={previewUrl} controls style={{ width: '100%' }}>
                  <track kind="captions" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {fileType === 'video' && (
                <video controls style={{ maxWidth: '100%' }}>
                  <source src={previewUrl} type="video/mp4" />
                  <track kind="captions" srcLang="en" label="English captions" />
                  Your browser does not support the video tag.
                </video>
              )}
              {['text', 'doc'].includes(fileType) && (
                <iframe src={previewUrl} title="File Preview" width="100%" height="400px" />
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
            endIcon={<Iconify icon="akar-icons:attach" style={{ width: 18, height: 18 }} />}
            disabled={!isFileUploaded}
          >
            Attach
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation dialog for file removal */}
      <ConfirmDialog
        open={showConfirmDialog}
        onClose={handleCancelRemove}
        title="Remove"
        content="Are you sure you want to remove this file?"
        action={
          <Button variant="contained" color="error" onClick={handleConfirmRemove}>
            Remove
          </Button>
        }
      />

      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message="File attached successfully"
      /> */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
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
          File Uploaded Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
