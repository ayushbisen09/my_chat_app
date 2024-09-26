import 'react-modal-video/scss/modal-video.scss';

import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Card, IconButton, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function MessageReply() {
  // Handlers for dialog open/close
  const isVisible = useSelector(state=>state.messageReply.isVisible);
  const replyText=" I am good too. I just finished working on a new project at work. It’s been quite a challenge, but I’m excited about it";
  return (
    <Box
      sx={{
        width: '320px',
        p: 1.5,
        backgroundColor: '#CCF4FE',
        borderRadius: '8px',
      }}
    >
      <Card
        sx={{
          px: 2,
          mb: 3,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>Replied to this message</Box>
        <IconButton>
          <Iconify icon="ic:round-reply" width={24} height={24} />
        </IconButton>
      </Card>
      <Typography
        sx={{
          fontSize: '16px',
          position: 'absolute',
          right: '305px', // Adjust X-axis position
          top: '100%', // Adjust Y-axis position
          transform: 'translateY(-50%)', // Center vertically
          zIndex: 1, // Ensure it's above other content
          border: '1px solid #E6E6E6',
          borderRadius: '20px',
          backgroundColor: '#FFFFFF',
          p: 0.1,
        }}
      >
        🙏
      </Typography>
      <Typography sx={{ fontSize: '14px' }}>
       {replyText}
      </Typography>
    </Box>
  );
}
