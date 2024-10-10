import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  Card,
  Radio,
  Drawer,
  styled,
  Button,
  Divider,
  Tooltip,
  CardHeader,
  Typography,
  IconButton,
  RadioGroup, 
  FormControlLabel,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { ChooseTemplate } from 'src/components/flow-nodes/message-type-nodes/hooks/dailogs/flow-start-node-choose-templates-dailog';

import OffHourMessageRegularMessage from '../off-hours-message-regular-message';



// Custom backdrop component
const CustomBackdrop = (props) => (
  <MuiBackdrop
    {...props}
    sx={{ backgroundColor: 'transparent' }} // Make the backdrop transparent
  />
);

const OffHourMessageDrawer= ({ open, onClose }) => {
  const handleBackdropClick = (event) => {
    // Prevent clicks inside the drawer from closing it
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const CustomLink = styled(Link)({
    color: '#078DEE',
  });

  const [messageType, setMessageType] = useState('pre');

  const handleRadioChange = (event) => {
    setMessageType(event.target.value);
  };
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false); // Moved inside the component

  const openTemplateDialog = () => setIsTemplateDialogOpen(true);
  const closeTemplateDialog = () => setIsTemplateDialogOpen(false);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: 'auto',
              lg: '1110px',
            }, // Adjust width as needed
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop, // Use the custom backdrop
        }}
      >
        <Box
          onClick={handleBackdropClick} // Handle clicks outside the drawer
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h6">Configure Message</Typography>
          <IconButton onClick={onClose} sx={{ top: 12, left: 12, zIndex: 9, position: 'unset' }}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardHeader
              subheader="Send template message from one of your pre approved templates. "
              title="Off Hours Message"
              sx={{ mb: 3 }}
            />

            <Divider />
            <Box sx={{ p: 3 }}>
            <Tooltip title="Message type" arrow placement="top">
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Select Message Type
              </Typography>
              </Tooltip>
              <RadioGroup row value={messageType} onChange={handleRadioChange}>
              <Tooltip title="Pre-approved template message" arrow placement="left">
                <FormControlLabel
                  value="pre"
                  control={<Radio size="small" />}
                  label="Pre-approved template message"
                />
                </Tooltip>
                <Tooltip title="Regular message" arrow placement="right">
                <FormControlLabel
                  value="regualr"
                  control={<Radio size="small" />}
                  label="Regular Message"
                />
                </Tooltip>
              </RadioGroup>
              {messageType === 'pre' && (
                <Button
                variant="outlined"
                color="primary"
                size="Medium"
                onClick={openTemplateDialog}
                sx={{ width: '230px', mt: 2 }}
              >
                Select WhatsApp Template
              </Button>
              )}

              {messageType === 'regualr' && (
                <form>
                  <OffHourMessageRegularMessage />
                </form>
              )}
            </Box>
          </Card>
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
      <ChooseTemplate open={isTemplateDialogOpen} onClose={closeTemplateDialog} />

    </>
  );
};



export { OffHourMessageDrawer };
