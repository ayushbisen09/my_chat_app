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
  InputAdornment,
} from '@mui/material';

import {
  optInSetImageData,
  optInSetTemplateType,
} from 'src/redux/slices/optInMessageTemplateTypeSlice';
import {
  optOutSetImageData,
  optOutSetTemplateType,
} from 'src/redux/slices/optOutMessageTemplateTypeSlice';
import {
  offHourSetImageData,
  offHourSetTemplateType,
} from 'src/redux/slices/offHourMessageTemplateTypeSlice';
import {
  wellComeSetImageData,
  wellComeSetTemplateType,
} from 'src/redux/slices/wellcomeMessageTemplateTypeSlice';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

import ImagePreviewTemplateChatBox from 'src/sections/preview-template/image-chatbox';

import Image from '../../../../../../public/assets/images/chatImage/imagechat.png';

export function ImageTemplateTypeDialog({ title, content, action, open, onClose, ...other }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const [file, setFile] = useState(null); // To store uploaded file
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
      setFile(uploadedFile);
      setIsFileUploaded(true);
    }
  };

  const chosen = useSelector((state) => state.optInMessageTemplateType.chosen);
  const wellComeChosen = useSelector((state) => state.wellComeMessageTemplateType.wellComeChosen);
  // const handleSave = () => {
  //   // Check if 'chosen' is 'optIn' and 'wellComeChosen' is not 'wellCome'
  //   if (chosen === 'optIn' && wellComeChosen !== 'wellCome') {
  //     // Dispatch the optIn template and data
  //     dispatch(optInSetTemplateType('image'));
  //     dispatch(
  //       optInSetImageData({
  //         imageUrl: file ? URL.createObjectURL(file) : null,
  //         bodyFields,
  //         fileName: file ? file.name : '',
  //       })
  //     );
  //   }

  //   // Check if 'wellComeChosen' is 'wellCome' and 'chosen' is not 'optIn'
  //   else if (wellComeChosen === 'wellCome' && chosen !== 'optIn') {
  //     // Dispatch the wellCome template and data
  //     dispatch(wellComeSetTemplateType('image'));
  //     dispatch(
  //       wellComeSetImageData({
  //         imageUrl: file ? URL.createObjectURL(file) : null,
  //         bodyFields,
  //         fileName: file ? file.name : '',
  //       })
  //     );
  //   }

  //   // For the opt-out condition
  //   else if (chosen !== 'optIn') {
  //     dispatch(optOutSetTemplateType('image'));
  //     dispatch(
  //       optOutSetImageData({
  //         imageUrl: file ? URL.createObjectURL(file) : null,
  //         bodyFields,
  //         fileName: file ? file.name : '',
  //       })
  //     );
  //   }

  //   // Final condition for off-hours template
  //   else {
  //     dispatch(offHourSetTemplateType('image'));
  //     dispatch(
  //       offHourSetImageData({
  //         imageUrl: file ? URL.createObjectURL(file) : null,
  //         bodyFields,
  //         fileName: file ? file.name : '',
  //       })
  //     );
  //   }

  //   // Close the dialog
  //   onClose();
  // };

  const handleSave = () => {
    if (chosen === 'optIn') {
      dispatch(optInSetTemplateType('image')); // This sets the template type to 'image'

      dispatch(
        optInSetImageData({
          imageUrl: file ? URL.createObjectURL(file) : null, // This stores the image URL
          bodyFields,
          fileName: file ? file.name : '', // This stores the file name
        })
      );
    } else {
      dispatch(optOutSetTemplateType('image')); // This sets the template type to 'image'

      dispatch(
        optOutSetImageData({
          imageUrl: file ? URL.createObjectURL(file) : null, // This stores the image URL
          bodyFields,
          fileName: file ? file.name : '', // This stores the file name
        })
      );
    }

    onClose(); // Close the dialog
  };

  const handleSend = () => {
    if (wellComeChosen === 'wellCome') {
      dispatch(wellComeSetTemplateType('image')); // This sets the template type to 'image'

      dispatch(
        wellComeSetImageData({
          imageUrl: file ? URL.createObjectURL(file) : null, // This stores the image URL
          bodyFields,
          fileName: file ? file.name : '', // This stores the file name
        })
      );
    } else {
      dispatch(offHourSetTemplateType('image')); // This sets the template type to 'image'

      dispatch(
        offHourSetImageData({
          imageUrl: file ? URL.createObjectURL(file) : null, // This stores the image URL
          bodyFields,
          fileName: file ? file.name : '', // This stores the file name
        })
      );
    }

    onClose(); // Close the dialog
  };

  const handleCancel = () => {
    onClose(); // Close the dialog without making changes
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
          <Typography variant="h6">Template Messages</Typography>
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
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ px: 2, pb: 2, width: '60%' }}>
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
          <Box sx={{ mt: 0.5 }}>
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
        <Box sx={{ p: 2, width: '40%' }}>
          <ImagePreviewTemplateChatBox
            coverSrc={isFileUploaded ? URL.createObjectURL(file) : Image}
            showImage
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
      <Box sx={{ px: 2, pb: 2 }}>
        {/* <Button variant="contained" sx={{ mr: 1 }} onClick={handleSave}>
          Save
        </Button> */}
        <Button
          variant="contained"
          sx={{ mr: 1 }}
          onClick={() => {
            if (chosen === 'optIn') {
              handleSave();
            } else {
              handleSend();
            }
          }}
        >
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}
