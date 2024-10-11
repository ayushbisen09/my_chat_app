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
  useMediaQuery,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

export default function GetHelpBigCard({ sx, ...other }) {
  const videoId = 'CoIfgN0tfhE'; // Replace with your YouTube video ID
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
          Have Questions?
        </Typography>
        <Box sx={{ color: 'grey.600' }}>
          <List sx={{ mb: 1 }}>
            <ListItem disablePadding>
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    fontWeight: '500',
                    '&::before': { content: '"•"', paddingRight: '0.5rem' },
                  },
                }}
                primary="No matter how skilled you might be, sometimes we all need a little support."
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
                primary="We are here to help you succeed with building your workflows."
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
                primary="Get assistance on troubleshooting errors, and can even get to know about building new automation as well."
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
                primary="We will try our best to help you out for every issues."
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
                primary="In case you wish to manage or cancel the subscription, you can do that from the My Subscriptions section."
              />
            </ListItem>
            {/* Add more list items as needed */}
          </List>
        </Box>
        <Tooltip title="Click here to get help with all your queries" arrow placement="top">
        <Button
          onClick={dialog.onTrue}
          sx={{ mt: isMobile ? 2 : 0 }}
          size="large"
          variant="outlined"
          color="primary"
        >
          Ask a Question
        </Button>
        </Tooltip>
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
      </Box>
    </Box>
  );
}
