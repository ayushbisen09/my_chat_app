import React from 'react';

import { Box, Typography } from '@mui/material';

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = React.useRef(null);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '320px',
        position: 'relative',
      }}
    >
      {/* Thumbs Up Emoji on the left */}

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
          p:0.1,

        }}
      >
        🙏
      </Typography>

      {/* Audio Player */}
      <audio ref={audioRef} src={audioSrc} controls style={{ width: '320px' }}>
        <track kind="captions" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default AudioPlayer;
