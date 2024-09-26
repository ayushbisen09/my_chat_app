import React, { useState } from 'react';

import {
  Box,
  Card,
  Stack,
  Button,
  Select,
  Tooltip,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { FileUpload } from 'src/components/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';
// const [uploadedFile, setUploadedFile] = useState(null); // State to track uploaded file

const RenderMediaButtonNode = ({
  card,
  index,
  addTextField,
  deleteTextField,
  deleteCard,
  handleHoverCardClick,
  selectedFlow,
  handleFlowChange,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null); // State to track uploaded file
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const handleFileUpload = (file) => {
    if (file) {
      setUploadedFile(file); // Set the uploaded file
      setIsFileUploaded(true); // Set file upload state to true
    }
  };
  const onDeleteUploadedFile = () => {
    // Logic to delete the file
    setUploadedFile(null); // Reset the uploadedFile state
    setIsFileUploaded(false); // Reset the state to indicate no file is uploaded
    setUploadKey((prevKey) => prevKey + 1); // Increment the key to force a re-render
  };
  const [uploadKey, setUploadKey] = useState(0); // Create a key to force re-render

  return (
    <>
      <Card
        key={card.id}
        sx={{
          position: 'relative',
          boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
          px: 1.5,
          pt: 3.5,
          pb: 2.5,
          mb: 3,
          borderRadius: '12px',
          border: '1px solid transparent',
          overflow: 'visible',
          '&:hover': {
            border: '1px solid #919EAb',
            borderRadius: '12px',
          },
          '&:hover .hoverCard': {
            opacity: 1,
          },
        }}
      >
        <Stack spacing={2}>
          <FormControl fullWidth size="large" sx={{ mb: 1 }}>
            <InputLabel id="condition-select-label">Select Media Type</InputLabel>
            <Select
              labelId="condition-select-label"
              id="condition-select"
              value={selectedFlow}
              label="Select Media Type"
              onChange={handleFlowChange}
            >
              <MenuItem value="image">Image</MenuItem>
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="audio">Audio</MenuItem>
              <MenuItem value="file">File</MenuItem>
            </Select>
            <FormHelperText>Select media type you want.</FormHelperText>
          </FormControl>
          <TextField
            label="Enter or Paste URL"
            helperText="Enter media URL"
            variant="outlined"
            fullWidth
          />
          <FileUpload key={uploadKey} onFileUpload={handleFileUpload} />
          {/* Conditionally render the Remove button */}
          {uploadedFile && (
            <Button
              variant="outlined"
              color="error"
              size="medium"
              onClick={() => setConfirmDelete(true)} // Open the confirm dialog
              // disabled={!isFileUploaded} // Disable if no file is uploaded
            >
              Remove uploaded file
            </Button>
          )}
          <TextField
            label="Enter Caption"
            helperText="You can add caption."
            variant="outlined"
            fullWidth
          />
          {card.textFields.map((field) => (
            <Stack key={field.id} spacing={3}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TextField label="Enter Button Text" variant="outlined" fullWidth />
                <IconButton onClick={() => deleteTextField(card.id, field.id)}>
                  <Iconify width={20} icon="solar:trash-bin-trash-bold" />
                </IconButton>
                <IconButton>
                  <Iconify width={24} icon="octicon:dot-16" sx={{ color: '#078DEE' }} />
                </IconButton>
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mt: -2, px: 1.4, fontSize: '12px' }}
              >
                Enter button text. 20 letters allowed
              </Typography>
            </Stack>
          ))}
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            onClick={() => addTextField(card.id)}
            fullWidth
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add Button
          </Button>
        </Stack>
        {/* Hover Card */}
        <Box
          className="hoverCard"
          sx={{
            position: 'absolute',
            top: 30,
            right: -47,
            width: '50px',
            height: 30 + (index === 0 ? 3 : 4) * 30,
            backgroundColor: 'background.paper',
            border: '1px solid #ddd',
            borderRadius: '12px',
            opacity: 0,
            transition: 'opacity 0.1s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 10,
            p: 1,
          }}
        >
          <Tooltip title="Add" arrow placement="right">
            <IconButton onClick={() => handleHoverCardClick(card.id)}>
              <Iconify width={20} icon="eva:plus-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow placement="right">
            <IconButton>
              <Iconify width={20} icon="eva:eye-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>
          {index > 0 && (
            <Tooltip title="Delete Content" arrow placement="right">
              <IconButton onClick={() => deleteCard(card.id)}>
                <Iconify
                  width={20}
                  icon="solar:trash-bin-trash-bold"
                  sx={{ color: 'text.secondary' }}
                />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Card>
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
};

export default RenderMediaButtonNode;
