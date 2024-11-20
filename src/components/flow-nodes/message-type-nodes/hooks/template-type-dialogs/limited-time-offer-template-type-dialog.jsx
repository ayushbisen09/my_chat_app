import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  Box,
  Button,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  DialogActions,
  DialogContent,
  InputAdornment,
  FormHelperText,
} from '@mui/material';

import { timezone } from 'src/assets/data/timezone';
import { setTemplateFormatInputText } from 'src/redux/slices/carouselslice';

import { Iconify } from 'src/components/iconify';
import { FileUpload } from 'src/components/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';

import LimitedTimeOfferTemplatePreview from 'src/sections/templates/components/chatbox/limited-time-offer-template';

import Image1 from '../../../../../../public/assets/images/chatImage/imagechat.png';

export function LimitedTiemOfferTemplateTypeDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleCancel = () => {
    onClose(); // Close the dialog without making changes
  };

  const templateFormatInputText = useSelector((state) => state.template.templateFormatInputText);
  const handleTemplateFormatInputChange = (event) => {
    dispatch(setTemplateFormatInputText(event.target.value));
  };

  const [setBodyparametersValue] = useState('{{1}}');
  const handleBodyParameterSampleValueChange = (e, field) => {
    setBodyparametersValue((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const [headerType] = useState('');
  const [templateText] = useState('');
  const [value, setValue] = useState(dayjs(new Date()));
  const [timeZone, setTimeZone] = useState('(GMT-05:00) Eastern Time (US & Canada)');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const [fileURL, setFileURL] = useState(null); // To store file URL
  const [file, setFile] = useState(null); // To store uploaded file
  const [editingURL] = useState(false); // To track if the user is editing the URL
  const [setShowConfirmation] = useState(false); // To show confirmation dialog
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmUrlEdit, setConfirmUrlEdit] = useState(false);

  const handleTimeZoneChange = (event) => {
    setTimeZone(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredTimeZones = timezone.filter(
    (
      tz // Changed 'timeZone' to 'timezones'
    ) => tz.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleURLChange = (event) => {
    if (editingURL) {
      setShowConfirmation(true); // Show confirmation when editing starts
    } else {
      setFileURL(event.target.value);
    }
  };

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

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      {...other}
      PaperProps={{
        style: {
          width: '1000px',
          maxWidth: '100%',
        },
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
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6">Image Template Messages</Typography>
          <Iconify
            onClick={handleCancel}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </div>
        <Typography variant="subtitle1" color="text.secondary" fontWeight="regular" sx={{ mt: 1 }}>
          Click-tracking-enabled templates will not be shown in this list
        </Typography>
      </DialogTitle>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <DialogContent>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Box mb={1} mt={2}>
              <Typography fontSize={16} fontWeight={600}>
                Body Parameters
              </Typography>
            </Box>

            <Box mb={2}>
              {[...Array(3)].map((_, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={`{{${index + 1}}}`}
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
                Limited Time Offer Parameters
              </Typography>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="DateTimePicker"
                value={value}
                onChange={setValue}
                slotProps={{ textField: { fullWidth: true } }}
                sx={{ mt: 2 }}
              />
              <FormHelperText sx={{ ml: 2 }}>
                Select the expiration date for this offer
              </FormHelperText>
            </LocalizationProvider>

            <Box mt={3}>
              <Typography fontSize={16} fontWeight={600} sx={{ mb: 2 }}>
                Select Time Zone
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="time-zone-select-label">Time Zone</InputLabel>

                <Select
                  labelId="time-zone-select-label"
                  id="time-zone-select"
                  value={timeZone}
                  label="Time Zone"
                  onChange={handleTimeZoneChange}
                  IconComponent={() => (
                    <Iconify width={24} icon="iconamoon:arrow-down-2-bold" sx={{ mr: 1 }} />
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        width: 250,
                        height: 450,
                      },
                    },
                    MenuListProps: {
                      style: { padding: 0 },
                      maxheight: 250,
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      // position: 'Sticky',
                      top: 0,
                      // bgcolor: 'background.paper',
                      zIndex: 5,
                    }}
                  >
                    <TextField
                      fullWidth
                      size="large"
                      placeholder="Search time zone..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      inputRef={searchInputRef}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" width={24} height={24} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  {filteredTimeZones.map((tz) => (
                    <MenuItem key={tz} value={tz}>
                      {tz}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Select the time zone that matches your current location
                </FormHelperText>
              </FormControl>
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
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setConfirmDelete(true)}
                  sx={{ mt: 2 }}
                >
                  Remove Uploaded File
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ py: 2, pl: 2 }}>
            <LimitedTimeOfferTemplatePreview
              uploadedFileURL={fileURL}
              displaybuttons
              coverSrc={
                headerType === 'type1'
                  ? Image1
                  : headerType === 'type2'
                    ? '../../assets/images/chatImage/video.png'
                    : '../../assets/images/chatImage/limitedtimeoffer.png'
              }
              showImage={headerType !== 'text'}
              text={templateText} // Use the state here
              showLinks
            />
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
            <Button variant="contained" color="error">
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
