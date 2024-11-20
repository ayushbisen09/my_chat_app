import { useState } from 'react';

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

import LocationPreviewTemplateChatBox from 'src/sections/preview-template/location-chatbox';

import Image1 from '../../../../../../public/assets/images/chatImage/imagechat.png';

export function LocationTemplateTypeDialog({ title, content, action, open, onClose, ...other }) {
  const handleCancel = () => {
    onClose(); // Close the dialog without making changes
  };

  const handleTemplateFormatInputChange = (event) => {
    setTemplateFormatInputText(event.target.value);
  };

  const [setBodyparametersValue] = useState('{{1}}');
  const [latitude, setLatitude] = useState(null); // To store file URL
  const [logitude, setLongitude] = useState(null); // To store file URL
  const [locationName, setLocationName] = useState(null); // To store file URL
  const [locationAddress, setLocationAddress] = useState(null); // To store file URL
  const [headerType] = useState('');

  const handleBodyParameterSampleValueChange = (e, field) => {
    setBodyparametersValue((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const handleLatitudeChange = (event) => {
    setLatitude(event.target.value);
  };
  const handleLongitudeChange = (event) => {
    setLongitude(event.target.value);
  };
  const handleLocationNameChange = (event) => {
    setLocationName(event.target.value);
  };
  const handleLocationAddressChange = (event) => {
    setLocationAddress(event.target.value);
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

            <Divider sx={{ mb: 2 }} />
            <TextField
              sx={{ mt: 0, mb: 3 }}
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              value={latitude}
              onChange={handleLatitudeChange}
              label="Latitude"
              helperText="Fill in the latitude fields to send location message"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Fill in the latitude fields to send location message"
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
            <TextField
              sx={{ mt: 0, mb: 3 }}
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              value={logitude}
              onChange={handleLongitudeChange}
              label="Longitude"
              helperText="Fill in the longitude fields to send location message"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Fill in the longitude fields to send location message"
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
            <TextField
              sx={{ mt: 0, mb: 3 }}
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              value={locationName}
              onChange={handleLocationNameChange}
              label="Location Name"
              helperText="Fill in the location name fields to send location message"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Fill in the location name fields to send location message"
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

            <TextField
              sx={{ mt: 0, mb: 3 }}
              fullWidth
              type="text"
              margin="dense"
              variant="outlined"
              value={locationAddress}
              onChange={handleLocationAddressChange}
              label="Location Address"
              helperText="Fill in the location address fields to send location message"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Fill in the location address to send location message"
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
          </Box>
          <Box sx={{ py: 2, pl: 2 }}>
            <LocationPreviewTemplateChatBox
              // uploadedFileURL={fileURL}
              displaybuttons
              coverSrc={
                headerType === 'type1'
                  ? Image1
                  : headerType === 'type2'
                    ? '../../assets/images/chatImage/video.png'
                    : '../../assets/images/chatImage/limitedtimeoffer.png'
              }
              showImage={headerType !== 'text'}
              text="Congratulations! 🎉 Your order {{1}} for the Headway {{2}} has been confirmed. 🙌"
              footer="Make sure to share Tracking ID"
              showLinks
              showCall
              showCoupon
              showVisit
            />
          </Box>
        </Box>
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
