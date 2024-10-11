import React from 'react';

import { Box, Divider, Typography, IconButton,  } from '@mui/material';

import { Iconify } from 'src/components/iconify';


export default function AudioTemplateChatBox({ audioSrc, text, showLinks, showVisit, showCall, showCoupon }) {
  return (
    <Box
      sx={{
        p: 2,
        pt: '16px',
        backgroundColor: '#CCF4FE',
        borderRadius: '8px',
      }}
    >
      {audioSrc && (
        <Box sx={{ mb: 2 }}>
          <audio controls src={audioSrc} style={{ width: '100%' }}>
            <track kind="captions" srcLang="en" label="English captions" default />
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}
      <Typography variant="body1">{text}</Typography>
      {showLinks && (
        <Box sx={{ mt: 3 }}>
          {showCall && (
            <Box>
              <Divider
                sx={{
                  mb: 1,
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    color: '#007BFF', // Change color of the icon button
                  }}
                >
                  <Iconify width={20} icon="material-symbols:call" />
                </IconButton>
                <Typography
                  sx={{
                    color: '#007BFF', // Change color of the text
                    fontSize: '14px', // Set font size to 12
                    fontWeight: '400', // Set font weight to medium
                  }}
                >
                  Call Now
                </Typography>
              </Box>
            </Box>
          )}
          {showCoupon && (
            <Box>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    color: '#007BFF', // Change color of the icon button
                  }}
                >
                  <Iconify width={20} icon="solar:copy-bold" />
                </IconButton>
                <Typography
                  sx={{
                    color: '#007BFF', // Change color of the text
                    fontSize: '14px', // Set font size to 12
                    fontWeight: '400', // Set font weight to medium
                  }}
                >
                  Coupon Code
                </Typography>
              </Box>
            </Box>
          )}
          {showVisit && (
            <Box>
              <Divider sx={{ mb: 1, mt: 1 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center', // Center horizontally
                  alignItems: 'center', // Center vertically
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    color: '#007BFF', // Change color of the icon button
                  }}
                >
                  <Iconify width={20} icon="icon-park-outline:share" />
                </IconButton>
                <Typography
                  sx={{
                    color: '#007BFF', // Change color of the text
                    fontSize: '14px', // Set font size to 12
                    fontWeight: '400', // Set font weight to medium
                  }}
                >
                  Visit Now
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
