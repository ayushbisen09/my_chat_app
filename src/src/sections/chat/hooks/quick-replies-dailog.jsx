import { useRef, useState } from 'react';
import { useTheme } from '@emotion/react';

import {
  Box,
  Dialog,
  Divider,
  Tooltip,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  InputAdornment
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export function QuickRepliesDialog({ title, content, action, open, onClose, ...other }) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();

  const QuickReplies = [
    { text: 'Hello', type: '(Text)', helpText: 'Hello User this is canned message.' },
    { text: 'Hi', type: '(Image)', helpText: 'Hi, thanks for contacting us.' },
    { text: 'Purchase', type: '(Text)', helpText: 'Do you want to purchase the product?' },
    { text: 'Support', type: '(Video)', helpText: 'Do you want support for the product?' },
    { text: 'Screenshot', type: '(File)', helpText: 'Can you share the screenshot of the issue of your webpage.' },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleReplyClick = (text) => {
    setSearchTerm(text);
  };

  const filteredReplies = QuickReplies.filter(reply =>
    reply.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px', backgroundColor: theme.palette.background.paper } } : { style: { minWidth: '330px', backgroundColor: theme.palette.background.paper } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={dialog.onFalse}
      >
        Quick Replies{' '}
        <Iconify
          onClick={onClose}
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        />
      </DialogTitle>
      <Divider sx={{ mb: '16px', borderStyle: 'dashed' }} />

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box
          sx={{
            pb: 2,
            zIndex: 5,
          }}
        >
            <Tooltip title="Search quick replies here ." arrow placement="right">
          <TextField
            sx={{ p: 0.75 }}
            fullWidth
            size="large"
            placeholder="Search Quick Replies..."
            value={searchTerm}
            onChange={handleSearchChange}
            inputRef={searchInputRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" width={24} height={24} />
                </InputAdornment>
              ),
            }}
          />
          </Tooltip>
          
          <Box sx={{ mb: 1 }}>
            {filteredReplies.map((reply, index) => (
              <Box
                key={index}
                sx={{ px: 1.5, pb: 1, pt: 1, cursor: 'pointer' }}
                onClick={() => handleReplyClick(reply.text)}
              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  {reply.text}{' '}
                  <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                    {reply.type}
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {reply.helpText}
                </Typography>
              </Box>
            ))}
            {filteredReplies.length === 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                No Quick Replies found.
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
