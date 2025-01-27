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
  useMediaQuery,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';

import {
  optInSetVideoData,
  optInSetTemplateType,
} from 'src/redux/slices/optInMessageTemplateTypeSlice';
import {
  optOutSetVideoData,
  optOutSetTemplateType,
} from 'src/redux/slices/optOutMessageTemplateTypeSlice';
import {
  offHourSetVideoData,
  offHourSetTemplateType,
} from 'src/redux/slices/offHourMessageTemplateTypeSlice';
import {
  wellComeSetVideoData,
  wellComeSetTemplateType,
} from 'src/redux/slices/wellcomeMessageTemplateTypeSlice';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

import VideoTemplateChatBox from 'src/sections/preview-template/video-chatbox';

import video from '../../../../../../public/assets/images/chatImage/video.png';

export function VideoTemplateTypeDialog({ title, content, action, open, onClose, ...other }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [bodyFields, setBodyFields] = useState(Array(6).fill(''));

  const handleInputChange = (index, value) => {
    const updatedFields = [...bodyFields];
    updatedFields[index] = value;
    setBodyFields(updatedFields);
  };

  const replacePlaceholders = (template, fields) =>
    template.replace(/\{\{(\d+)\}\}/g, (match, number) => fields[number - 1] || match);

  const handleFileUpload = (uploadedFile) => {
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
      setIsFileUploaded(true);
    }
  };

  const chosen = useSelector((state) => state.optInMessageTemplateType.chosen);
  const wellComeChosen = useSelector((state) => state.wellComeMessageTemplateType.wellComeChosen);

  const handleSave = () => {
    if (chosen === 'optIn') {
      dispatch(optInSetTemplateType('video'));
      dispatch(
        optInSetVideoData({
          videoUrl: file, // File URL from the file upload
          bodyFields, // Body fields filled in the form
          fileName: 'Video File', // You can update this based on your form field for file name
        })
      );
    } else {
      dispatch(optOutSetTemplateType('video'));
      dispatch(
        optOutSetVideoData({
          videoUrl: file, // File URL from the file upload
          bodyFields, // Body fields filled in the form
          fileName: 'Video File', // You can update this based on your form field for file name
        })
      );
    }

    onClose(); // Close dialog
  };
  const handleSend = () => {
    if (wellComeChosen === 'wellCome') {
      dispatch(wellComeSetTemplateType('video'));
      dispatch(
        wellComeSetVideoData({
          videoUrl: file, // File URL from the file upload
          bodyFields, // Body fields filled in the form
          fileName: 'Video File', // You can update this based on your form field for file name
        })
      );
    } else {
      dispatch(offHourSetTemplateType('video'));
      dispatch(
        offHourSetVideoData({
          videoUrl: file, // File URL from the file upload
          bodyFields, // Body fields filled in the form
          fileName: 'Video File', // You can update this based on your form field for file name
        })
      );
    }

    onClose(); // Close dialog
  };

  const handleCancel = () => {
    onClose();
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
          <Typography variant="h6">Video Template Messages</Typography>
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
          <Box sx={{ pr: 2, pb: 2, width: '60%' }}>
            {bodyFields.map((fieldValue, index) => (
              <TextField
                key={index}
                sx={{ mt: '24px' }}
                placeholder={`Enter a custom field for body field ${index + 1}`}
                fullWidth
                size="medium"
                type="text"
                margin="dense"
                variant="outlined"
                label={`Body Field ${index + 1} (Eg: Ankit)`}
                helperText="This field is required. Leaving it empty may prevent message delivery."
                InputLabelProps={{ shrink: true }}
                value={fieldValue}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
            <Box sx={{ mt: 1 }}>
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
          </Box>
          <Box sx={{ py: 2, pl: 2, width: '40%' }}>
            <VideoTemplateChatBox
              coverSrc={video}
              showImage={!isFileUploaded}
              videoSrc={isFileUploaded ? file : null}
              text={
                <>
                  <span style={{ fontWeight: '600' }}>
                    {replacePlaceholders(` Hi {{1}}! 🎧🛒`, bodyFields)}
                  </span>
                  <br /> <br />
                  {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                  <br /> <br />
                  {` Order Details:`}
                  <br />
                  {replacePlaceholders(` Product: {{2}}`, bodyFields)}
                  <br />
                  {replacePlaceholders(`Quantity: {{3}}`, bodyFields)}
                  <br />
                  {replacePlaceholders(`Order ID: {{4}}`, bodyFields)}
                  <br />
                  {replacePlaceholders(`Delivery Address: {{5}}`, bodyFields)}
                  <br />
                  {replacePlaceholders(`Estimated Delivery Date: {{6}}`, bodyFields)}
                </>
              }
              showLinks
              showVisit
              showCall
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (chosen === 'optIn') {
              handleSave();
            } else {
              handleSend();
            }
          }}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
