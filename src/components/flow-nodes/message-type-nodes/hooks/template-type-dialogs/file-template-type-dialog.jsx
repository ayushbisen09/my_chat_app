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
  optInSetUploadedFile,
  optInSetTemplateType,
  optInSetFileTemplateFields,
} from 'src/redux/slices/optInMessageTemplateTypeSlice';
import {
  optOutSetUploadedFile,
  optOutSetTemplateType,
  optOutSetFileTemplateFields,
} from 'src/redux/slices/optOutMessageTemplateTypeSlice';
import {
  offHourSetTemplateType,
  offHourSetUploadedFile,
  offHourSetFileTemplateFields,
} from 'src/redux/slices/offHourMessageTemplateTypeSlice';
import {
  wellComeSetUploadedFile,
  wellComeSetTemplateType,
  wellComeSetFileTemplateFields,
} from 'src/redux/slices/wellcomeMessageTemplateTypeSlice';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';

import FilePreviewTemplateChatBox from 'src/sections/preview-template/file-chatbox';

import FileImage from '../../../../../../public/assets/images/chatImage/document.png';

export function FileTemplateTypeDialog({ title, content, action, open, onClose, ...other }) {
  const dispatch = useDispatch(); // Hook to dispatch actions
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

  const handleSave = () => {
    // Dispatch the Redux actions to store the file template data
    if (chosen === 'optIn') {
      dispatch(optInSetTemplateType('file'));

      dispatch(optInSetFileTemplateFields(bodyFields));

      dispatch(optInSetUploadedFile(file));
    } else {
      dispatch(optOutSetTemplateType('file'));

      dispatch(optOutSetFileTemplateFields(bodyFields));

      dispatch(optOutSetUploadedFile(file));
    }
    

    console.log('File:', file);
    console.log('Body Fields:', bodyFields);

    onClose(); // Close the dialog after operation
  };
  const handleSend = () => {
    // Dispatch the Redux actions to store the file template data
    
    if (wellComeChosen === 'wellCome') {
      dispatch(wellComeSetTemplateType('file'));

      dispatch(wellComeSetFileTemplateFields(bodyFields));

      dispatch(wellComeSetUploadedFile(file));
    } else {
      dispatch(offHourSetTemplateType('file'));

      dispatch(offHourSetFileTemplateFields(bodyFields));

      dispatch(offHourSetUploadedFile(file));
    }

    console.log('File:', file);
    console.log('Body Fields:', bodyFields);

    onClose(); // Close the dialog after operation
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
          <FilePreviewTemplateChatBox
            coverSrc={file || FileImage} // Show the uploaded file or default to the placeholder image
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
        <Button variant="contained" sx={{ mr: 1 }} onClick={() => {
            if (chosen === 'optIn') {
              handleSave();
            } else {
              handleSend();
            }
          }}>
          Save
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}
