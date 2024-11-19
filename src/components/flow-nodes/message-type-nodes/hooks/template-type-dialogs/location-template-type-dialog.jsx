import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Button,
  Divider,
  Tooltip,
  TextField,
  Typography,
  DialogActions,
  DialogContent,
  InputAdornment,
} from '@mui/material';

import { setTemplateFormatInputText } from 'src/redux/slices/carouselslice';

import { Iconify } from 'src/components/iconify';

import { CarouselAlign } from 'src/sections/templates/hook/carousel-align';

export function LocationTemplateTypeDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleCancel = () => {
    onClose(); // Close the dialog without making changes
  };

  const templateFormatInputText = useSelector((state) => state.template.templateFormatInputText);
  const handleTemplateFormatInputChange = (event) => {
    dispatch(setTemplateFormatInputText(event.target.value));
  };

  const handleKeyPress = (e) => {
    // Optional: you can handle some other key-specific behavior if required
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      {...other}
      PaperProps={{
        style: {
          width: '1000px',
          maxWidth: '100%',
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
          <Typography variant="h6">Image Template Messages</Typography>
          <Iconify
            onClick={handleCancel}
            icon="uil:times"
            style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
          />
        </div>
        <Typography variant="subtitle1" color="text.secondary" fontWeight="regular" sx={{ mt: 1 }}>
          Click-tracking-enabled templates will not be shown in this list
        </Typography>
      </DialogTitle>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <DialogContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ pr: 2, py: 2, width: '60%' }}>
            <>
              <TextField
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label="Card 1 Body"
                helperText="You're allowed a maximum of 160 characters."
              />

              <TextField
                sx={{ mt: 3 }}
                fullWidth
                type="text"
                margin="dense"
                multiline
                rows={4}
                variant="outlined"
                label="Template Format"
                helperText="Use text formatting - *bold*, _italic_, ~strikethrough~. For example - Hello {{1}}, your code will expire in {{2}} mins. You're allowed a maximum of 1024 characters."
                value={templateFormatInputText}
                onChange={handleTemplateFormatInputChange}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                        arrow
                        placement="top"
                        sx={{
                          fontSize: '16px',
                        }}
                      >
                        <Iconify
                          icon="material-symbols:info-outline"
                          style={{ width: 20, height: 20 }}
                        />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          </Box>
          <Box sx={{ py: 2, pl: 2 }}>
            <CarouselAlign />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="primary" variant="contained">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
