import { useRef } from 'react';

import { Box, Divider, CardMedia, Typography, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function VideoTemplateChatBox({
  videoSrc, // Video source URL
  captionsSrc, // Captions source URL
  text, // Text description below the video
  showLinks, // Whether to show the call, coupon, and visit links
  showVisit, // Show "Visit Now" button
  showCall, // Show "Call Now" button
  showCoupon, // Show "Coupon Code" button
  showImage,
  coverSrc,
}) {
  // Create a reference for the video element
  const videoRef = useRef(null);

  return (
    <Box
      sx={{
        p: 2,
        pt: '16px',
        backgroundColor: '#CCF4FE',
        borderRadius: '8px',
      }}
    >
      {showImage && (
        <CardMedia
          component="img"
          image={coverSrc}
          alt="Chat image"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            marginBottom: 2, // Add some space between the image and the text
            borderRadius: '8px', // Optional: add rounded corners to the image
          }}
        />
      )}
      {videoSrc && (
        <Box sx={{ maxWidth: 320, borderRadius: '12px', overflow: 'hidden' }}>
          <video
            ref={videoRef} // Attach video ref
            src={videoSrc} // Set video source
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
            controls // Show video controls
          >
            <track
              src={captionsSrc} // Set captions file
              kind="captions"
              srcLang="en"
              label="English captions"
              default
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      )}

      {/* Description */}
      <Typography fontSize="14px">{text}</Typography>

      {/* Footer Links */}
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
