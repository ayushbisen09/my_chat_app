import { useCallback } from 'react';
import { useTheme } from '@emotion/react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Tooltip, useMediaQuery } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function TagTableToolbar({ filters, onResetPage }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  return (
    <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <Tooltip title="Click here to Search tag by name" arrow placement="top">
            <TextField
              sx={{ mr: '5px' }}
              fullWidth
              value={filters.state.name}
              onChange={handleFilterName}
              placeholder="Search by tag name..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
        </Stack>
      </Stack>
  );
}
