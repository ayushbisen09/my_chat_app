import React, { useState } from 'react';

import { Box, Dialog, IconButton, DialogContent } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export const ImageModal = ({ open, onClose, src }) => {
  const [scale, setScale] = useState(1);
  const [canZoomOut, setCanZoomOut] = useState(false);

  const handleZoomIn = () => {
    setScale(prevScale => {
      const newScale = prevScale * 1.2;
      setCanZoomOut(true); // Enable zoom out when zoomed in
      return newScale;
    });
  };

  const handleZoomOut = () => {
    setScale(prevScale => {
      const newScale = Math.max(1, prevScale / 1.2); // Prevent zooming out below initial scale
      if (newScale <= 1) {
        setCanZoomOut(false); // Disable zoom out if scale is back to initial
      }
      return newScale;
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent
        sx={{
          backgroundColor: 'transparent',
          position: 'relative',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
            zIndex: 1,
          }}
        >
          <Iconify icon="material-symbols:close" width={24} />
        </IconButton>

        {/* Zoom Controls */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 56, // Adjust this value to place zoom controls correctly
            zIndex: 1,
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
          }}
        >
          <IconButton onClick={handleZoomIn} sx={{ color: 'white' }}>
            <Iconify icon="material-symbols:zoom-in" width={24} />
          </IconButton>
          <IconButton onClick={handleZoomOut} sx={{ color: 'white' }} disabled={!canZoomOut}>
            <Iconify icon="material-symbols:zoom-out" width={24} />
          </IconButton>
        </Box>

        {/* Image */}
        <Box
          sx={{
            overflow: 'hidden',
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={src}
            alt="Preview"
            style={{
              display: 'block',
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              transition: 'transform 0.3s ease', // Smooth transition
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
