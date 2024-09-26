import 'react-modal-video/scss/modal-video.scss';

import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';

import { Box, Card, Button,Tooltip} from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';

import { Iconify } from '../iconify'; // Import styles for ModalVideo


export default function VideoPlayListCards({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId, 
  videoTime,// Add the videoId prop to pass the video ID
  ...other
}) {
  const [isOpen, setOpen] = useState(false); // State to handle modal open/close

  return (
    <>
    <Tooltip title="Click to Watch Tutorial" arrow placement="top">
      
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
      }}
      {...other}
    >
      
      <Box sx={{ pt: 1, px: 1 }}>
        <Box
          component="img"
          src={`${CONFIG.site.basePath}/assets/background/${thumbnailimage}`}
          sx={{
            width: '100%',
            height: 184,
            position: 'relative',
            objectFit: 'cover',
            border:'1px solid #919EAB34',
            borderRadius:'8px'
          }}
        />
        
      </Box>
     
      <Box sx={{ pt: 2.5, px: 2, ...sx }}>
        <Box sx={{ pb: 1.5 }}>
          <Label
            sx={{
              backgroundColor: 'rgba(145, 158, 171, 0.08)',
              height: '34px',
              fontSize: '12px',
              fontWeight: '500',
            }}
            variant="soft"
          >
            <Iconify sx={{ mr: 1 }} icon="tabler:clock" width={24} /> {videoTime}
          </Label>
        </Box>
        <Box
          sx={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'text.primary',
            pb: 1.5,
          }}
        >
          {Videotitle}
        </Box>
        <Box>
          <Button
            variant="contained"
            color="inherit"
            width="105px"
            sx={{ mb: 2 }}
            onClick={() => setOpen(true)} // Open modal on button click
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
      
    </Card>
    </Tooltip>
    <ModalVideo
          channel="youtube"
          autoplay="true"
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
    </>
  );
}
