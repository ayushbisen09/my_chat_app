import { useTheme } from '@emotion/react';

import { Box, Paper, Dialog, Button, DialogTitle, DialogContent, useMediaQuery, DialogActions } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import PreviewTemplateChatBox from 'src/sections/preview-template/chat-box';

import templateimage from '../../../../../public/assets/images/chatImage/imagechat.png'

export function SubmitAndPreviewTempalteDailog({
  open,
  onClose,
  coverSrc,
  text,
  showImage,
  showLinks,
  showCall,
  showCoupon,
  showVisit,
}) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
      >
        Template Preview
        <Iconify
          onClick={onClose}
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        />
      </DialogTitle>

      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Paper sx={{ m: 1.5 }}>
          <Box>
            <PreviewTemplateChatBox
              coverSrc={templateimage}
              text={text}
              showImage={showImage}
              showLinks={showLinks}
              showCall={showCall}
              showCoupon={showCoupon}
              showVisit={showVisit}
            />
          </Box>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button color='primary' variant='contained'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
