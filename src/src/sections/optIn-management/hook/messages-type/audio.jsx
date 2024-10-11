import React from 'react';

import { Box } from '@mui/material';

const AudioType = ({ audioSrc }) => {
  const audioRef = React.useRef(null);

  return (
    <Box>
      {/* Audio Player */}
      <audio ref={audioRef} src={audioSrc} controls style={{ width: '320px' }}>
        <track kind="captions" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default AudioType;
