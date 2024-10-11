import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import ModalVideo from 'react-modal-video';

import {
  Box,
  Card,
  List,
  Button,
  Tooltip,
  ListItem,
  CardMedia,
  Typography,
  ListItemText,
  useMediaQuery
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { TeamMemberDialog } from '../../hooks/add-team-member';

export default function BigCard(sx, ...other) {
  const videoId = 'CoIfgN0tfhE'; // Repalace with your YouTube video ID
  const coverSrc = `${CONFIG.site.basePath}/assets/background/teammember.png`;
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
          Points To Remember
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'grey.600',

            ...(true && { mb: 3 }), // Example conditional margin bottom
          }}
        >
          <List sx={{ color: 'grey.600' }}>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="You can add multiple team members, and can share multiple WhatsApp Numbers with them."
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
                primary="Team members will be able to chat in your account."
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
                primary="Team members will have access only to shared WhatsApp Numbers."
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
                primary="Team members won't be able to delete campaigns."
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
                primary="Team members will be able to access Inboxs."
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
                primary="Team members won't be able to delete contacts. "
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
                primary="Team members will not be able to delete templates in your account."
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  component: 'div',
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary={
                  <>
                    Team members cannot access any details related to sub-accounts of your account.{' '}
                    <Link href="#" underline="always">
                      Learn more
                    </Link>
                  </>
                }
              />
            </ListItem>
            {/* Add more list items as needed */}
          </List>
        </Typography>
        <Tooltip title="Click here to add team member." arrow placement="top">
        <Button
          onClick={dialog.onTrue}
          sx={{ mt: isMobile ? 2 : 0 }}
          size="large"
          variant="outlined"
          color="primary"
        >
          Add Team Member
        </Button>
        </Tooltip>
        <TeamMemberDialog open={dialog.value} onClose={dialog.onFalse} />
      </Box>

      {/* {img && <Box sx={{ maxWidth: 260 }}>{img}</Box>} */}
      <Box
        sx={{
          marginRight: '16px', // Default margin-right for all screen sizes
          ...(isMobile && {
            marginRight: '0px', // Adjusted margin-right for screens matching 'sm' breakpoint and up
          }),
        }}
      ><Tooltip title="Click here to see Video Tutorial." arrow placement="top">
        <Card>
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
        </Tooltip>
        <ModalVideo
          channel="youtube"
          autoplay="true"
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
      </Box>
    </Box>
  );
}
