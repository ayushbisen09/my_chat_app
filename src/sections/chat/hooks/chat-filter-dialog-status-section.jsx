import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm } from 'react-hook-form';

import {
  Box,
  Radio,
  Tooltip,
  Typography,
  RadioGroup,
  useMediaQuery,
  FormControlLabel,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function StatusSection({ title, content, action, open, onClose, ...other }) {
  const theme = useTheme();

  const [optedIn, setOptedIn] = useState('yes');
  const [incomingBlocked, setIncomingBlocked] = useState('yes');
  const [readStatus, setReadStatus] = useState('yes');

  const handleOptedInChange = (event) => setOptedIn(event.target.value);
  const handleIncomingBlockedChange = (event) => setIncomingBlocked(event.target.value);
  const handleReadStatusChange = (event) => setReadStatus(event.target.value);

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });

  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { control } = methods;

  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <Box
        sx={{
          width: '100%',
          mb: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Opted In</Typography>

          <Tooltip title="Opted in for broadcast" arrow placement="top">
            <Iconify
              icon="material-symbols:info-outline"
              style={{ width: 20, height: 20, color: '#637381' }}
            />
          </Tooltip>
        </Box>

        <RadioGroup row value={optedIn} onChange={handleOptedInChange}>
          <FormControlLabel
            value="yes"
            control={<Radio size="small" />}
            label="Yes"
            sx={{ mr: 3 }}
          />

          <FormControlLabel value="no" control={<Radio size="small" />} label="No" sx={{ mr: 3 }} />

          <FormControlLabel
            value="all"
            control={<Radio size="small" />}
            label="All"
            sx={{ mr: 3 }}
          />
        </RadioGroup>
      </Box>

      <Box
        sx={{
          width: '100%',
          mb: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Incoming Blocked</Typography>

          <Tooltip title="User blocked due to spam/abusive behaviour" arrow placement="top">
            <Iconify
              icon="material-symbols:info-outline"
              style={{ width: 20, height: 20, color: '#637381' }}
            />
          </Tooltip>
        </Box>

        <RadioGroup row value={incomingBlocked} onChange={handleIncomingBlockedChange}>
          <FormControlLabel
            value="yes"
            control={<Radio size="small" />}
            label="Yes"
            sx={{ mr: 3 }}
          />

          <FormControlLabel value="no" control={<Radio size="small" />} label="No" sx={{ mr: 3 }} />

          <FormControlLabel
            value="all"
            control={<Radio size="small" />}
            label="All"
            sx={{ mr: 3 }}
          />
        </RadioGroup>
      </Box>

      <Box
        sx={{
          width: '100%',
          mb: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5} mb={1}>
          <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Read Status</Typography>

          <Tooltip title="User based on read and unread messages" arrow placement="top">
            <Iconify
              icon="material-symbols:info-outline"
              style={{ width: 20, height: 20, color: '#637381' }}
            />
          </Tooltip>
        </Box>

        <RadioGroup row value={readStatus} onChange={handleReadStatusChange}>
          <FormControlLabel
            value="read"
            control={<Radio size="small" />}
            label="Read"
            sx={{ mr: 3 }}
          />

          <FormControlLabel
            value="unread"
            control={<Radio size="small" />}
            label="Unread"
            sx={{ mr: 3 }}
          />

          <FormControlLabel
            value="all"
            control={<Radio size="small" />}
            label="All"
            sx={{ mr: 3 }}
          />
        </RadioGroup>
      </Box>
    </Box>
  );
}
