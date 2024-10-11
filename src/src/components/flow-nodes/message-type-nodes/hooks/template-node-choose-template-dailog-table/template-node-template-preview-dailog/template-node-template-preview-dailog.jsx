import { useTheme } from '@emotion/react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import PreviewTemplateChatBox from 'src/sections/preview-template/chat-box';
// import { Iconify } from './';

// ----------------------------------------------------------------------

export function PreviewTempalteDailog({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={dialog.onFalse}
      >
        Templates Name Comes Here{' '}
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
          alignItems: 'center', // Center items horizontally
          justifyContent: 'center', // Center items vertically
          p: 2, // Optional: Add padding to the DialogContent
        }}
      >
        <Paper sx={{ m: 1.5 }}>
          <Box>
            <PreviewTemplateChatBox
              coverSrc="/assets/images/templateImage/template-image1.jpg"
              showImage
              text={
                <>
                  <span style={{ fontWeight: '600' }}>{` Hi {{1}}! 🎧🛒`} </span> <br /> <br />
                  {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                  <br /> <br />
                  {` Order Details:`}
                  <br />
                  {` Product: {{2}}`}
                  <br />
                  {`Quantity: {{3}}`}
                  <br />
                  {`Order ID: {{4}}`}
                  <br />
                  {`Delivery Address: {{5}}`}
                  <br />
                  {`Estimated Delivery Date: {{6}}`}
                </>
              }
              showLinks
              showVisit
              showCall
            />
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
}
