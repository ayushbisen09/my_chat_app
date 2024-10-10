import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Card, Avatar, Divider, IconButton, Typography, CardHeader } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function CatalougeMessageNodeMessagePreview({
  showCatalougeMessageNodeMessagePreview,
  setShowCatalougeMessageNodeMessagePreview,
  onClose,
}) {
  console.log(showCatalougeMessageNodeMessagePreview);

  const body = useSelector((state) => state.catalougeMessageNode.body);
  const footer = useSelector((state) => state.catalougeMessageNode.footer);
  const handleCloseDrawer = () => {
    setShowCatalougeMessageNodeMessagePreview();
  };
  const handleBackdropClick = (event) => {
    // Prevent clicks inside the drawer from closing it
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const hasContent = body || footer;

  return (
    <Drawer
      open={showCatalougeMessageNodeMessagePreview}
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
                Mireya Conner List
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
              m: 2,
              height: hasContent ? 'auto' : '36px',
              minHeight: '36px',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                px: 0,
                py: 0,
                color: 'primary',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {body && (
                <>
                  {body}
                  <br />
                </>
              )}
              {footer && (
                <>
                  {footer}
                  <br />
                </>
              )}
            </Typography>
          </Box>
        </Card>
      </Box>
    </Drawer>
  );
}
