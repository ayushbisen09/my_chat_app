import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Divider, TextField, Typography, useMediaQuery } from '@mui/material';

import {
  optInSetTemplateType,
  optInSetTemplateFields,
} from 'src/redux/slices/optInMessageTemplateTypeSlice';
import {
  optOutSetTemplateType,
  optOutSetTemplateFields,
} from 'src/redux/slices/optOutMessageTemplateTypeSlice';
import {
  offHourSetTemplateType,
  offHourSetTemplateFields,
} from 'src/redux/slices/offHourMessageTemplateTypeSlice';
import {
  wellComeSetTemplateType,
  wellComeSetTemplateFields,
} from 'src/redux/slices/wellcomeMessageTemplateTypeSlice';

import { Iconify } from 'src/components/iconify';

import PreviewTemplateChatBox from 'src/sections/preview-template/chat-box';

export function TextTemplateTypeDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  const [bodyFields, setBodyFields] = useState(Array(6).fill(''));

  const handleInputChange = (index, value) => {
    const updatedFields = [...bodyFields];
    updatedFields[index] = value;
    setBodyFields(updatedFields);
  };

  const replacePlaceholders = (template, fields) =>
    template.replace(/\{\{(\d+)\}\}/g, (match, number) => fields[number - 1] || match);

  const dispatch = useDispatch(); // Initialize the Redux dispatch
  const chosen = useSelector((state) => state.optInMessageTemplateType.chosen);
  const wellComeChosen = useSelector((state) => state.wellComeMessageTemplateType.wellComeChosen);

  const handleSave = () => {
    if (chosen === 'optIn') {
      dispatch(optInSetTemplateType('text')); // Dispatch the fields to Redux
      dispatch(optInSetTemplateFields(bodyFields)); // Dispatch the fields to Redux
    } else {
      dispatch(optOutSetTemplateType('text')); // Dispatch the fields to Redux
      dispatch(optOutSetTemplateFields(bodyFields)); // Dispatch the fields to Redux
    }

    onClose(); // Close the dialog after saving
  };
  const handleSend = () => {
    if (wellComeChosen === 'wellCome') {
      dispatch(wellComeSetTemplateType('text')); // Set the type as text for wellComeMessage
      dispatch(wellComeSetTemplateFields(bodyFields)); // Save the body fields for wellComeMessage
    } else {
      dispatch(offHourSetTemplateType('text')); // Set type for offHour message
      dispatch(offHourSetTemplateFields(bodyFields)); // Save body fields for offHour
    }
    onClose(); // Close the dialog after saving
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            onClick={onClose}
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
              InputLabelProps={{
                shrink: true,
              }}
              value={fieldValue}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </Box>
        <Box sx={{ p: 2, width: '40%' }}>
          <PreviewTemplateChatBox
            coverSrc="/assets/images/templateImage/template-image1.jpg"
            text={
              <>
                <span style={{ fontWeight: '600' }}>
                  {replacePlaceholders(` Hi {{1}}! 🎧🛒`, bodyFields)}
                </span>
                <br /> <br />
                {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
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
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}
