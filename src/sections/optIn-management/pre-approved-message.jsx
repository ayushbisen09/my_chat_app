import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Card,
  Avatar,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  MenuList,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { saveTemplate } from 'src/redux/slices/templateSlice';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import FileType from './hook/messages-type/file';
import AudioType from './hook/messages-type/audio';
import VideoType from './hook/messages-type/video';
 
export default function PreApprovedMessage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const handleFileUpload = (file) => {
    if (file) {
      setIsFileUploaded(true);
    }
  };
  const onDeleteUploadedFile = () => {
    // Logic to delete the file
    setIsFileUploaded(false); // Reset the state to indicate no file is uploaded
    setUploadKey((prevKey) => prevKey + 1); // Increment the key to force a re-render
  };

  const handleAdd = () => {
    console.log('Selected Template Type:', templateType);  // Debug line
    const templateData = {
      type: templateType,
      message,
      chatBoxImage,
    };
    dispatch(saveTemplate(templateData));
  };
  

  const popover1 = usePopover();
  const popover2 = usePopover();
  const popover3 = usePopover();
  const popover4 = usePopover();

  const [textFieldValue1, setTextFieldValue1] = useState('');
  const [textFieldValue2, setTextFieldValue2] = useState('');
  const [textFieldValue3, setTextFieldValue3] = useState('');
  const [textFieldValue4, setTextFieldValue4] = useState('');

  const [chatBoxImage, setChatBoxImage] = useState(''); // State for the image based on the selected type
  const [message, setMessage] = useState(
    <>
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
    </>
  );
  const [templateType, setmessagetype] = useState('text');
  const handleRemove = (index) => {};
  const [uploadKey, setUploadKey] = useState(0); // Create a key to force re-render

  const handleChangemessagetype = useCallback((event) => {
    const selectedType = event.target.value;
    setmessagetype(selectedType);
    
    // Check if this block is correctly updating the message template
    if (selectedType === 'file' || selectedType === 'audio' || selectedType === 'video') {
      setMessage(
        <>
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
        </>
      );
    }
  
    // Update the chatBoxImage based on the selected type
    switch (selectedType) {
      case 'text':
        setChatBoxImage('');
        break;
      case 'image':
        setChatBoxImage('../../assets/images/chatImage/imagechat.png');
        break;
      case 'video':
      case 'file':
      case 'audio':
        setChatBoxImage('');  // Ensure this doesn't interfere with your logic
        break;
      default:
        setChatBoxImage('../../assets/images/chatImage/default.png');
    }
  }, []);
  

  const TEMPLATETYPE = [
    { value: 'text', label: 'Text Template' },
    { value: 'image', label: 'Image Template' },
    { value: 'file', label: 'File Template' },
    { value: 'video', label: 'Video Template' },
    { value: 'audio', label: 'Audio Template' },
  ];

  const handlePopoverClose = (popover) => popover.onClose();
  const handlePopoverOpen = (popover) => popover.onOpen();

  const renderPopover = (popover, setTextFieldValue) => (
    <CustomPopover
      open={popover.open}
      anchorEl={popover.anchorEl}
      onClose={() => handlePopoverClose(popover)}
      slotProps={{ arrow: { placement: 'top' } }}
    >
      <MenuList>
        {['Email', 'City', 'Order ID'].map((item) => (
          <MenuItem
            key={item}
            onClick={() => {
              setTextFieldValue(`$${item}`);
              handlePopoverClose(popover);
            }}
            sx={{ color: 'primary' }}
          >
            $ {item}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box sx={{ mt: '24px' }}>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} width="100%">
          <Box width={isMobile ? '100%' : '60%'} pr={isMobile ? 0 : '12px'}>
            <Tooltip title="Click here to select WhatsApp template." arrow placement="top">
              <TextField
                sx={{ mb: 3 }}
                id="select-messagetype-label-x"
                select
                fullWidth
                label="Select WhatsApp Template"
                value={templateType}
                onChange={handleChangemessagetype}
                helperText="Select one from your WhatsApp approved template messages"
              >
                {TEMPLATETYPE.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Tooltip>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <TextField
              sx={{ mt: '24px' }}
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
                      title="Enter header URL"
                      arrow
                      placement="top"
                      sx={{
                        fontSize: '16px',
                      }}
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ width: '100%' }}>
                <FileUpload key={uploadKey} onFileUpload={handleFileUpload} />{' '}
                {/* Reset the component */}
              </Box>
              <Box sx={{ pl: 2 }}>
                <Tooltip title="Click here to remove the uploaded file" arrow placement="top">
                  <Button
                    size="small"
                    sx={{ color: 'grey.600', minWidth: 'auto' }}
                    onClick={() => setConfirmDelete(true)} // Open the confirm dialog
                    disabled={!isFileUploaded} // Disable if no file is uploaded
                  >
                    <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
            {[1, 2, 3, 4].map((index) => (
              <TextField
                key={index}
                sx={{
                  mt: '24px',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'grey.500',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: 'grey.500',
                    },
                  },
                }}
                placeholder={`Enter or Select a custom field for Body Field ${index}`}
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label={`Body Field ${index} (Eg: Ankit)`}
                helperText="This template field is required. If you leave template field as empty, your message may not be delivered."
                value={
                  index === 1
                    ? textFieldValue1
                    : index === 2
                      ? textFieldValue2
                      : index === 3
                        ? textFieldValue3
                        : index === 4
                          ? textFieldValue4
                          : ''
                }
                onChange={(e) => {
                  if (index === 1) setTextFieldValue1(e.target.value);
                  if (index === 2) setTextFieldValue2(e.target.value);
                  if (index === 3) setTextFieldValue3(e.target.value);
                  if (index === 4) setTextFieldValue4(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title="Enter or Select a custom field."
                        arrow
                        placement="top"
                        sx={{
                          fontSize: '16px',
                        }}
                      >
                        <Iconify
                          color={
                            (index === 1 && popover1.open) ||
                            (index === 2 && popover2.open) ||
                            (index === 3 && popover3.open) ||
                            (index === 4 && popover4.open)
                              ? 'inherit'
                              : 'grey'
                          }
                          onClick={
                            index === 1
                              ? popover1.onOpen
                              : index === 2
                                ? popover2.onOpen
                                : index === 3
                                  ? popover3.onOpen
                                  : index === 4
                                    ? popover4.onOpen
                                    : undefined
                          }
                          icon="fluent:calendar-agenda-24-regular"
                          style={{ width: 20, height: 20, cursor: 'pointer' }}
                        />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            ))}
          </Box>

          {renderPopover(popover1, setTextFieldValue1)}
          {renderPopover(popover2, setTextFieldValue2)}
          {renderPopover(popover3, setTextFieldValue3)}
          {renderPopover(popover4, setTextFieldValue4)}

          <Tooltip title="Pre-approved template message preview" arrow placement="top">
            <Box
              width={isMobile ? '100%' : '40%'}
              sx={{ pl: isMobile ? 0 : '12px', mt: isMobile ? '24px' : 0 }}
            >
              <Card
                sx={{
                  border: '1px solid #919EAB33',
                  width: '100%',
                  maxWidth: '500px',
                }}
              >
                <CardHeader
                  sx={{ mb: 2 }}
                  avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                  title={
                    <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                      Mireya Conner
                    </Typography>
                  }
                  subheader={
                    <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                      Online
                    </Typography>
                  }
                />
                <Divider />
                <Typography
                  variant="caption"
                  sx={{
                    pr: 2,
                    pt: 3,
                    display: 'flex',
                    color: '#919EAB',
                    justifyContent: 'end',
                  }}
                >
                  4:02 PM
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#CCF4FE',
                    borderRadius: '8px',
                    m: 2,
                  }}
                >
                  {templateType === 'video' && (
                    <VideoType
                      videoSrc="../../../public/assets/videos/chat-videos/advertisement.mp4"
                      captionsSrc="../../assets/captions/sample.vtt"
                    />
                  )}

                  {templateType === 'audio' && (
                    <AudioType audioSrc="../../../public/assets/audios/new-instrumental.mp3" />
                  )}

                  {templateType === 'file' && <FileType />}

                  <Box sx={{ mb: 2 }}>
                    {chatBoxImage && (
                      <img
                        src={chatBoxImage}
                        alt="Chat Preview"
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: 14, fontWeight: '500', mb: chatBoxImage ? 0 : 0 }}
                  >
                    {message}
                  </Typography>
                  <Box>
                    <Divider sx={{ mt: 1, mb: 1 }} />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center', // Center vertically
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          color: '#007BFF', // Change color of the icon button
                        }}
                      >
                        <Iconify width={20} icon="solar:copy-bold" />
                      </IconButton>
                      <Typography
                        sx={{
                          color: '#007BFF', // Change color of the text
                          fontSize: '14px', // Set font size to 12
                          fontWeight: '400', // Set font weight to medium
                        }}
                      >
                        Coupon Code
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Divider sx={{ mb: 1, mt: 1 }} />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center', // Center vertically
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          color: '#007BFF', // Change color of the icon button
                        }}
                      >
                        <Iconify width={20} icon="icon-park-outline:share" />
                      </IconButton>
                      <Typography
                        sx={{
                          color: '#007BFF', // Change color of the text
                          fontSize: '14px', // Set font size to 12
                          fontWeight: '400', // Set font weight to medium
                        }}
                      >
                        Visit Now
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Divider sx={{ mb: 1, mt: 1 }} />

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center', // Center vertically
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          color: '#007BFF', // Change color of the icon button
                        }}
                      >
                        <Iconify width={20} icon="material-symbols:call" />
                      </IconButton>
                      <Typography
                        sx={{
                          color: '#007BFF', // Change color of the text
                          fontSize: '14px', // Set font size to 12
                          fontWeight: '400', // Set font weight to medium
                        }}
                      >
                        Call Now
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Tooltip>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button sx={{ mr: 2 }} variant="contained" onClick={handleAdd}>
            Save
          </Button>
          <Button variant="outlined">Cancel</Button>
        </Box>
      </Box>

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
}
