import { useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  List,
  Button,
  Tooltip,
  ListItem,
  Typography,
  ListItemText,
  useMediaQuery
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { WebhookDialog } from '../../hook/add-webhook';

export default function BigCard({sx, ...other}) {
  const videoId = 'CoIfgN0tfhE'; // Repalace with your YouTube video ID
  const coverSrc = `${CONFIG.site.basePath}/assets/background/Pabbly Broadcast Card.png`;
  const [isOpen, setOpen] = useState(false);

  const dialog = useBoolean();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',

        backgroundColor: 'common.white',
        mt: '24px',
        pt: 5,
        pb: 5,
        pr: 3,
        gap: 5,
        borderRadius: 2,
        display: 'flex',
        height: { md: 1 },
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
        }}
      >
        <Typography variant="h6" sx={{ color: 'grey.800', mb: 1 }}>
          Add Opt-Out Webhook URL
        </Typography>
        
          <List sx={{ color: 'grey.600' }}>
            <ListItem disablePadding sx={{ mb: '24px' }}>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '22px',
                  },
                }}
                primary="Set up webhooks and receive notification for different events."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="All the events will be triggered on the added webhook URL."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="You can set up upto 5 webhooks URLs."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="Review and agree to the terms and conditions set by WhatsApp and your chosen provider."
              />
            </ListItem>
            {/* Add more list items as needed */}
          </List>
          <Tooltip title="Click here to add add webhook." arrow placement="top">
        <Button
          onClick={dialog.onTrue}
          sx={{ mt: isMobile ? 2 : 0 }}
          size="large"
          variant="outlined"
          color="primary"
        >
          Add Webhook
        </Button>
        </Tooltip>
        <WebhookDialog open={dialog.value} onClose={dialog.onFalse} />
      </Box>

      {/* {img && <Box sx={{ maxWidth: 260 }}>{img}</Box>} */}
      <Box
        sx={{
          marginRight: '16px', // Default margin-right for all screen sizes
          ...(isMobile && {
            marginRight: '0px', // Adjusted margin-right for screens matching 'sm' breakpoint and up
          }),
        }}
      >
        <Box
          alt="logo"
          component="img"
          src={`${CONFIG.site.basePath}/assets/background/Get Help Photo.png`}
        />
        {/* <Card>
          <CardMedia
            component="img"
            src={coverSrc}
            title="Cover Image"
            style={{
              height: '100%',
              width: '100%',
              cursor: 'pointer',
              objectFit: 'contain',
            }}
            onClick={() => setOpen(true)}
          />
        </Card>
        <ModalVideo
          channel="youtube"
          autoplay="true"
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        /> */}
      </Box>
    </Box>
  );
}
