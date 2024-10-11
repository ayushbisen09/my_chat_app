import { useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Divider,
  Tooltip,
  MenuItem,
  MenuList,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import ChatBox from './components/chat-box/chat-box';
import Image from '../../assets/images/chatImage/imagechat.png';

export default function PreApprovedMessage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const TEMPLATES = [
    { value: 'template1', label: 'Template 1' },
    { value: 'template2', label: 'Template 2' },
    { value: 'template3', label: 'Template 3' },
    { value: 'template4', label: 'Template 4' },
  ];

  const [template, setTemplate] = useState('template1');
  const handleChangeTemplate = useCallback((event) => {
    setTemplate(event.target.value);
  }, []);

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const handleFileUpload = (file) => {
    if (file) {
      setIsFileUploaded(true);
    }
  };

  const popover1 = usePopover();
  const popover2 = usePopover();
  const popover3 = usePopover();
  const popover4 = usePopover();

  const [textFieldValue1, setTextFieldValue1] = useState('');
  const [textFieldValue2, setTextFieldValue2] = useState('');
  const [textFieldValue3, setTextFieldValue3] = useState('');
  const [textFieldValue4, setTextFieldValue4] = useState('');

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
    <Box sx={{ mt: '24px' }}>
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} width="100%">
        <Box width={isMobile ? '100%' : '60%'} pr={isMobile ? 0 : '12px'}>
        <Tooltip title="Click here to select WhatsApp template." arrow placement="top">
          <TextField
            sx={{ mb: '24px' }}
            id="select-currency-label-x"
            select
            fullWidth
            label="Select WhatsApp Template"
            value={template}
            onChange={handleChangeTemplate}
            helperText="Select one from your WhatsApp approved template messages"
          >
            {TEMPLATES.map((option) => (
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
          
          <FileUpload onFileUpload={handleFileUpload} />
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
                index === 1 ? textFieldValue1 :
                index === 2 ? textFieldValue2 :
                index === 3 ? textFieldValue3 :
                index === 4 ? textFieldValue4 :
                ''
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
                          index === 1 ? popover1.onOpen :
                          index === 2 ? popover2.onOpen :
                          index === 3 ? popover3.onOpen :
                          index === 4 ? popover4.onOpen :
                          undefined
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
          
          <ChatBox
            text={
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
            }
            showImage
            coverSrc={Image}
            showLinks
            showCoupon
            showCall
            showVisit
          />
        </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
