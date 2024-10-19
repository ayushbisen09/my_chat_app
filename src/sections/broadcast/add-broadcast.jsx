import React from 'react';
import { useTheme } from '@emotion/react';

import { Box, useMediaQuery } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import WhatsAppBroadcast from './components/whatsapp-broadcast/whatsApp-broadcast';

export default function AddBroadcast() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Define helper texts based on template

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="Whatsapp Broadcast"
          Subheading="Launch a campaign now to initiate new conversations with users on WhatsApp."
          link_added="#"
        />
      </Box>
      <WhatsAppBroadcast />
    </DashboardContent>
  );
}
