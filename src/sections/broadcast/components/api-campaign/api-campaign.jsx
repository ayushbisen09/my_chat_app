import { useTheme } from '@emotion/react';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function ApiCampaign() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [apiEndpoint, setApiEndpoint] = useState('');

  const handleApiEndpointChange = (event) => {
    setApiEndpoint(event.target.value);
  };

  const [templateType, setTemplateType] = useState('text');

  const [chatBoxImage, setChatBoxImage] = useState('');
  const [message, setMessage] = useState(
    'Thank you for opting-out. In the future, if you ever want to connect again just send "Hello".'
  );

  const [template, setTemplate] = useState('broadcastCampaign'); // Set default value here

  const handleChangeTemplate = useCallback((event) => {
    setTemplate(event.target.value);
  }, []);

  const handleChangeMessageType = useCallback((event) => {
    const selectedType = event.target.value;
    setTemplateType(selectedType);

    const defaultImages = {
      text: '',
      image: '../../assets/images/chatImage/imagechat.png',
      video: '../../assets/images/chatImage/video.png',
      file: '../../assets/images/chatImage/document.png',
      audio: '../../assets/images/chatImage/audio.png',
    };

    setChatBoxImage(defaultImages[selectedType] || defaultImages.text);
    if (['file', 'audio', 'video'].includes(selectedType)) {
      setMessage('');
    }
  }, []);

  const MESSAGETYPES = [
    { value: 'text', label: 'The Daily Pulse: Your Instant Communication Hub [Text]' },
    { value: 'image', label: 'The Spotlight Broadcast: Highlighting What’s Important [Image]' },
    { value: 'file', label: 'QuickCast Updates: Stay Informed in Seconds [File]' },
    { value: 'video', label: 'Message Blast: Delivering Information at Lightning Speed [Video]' },
    { value: 'audio', label: 'Echo Alert: Amplifying Messages for Maximum Reach [Audio]' },
  ];

  return (
    <>
      <TextField
      sx={{ mb: 3 }}
        fullWidth
        label=" Enter Campaign Name"
        placeholder="Enter Campaign Name"
        value={apiEndpoint}
        onChange={handleApiEndpointChange}
        helperText="Pick something that describes your audience & goals."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                title="Pick something that describes your audience & goals."
                arrow
                placement="top"
                sx={{ fontSize: '16px' }}
              >
                <Iconify icon="material-symbols:info-outline" style={{ width: 20, height: 20 }} />
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />

      
        <TextField
          sx={{ mb: 3 }}
          select
          fullWidth
          label="Select Template here"
          value={templateType}
          onChange={handleChangeMessageType}
          helperText="Select Template here among Text, Audio, Image, Video." // Adjust helperText if needed
        >
          {MESSAGETYPES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>{option.label.split(' [')[0]}</span>
                <span>{option.label.match(/\[.*\]/)}</span> {/* Extracts text inside brackets */}
              </Box>
            </MenuItem>
          ))}
        </TextField>
  

      
        <Tooltip title="Regular message preview" arrow placement="top">
          <Box width={380}  sx={{ mb: 3 }}>
            <Box sx={{ width: '380px', p: 2, backgroundColor: '#CCF4FE', borderRadius: 1 }}>
              {chatBoxImage && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={chatBoxImage}
                    alt="Chat Preview"
                    style={{ width: '100%', borderRadius: 8 }}
                  />
                </Box>
              )}
              <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 400 }}>
                {`Hi {{1}}! 🎧🛒`}
                <br />
                <br />
                Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌
                <br />
                <br />
                Order Details:
                <br />
                {`Product: {{2}}`}
                <br />
                {`Quantity: {{3}}`}
                <br />
                {`Order ID: {{4}}`}
                <br />
                {`Delivery Address: {{5}}`}
                <br />
                {`Estimated Delivery Date: {{6}}`}
              </Typography>
            </Box>
          </Box>
        </Tooltip>
   
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          
          mr: 0,
          ml: 0,
        }}
      >
        <Button variant="contained" size="medium" color="primary">
          Add Broadcast
        </Button>
        <Button variant="outlined" size="medium" color="inherit">
          Cancel
        </Button>
      </Box>
    </>
  );
}
