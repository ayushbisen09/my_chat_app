import { useRef } from 'react';

import { Box } from '@mui/material';

const VideoType = ({ videoSrc, captionsSrc }) => {
  const videoRef = useRef(null);

  return (
    <Box sx={{ maxWidth: 320, borderRadius: '12px', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        src={videoSrc}
        style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
        controls
      >
        <track src={captionsSrc} kind="captions" srcLang="en" label="English captions" default />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default VideoType;
