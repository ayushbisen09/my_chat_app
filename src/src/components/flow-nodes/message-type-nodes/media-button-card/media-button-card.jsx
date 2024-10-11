/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

import { setFile, clearFile,addButton,setCaption , selectFileUrl, updateButtonText, selectUploadedFile } from 'src/redux/slices/mediaButtonNodeSlice';

import { Iconify } from 'src/components/iconify';
import { FileUpload } from 'src/components/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { MediaButtonNodeMessagePreview } from './hook/media-button-node-message-preview';

const RenderMediaButtonNode = ({
  card,
  addTextField,
  deleteTextField,
  selectedFlow,
  handleFlowChange,
}) => {

  const dispatch = useDispatch();
  const uploadedFile = useSelector(selectUploadedFile);
  const fileUrl = useSelector(selectFileUrl);
  const buttons = useSelector((state) => state.mediaButtonNode.buttons);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmUrlEdit, setConfirmUrlEdit] = useState(false);
  const [url, setUrl] = useState('');
  const [uploadKey, setUploadKey] = useState(0);
  const [showMediaButtonNodeMessagePreview, setShowMediaButtonNodeMessagePreview] = useState(false);

  const handleFileUpload = (file) => {
    if (file) {
      const fileType = file.type.startsWith('image')
        ? 'image'
        : file.type.startsWith('video')
        ? 'video'
        : file.type.startsWith('audio')
        ? 'audio'
        : 'file';

      const fileURL = URL.createObjectURL(file);
      dispatch(setFile({ file, url: fileURL, fileType }));
    }
  };
  const onDeleteUploadedFile = () => {
    dispatch(clearFile());
    setUrl('');
    setUploadKey((prevKey) => prevKey + 1);
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    if (uploadedFile) {
      setConfirmUrlEdit(true);
    } else {
      setUrl(newUrl);
    }
  };

  const confirmUrlEditAction = () => {
    onDeleteUploadedFile();
    setConfirmUrlEdit(false);
  };

  const handleCaptionChange = (e) => {
    dispatch(setCaption(e.target.value));
  };

  const renderPreview = () => {
    if (!uploadedFile) return null;

    switch (selectedFlow) {
      case 'image':
        return <img src={fileUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />;
      case 'video':
        return <video src={fileUrl} controls style={{ maxWidth: '100%',borderRadius: '8px' }} />;
      case 'audio':
        return <audio src={fileUrl} controls />;
      case 'file':
        return (
          <Box>
            <Typography>File Name: {uploadedFile.name}</Typography>
            <Typography>Size: {(uploadedFile.size / 1024).toFixed(2)} KB</Typography>
            <Typography>Type: {uploadedFile.type}</Typography>
          </Box>
        );
      default:
        return null;
    }
  };


  const { id, textFields } = card;

  const handleAddButton = () => {
    if (textFields.length < 3) {
      const newButtonId = Date.now().toString();
      dispatch(addButton({ id: newButtonId, text: '' }));
      addTextField(id, newButtonId);
    }
  };


  return (
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
        '&:hover .hoverIcons': {
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
          value={url}
          onChange={handleUrlChange}
        />

        <FileUpload
          key={uploadKey}
          onFileUpload={handleFileUpload}
          accept={
            selectedFlow === 'image'
              ? 'image/*'
              : selectedFlow === 'video'
                ? 'video/*'
                : selectedFlow === 'audio'
                  ? 'audio/*'
                  : '*'
          }
        />

        {renderPreview()}

        {uploadedFile && (
          <Button
            variant="outlined"
            color="error"
            size="medium"
            onClick={() => setConfirmDelete(true)}
          >
            Remove uploaded file
          </Button>
        )}

        <TextField
          label="Enter Caption"
          helperText="You can add caption."
          variant="outlined"
          fullWidth
          onChange={handleCaptionChange}
        />

        {card.textFields.map((field) => (
          <Stack key={field.id} spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                  label="Enter Button Text"
                  variant="outlined"
                  fullWidth
                  // Ensure that no default text is set by checking the button object and its text property
                  value={buttons.find((b) => b.id === field.id)?.text || ''}
                  onChange={(e) =>
                    dispatch(updateButtonText({ id: field.id, text: e.target.value }))
                  }
                />
              <IconButton onClick={() => deleteTextField(card.id, field.id)}>
                <Iconify width={20} icon="solar:trash-bin-trash-bold" />
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
            onClick={handleAddButton}
            fullWidth
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
            disabled={textFields.length >= 3}
          >
            Add Button
          </Button>
      </Stack>

      {/* Hover Icons */}
      <Box
        className="hoverIcons"
        sx={{
          position: 'absolute',
          top: 30,
          right: -51,
          width: '50px',
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
         <Tooltip title="Add">
            <IconButton>
              <Iconify width={24} icon="eva:plus-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Preview">
            <IconButton
              onClick={() => {
                console.log('clicked');
                setShowMediaButtonNodeMessagePreview(true);
              }}
            >
              <Iconify width={20} icon="eva:eye-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>
          <MediaButtonNodeMessagePreview
            showMediaButtonNodeMessagePreview={showMediaButtonNodeMessagePreview}
            setShowMediaButtonNodeMessagePreview={setShowMediaButtonNodeMessagePreview}
          />
      </Box>

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Remove"
        content="Are you sure you want to remove uploaded file?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteUploadedFile();
              setConfirmDelete(false);
            }}
          >
            Remove
          </Button>
        }
      />

      <ConfirmDialog
        open={confirmUrlEdit}
        onClose={() => setConfirmUrlEdit(false)}
        title="Edit URL"
        content="Changing the URL will remove the uploaded file. Do you want to continue?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirmUrlEditAction();
              setUrl('');
            }}
          >
            Confirm
          </Button>
        }
      />
    </Card>
  );
};

export default RenderMediaButtonNode;
