import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {
  Card,
  Avatar,
  Divider,
  IconButton,
  Typography,
  CardHeader,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function TextButtonNodeMessagePreview({
  showTextButtonNodeMessagePreview,
  setShowTextButtonNodeMessagePreview,
  onClose,
}) {
  console.log('showTextButtonNodeMessagePreview', showTextButtonNodeMessagePreview);
  const message = useSelector((state) => state.textButtonNode.message);
  const buttons = useSelector((state) => state.textButtonNode.buttons);
  const handleCloseDrawer = () => {
    setShowTextButtonNodeMessagePreview();
  };
  const handleBackdropClick = (event) => {
    // Prevent clicks inside the drawer from closing it
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Drawer
      open={showTextButtonNodeMessagePreview}
      onClose={handleCloseDrawer}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 416 } }}
    >
      <Box
        sx={{ p: 3 }}
        onClick={handleBackdropClick} // Handle clicks outside the drawer
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h6">Configure Message</Typography>
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'unset' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Box>
      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            border: '1px solid #919EAB33',
            width: '100%',
            maxWidth: '400px',
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

          <Box
            sx={{
              p: 2,
              pt: '16px',
              backgroundColor: '#CCF4FE',
              borderRadius: '8px',
              mx: 2,
              mt: 2,
            }}
          >
            {/* <CardMedia
              component="img"
              image="/assets/images/templateImage/template-image1.jpg"
              alt="Chat image"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                marginBottom: 2, // Add some space between the image and the text
                borderRadius: '8px', // Optional: add rounded corners to the image
              }}
            /> */}

            <Typography
              variant="body2"
              sx={{
                px: 0,
                py: 0,
                color: 'primary',
                whiteSpace: 'pre-wrap',
                // 24px margin bottom
              }}
            >
              {message}
              <br />
            </Typography>
          </Box>

          {buttons.map((button) => (
            <Box
              key={button.id}
              sx={{
                backgroundColor: '#CCF4FE',
                my: 1,
                mx: 2,

                borderRadius: '8px',
                height: '36px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography color="#078DEE" fontWeight="600">
                {button.text}
              </Typography>
            </Box>
          ))}
        </Card>
      </Box>
    </Drawer>
  );
}
