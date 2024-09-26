import { useRef } from 'react';

import { Box, CardMedia, Typography, IconButton } from '@mui/material';

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
      <Typography variant="body1">{text}</Typography>

      {/* Footer Links */}
      {showLinks && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          {showVisit && (
            <IconButton color="primary">
              <Iconify icon="material-symbols:globe" sx={{ fontSize: 24 }} />
              <Typography variant="body2">Visit Now</Typography>
            </IconButton>
          )}
          {showCall && (
            <IconButton color="primary">
              <Iconify icon="material-symbols:phone" sx={{ fontSize: 24 }} />
              <Typography variant="body2">Call Now</Typography>
            </IconButton>
          )}
          {showCoupon && (
            <IconButton color="primary">
              <Iconify icon="material-symbols:card-giftcard" sx={{ fontSize: 24 }} />
              <Typography variant="body2">Coupon Code</Typography>
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
}
