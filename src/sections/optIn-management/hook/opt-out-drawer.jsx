import React , { useState }from 'react';
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
  Backdrop as MuiBackdrop
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { ChooseTemplate } from 'src/components/flow-nodes/message-type-nodes/hooks/dailogs/flow-start-node-choose-templates-dailog';

import OptOutRegularMessage from '../opt-out-regular-message';
// import OptOutPreApprovedMessage from '../opt-out-pre-approved-message';

// Custom backdrop component
const CustomBackdrop = (props) => (
  <MuiBackdrop
    {...props}
    sx={{ backgroundColor: 'transparent' }} // Make the backdrop transparent
  />
);

const OptOutDrawer = ({ open, onClose,setMessageType, messageType }) => {
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false); // Moved inside the component
  const openTemplateDialog = () => setIsTemplateDialogOpen(true);
  const closeTemplateDialog = () => setIsTemplateDialogOpen(false);
  const handleBackdropClick = (event) => {
    // Prevent clicks inside the drawer from closing it
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const CustomLink = styled(Link)({
    color: '#078DEE',
  });


  const handleRadioChange = (event) => {
    setMessageType(event.target.value);
  };

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
              subheader="Setup keywords that user can type to Opt-in & Opt-out from messaging campaign. "
              title="Opt-Out Response"
              sx={{ mb: 3 }}
            />

            <Divider />
            <Box sx={{ p: 3 }}>
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Select Message Type
              </Typography>
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
                    value="regular"
                    control={<Radio size="small" />}
                    label="Regular Message"
                  />
                </Tooltip>
              </RadioGroup>
              {messageType === 'pre' && (
                <form>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="Medium"
                    onClick={openTemplateDialog}
                    sx={{width: '230px' ,mt: 2}}
                  >
                    Select Whatsapp Template
                  </Button>
                </form>
              )}

              {messageType === 'regular' && (
                <form>
                  <OptOutRegularMessage onClose={onClose} />
                </form>
              )}
            </Box>
            <ChooseTemplate open={isTemplateDialogOpen} onClose={closeTemplateDialog} />
          </Card>
        </Box>
      </Drawer>
      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

export { OptOutDrawer };
