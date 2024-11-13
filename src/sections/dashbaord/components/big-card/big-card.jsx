import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { CloseIcon } from 'yet-another-react-lightbox';

import {
  Box,
  Card,
  List,
  Button,
  Dialog,
  Tooltip,
  ListItem,
  CardMedia,
  Typography,
  IconButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

import { WhatsAppDialog } from 'src/sections/dashbaord/hooks/add-whatsApp-number';

export default function BigCard({ sx, ...other }) {
  const videoId = 'CoIfgN0tfhE'; // Repalace with your YouTube video ID
  const coverSrc = `${CONFIG.site.basePath}/assets/background/Pabbly Broadcast Card.png`;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialog = useBoolean();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const commonTypographyProps = {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '24px',
    '&::before': { content: '"•"', paddingRight: '0.5rem' },
  };

  const teammembersPageDisabled = useSelector((state) => state.access.teammembersPageDisabled);


  return (
    <Box
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        backgroundColor: 'common.white',
        p: 5,
        gap: 5,
        borderRadius: 2,
        display: 'flex',
        height: 'auto',
        position: 'relative',
        pl: { xs: 3, md: 5 },
        alignItems: { xs: 'left', md: 'left' },
        justifyContent: { xs: 'left', md: 'left' },
        color: 'common.white',
        textAlign: { xs: 'left', md: 'left' },
        flexDirection: { xs: 'column', md: 'row' },

        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: { xs: 'flex-start', md: 'flex-start' },
          width: '564px',
        }}
      >
        <Typography variant="h6" sx={{ color: 'grey.800', mb: 1 }}>
          Points To Remember
        </Typography>

        <List sx={{ color: 'grey.600' }}>
          <ListItem disablePadding>
            <ListItemText
              primaryTypographyProps={{
                sx: commonTypographyProps,
              }}
              primary="Choose a WhatsApp Business API provider that suits your needs and requirements."
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primaryTypographyProps={{
                sx: commonTypographyProps,
              }}
              primary="Familiarize yourself with the requirements for using the WhatsApp Business API."
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primaryTypographyProps={{
                sx: commonTypographyProps,
              }}
              primary="Apply for access to the WhatsApp Business API through your chosen provider."
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primaryTypographyProps={{
                sx: commonTypographyProps,
              }}
              primary="Agree to the terms set by WhatsApp and your provider."
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primaryTypographyProps={{
                sx: commonTypographyProps,
              }}
              primary="Verify your business and phone number with WhatsApp."
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primaryTypographyProps={{
                sx: commonTypographyProps,
              }}
              primary="Work with your chosen provider to complete the setup process. "
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primaryTypographyProps={{
                sx: commonTypographyProps,
              }}
              primary="Improve your messaging to boost engagement and meet business goals."
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primaryTypographyProps={{
                component: 'div',
                sx: commonTypographyProps,
              }}
              primary={
                <>
                  Stay updated on policy changes affecting your API use.{' '}
                  <Link style={{ color: '#078DEE' }} href="#" underline="always">
                    Learn more
                  </Link>
                </>
              }
            />
          </ListItem>
          {/* Add more list items as needed */}
        </List>
        <Tooltip title="Click here to add whatsApp number" arrow placement="top">
          <Button
            onClick={dialog.onTrue}
            sx={{ mt: isMobile ? 2 : 2 }}
            size="large"
            variant="outlined"
            color="primary"
            disabled={teammembersPageDisabled}
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
          >
            Add WhatsApp Number
          </Button>
        </Tooltip>
        <WhatsAppDialog open={dialog.value} onClose={dialog.onFalse} />
      </Box>

      {/* {img && <Box sx={{ maxWidth: 260 }}>{img}</Box>} */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '400px',

          ...(isMobile && {
            marginRight: '0px', // Adjusted margin-right for screens matching 'sm' breakpoint and up
          }),
        }}
      >
        <Tooltip title="Click here to see Video Tutorial." arrow placement="top">
          <Card>
            <Box position="relative">
              <CardMedia
                component="img"
                src={coverSrc}
                title="Cover Image"
                sx={{
                  height: '100%',
                  width: '100%',
                  cursor: 'pointer',
                  objectFit: 'contain',
                }}
                onClick={() => setOpen(true)}
              />
              <IconButton
                aria-label="play"
                onClick={() => setOpen(true)}
                sx={{
                  padding: '0px',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#078DEE',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'translate(-50%, -50%) scale(1)',
                      boxShadow: '0 0 0 0 rgba(7, 141, 238, 0.7)',
                    },
                    '70%': {
                      transform: 'translate(-50%, -50%) scale(1.1)',
                      boxShadow: '0 0 0 10px rgba(7, 141, 238, 0)',
                    },
                    '100%': {
                      transform: 'translate(-50%, -50%) scale(1)',
                      boxShadow: '0 0 0 0 rgba(7, 141, 238, 0)',
                    },
                  },
                }}
              >
                <Iconify icon="icon-park-solid:play" width={50} height={50} />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
                sx={{ '& .MuiDialog-paper': { width: 1080, height: 600 } }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
                >
                  <CloseIcon />
                </IconButton>
                <Box
                  component="iframe"
                  src="https://www.youtube.com/embed/mnJFZxwhiEQ?si=oxXcH4GoSTRxfsv8" // Replace with your video ID
                  sx={{ width: '100%', height: '100%', border: 'none' }}
                />
              </Dialog>
            </Box>
          </Card>
        </Tooltip>
      </Box>
    </Box>
  );
}
