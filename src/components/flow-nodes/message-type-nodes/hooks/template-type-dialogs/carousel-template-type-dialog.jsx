import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Button,
  Divider,
  Tooltip,
  TextField,
  Typography,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import { setTemplateFormatInputText } from 'src/redux/slices/carouselslice';

import { Iconify } from 'src/components/iconify';
import { FileUpload } from 'src/components/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { CarouselAlign } from 'src/sections/templates/hook/carousel-align';

export function CarouselTemplateTypeDialog({ title, content, action, open, onClose, ...other }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [fieldValue, setFieldValue] = useState('{{1}}');
  const [bodyparameters, setBodyparametersValue] = useState('{{1}}');

  const [sampleValues, setSampleValues] = useState({});
  const templateFormatInputText = useSelector((state) => state.template.templateFormatInputText);
  const [showConfirmation, setShowConfirmation] = useState(false); // To show confirmation dialog
  const [editingURL, setEditingURL] = useState(false); // To track if the user is editing the URL

  const handleCancel = () => onClose();

  const handleTemplateFormatInputChange = (event) => {
    dispatch(setTemplateFormatInputText(event.target.value));
  };

  const handleSampleValueChange = (e, field) => {
    setSampleValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleBodyParameterSampleValueChange = (e, field) => {
    setBodyparametersValue((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFieldChange = (event) => {
    setFieldValue(event.target.value);
  };
  const [file, setFile] = useState(null); // To store uploaded file

  const [fileURL, setFileURL] = useState(null); // To store file URL

  const handleFileUpload = (uploadedFile) => {
    if (uploadedFile) {
      setFile(uploadedFile);
      setFileURL(URL.createObjectURL(uploadedFile)); // Generate a URL for the uploaded file
    }
  };
  const handleRemoveFile = () => {
    setFile(null);
    setFileURL('');
  };

  const handleURLChange = (event) => {
    if (editingURL) {
      setShowConfirmation(true); // Show confirmation when editing starts
    } else {
      setFileURL(event.target.value);
    }
  };

  const confirmEditURL = () => {
    setShowConfirmation(false);
    setEditingURL(false);
  };

  const cancelEditURL = () => {
    setShowConfirmation(false);
    setEditingURL(false);
  };
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmUrlEdit, setConfirmUrlEdit] = useState(false);




  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      {...other}
      PaperProps={{
        style: { width: '1000px', maxWidth: '100%' },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: '700',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6">Carousel Template Messages</Typography>
          <Iconify
            onClick={handleCancel}
            icon="uil:times"
            sx={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </Box>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          Click-tracking-enabled templates will not be shown in this list.
        </Typography>
      </DialogTitle>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <DialogContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ pr: 2, py: 2, width: '60%' }}>
            <Box mb={1}>
              <Typography fontSize={16} fontWeight={600}>
                Body Parameters
              </Typography>
            </Box>

            <Box mb={2}>
              {[...Array(2)].map((_, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={bodyparameters}
                    onChange={(e) => handleBodyParameterSampleValueChange(e, 'sample')}
                    helperText="Specify the parameter to be replaced. These values can be changed at the time of sending."
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Specify the parameter to be replaced."
                            arrow
                            placement="top"
                          >
                            <Iconify
                              icon="material-symbols:info-outline"
                              sx={{ width: 20, height: 20 }}
                            />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    helperText="Enter a sample value for this parameter."
                    onChange={handleTemplateFormatInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter sample value for this field parameter."
                            arrow
                            placement="top"
                          >
                            <Iconify
                              icon="material-symbols:info-outline"
                              sx={{ width: 20, height: 20 }}
                            />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Divider />

            <Box mt={2} mb={1}>
              <Typography fontSize={16} fontWeight={600}>
                Card Parameters
              </Typography>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  value={fieldValue}
                  onChange={(e) => handleSampleValueChange(e, 'sample')}
                  helperText="Specify the parameter to be replaced. These values can be changed at the time of sending."
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Specify the parameter to be replaced."
                          arrow
                          placement="top"
                        >
                          <Iconify
                            icon="material-symbols:info-outline"
                            sx={{ width: 20, height: 20 }}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  helperText="Enter a sample value for this parameter."
                  onChange={(e) => handleSampleValueChange(e, 'sample')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip
                          title="Enter sample value for this field parameter."
                          arrow
                          placement="top"
                        >
                          <Iconify
                            icon="material-symbols:info-outline"
                            sx={{ width: 20, height: 20 }}
                          />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ mt: 0.5 }}>
              <TextField
                sx={{ mt: 0 }}
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                value={fileURL}
                onChange={handleURLChange}
                label="Header File URL"
                helperText="Size < 5MB, Accepted formats : .png or .jpeg"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title="Enter header url"
                        arrow
                        placement="top"
                        sx={{ fontSize: '16px' }}
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

              {file && (
                <Button variant="outlined" color="error" onClick={() => setConfirmDelete(true)}>
                  Remove Uploaded File
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ py: 2, pl: 2 }}>
            <CarouselAlign displayCardControls={false} uploadedFileURL={fileURL} />
          </Box>
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
                handleRemoveFile();
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
              
            >
              Confirm
            </Button>
          }
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" variant="contained">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
