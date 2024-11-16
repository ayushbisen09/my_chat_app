import { useTheme } from '@emotion/react';

import {
  Box,
  Paper,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  DialogActions,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import ExploareTemplatePreviewChatBox from '../explore-template-preview-dialog';
import templateimage from '../../../../../public/assets/images/chatImage/imagechat.png';

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
  type,icon
}) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  console.log(type);
  return (
    <Dialog open={open} onClose={onClose} sx={{ width: '450px', mx: '40%' }}>
      <DialogTitle sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}>
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
          pb:0
        }}
      >
        <Paper>
          <Box>
            <ExploareTemplatePreviewChatBox
              coverSrc={type !== 'text' && templateimage}
              text={text}
              type={type}
              showImage={showImage}
              showLinks={showLinks}
              showCall={showCall}
              showCoupon={showCoupon}
              showVisit={showVisit}
              icon={icon}
            />
          </Box>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
