import { useTheme } from '@emotion/react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import ChooseTemplateDailogTable from '../template-dailog-table/template-dailog-table';

// ----------------------------------------------------------------------

export function ChooseTemaplte({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={{
        style: {
          width: '1000px', // Set the fixed width of the dialog
          maxWidth: '100%', // Ensure the dialog does not overflow
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: '700',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6">Template Messages</Typography>
          <Iconify
            onClick={onClose}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </div>
        <Typography variant="subtitle1" color="text.secondary" fontWeight="regular" sx={{ mt: 1 }}>
          Click-tracking-enabled templates will not be shown in this list
        </Typography>
      </DialogTitle>
      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ px: 2, pb: 2 }}>
        {' '}
        {/* Add padding here */}
        <ChooseTemplateDailogTable />
      </Box>
    </Dialog>
  );
}
