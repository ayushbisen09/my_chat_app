import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';

import { setReplyText } from 'src/redux/slices/messageReply';

const VideoPlayer = ({ videoSrc, captionsSrc }) => {
  const videoRef = useRef(null);
  const dispatch=useDispatch();
  const isVisible = useSelector(state=>state.messageReply.isVisible);

  useEffect(()=>{
    dispatch(setReplyText('video'));
   },[isVisible,dispatch]);

  return (

    <Box sx={{ maxWidth: 320, borderRadius: '12px', overflow: 'hidden' }}>
      <video
        ref={videoRef}
        src={videoSrc}
        style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
        controls
      >
        <track
          src={captionsSrc}
          kind="captions"
          srcLang="en"
          label="English captions"
          default
        />
        Your browser does not support the video tag.
      </video>
    </Box>
  
  );
};

export default VideoPlayer;