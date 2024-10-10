import React, { useState } from 'react';
import { useTheme } from '@emotion/react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Box, Card, Divider, Tooltip, Typography, CardHeader, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------
export function PreviewQuickRepliesDialog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
  const [chatBoxImage] = useState('../../assets/images/chatImage/imagechat.png'); // State for the image based on the selected type

  const [message] = useState(
    'Thank you for opting-out. In future if you ever want to connect again just send "Hello".'
  ); // State to store the entered message

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={dialog.onFalse}
      >
        Quick Replies Name Comes Here{' '}
        <Iconify
          onClick={onClose}
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        />
      </DialogTitle>
      <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Tooltip title="Quick replies message type preview" arrow placement="top">
          <Box>
            <Card
              sx={{
                border: '1px solid #919EAB33',
                width: '100%',
                mb: 3,
                // maxWidth: '500px',
              }}
            >
              <CardHeader
                sx={{ mb: 2 }}
                title={
                  <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                    Mireya Conner
                  </Typography>
                }
              />
              <Divider />

              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#CCF4FE',
                  borderRadius: '8px',
                  m: 2,
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <img
                    src={chatBoxImage}
                    alt="Chat Preview"
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontSize: 14, fontWeight: '500', mb: chatBoxImage ? 0 : 0 }}
                >
                  {message}
                </Typography>
              </Box>
            </Card>
          </Box>
        </Tooltip>
      </DialogContent>
    </Dialog>
  );
}
