import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { Tooltip, Typography, useMediaQuery } from '@mui/material';

import { Iconify } from 'src/components/iconify';


// ----------------------------------------------------------------------

export function QuickRepliesTableToolbar({ filters, onResetPage }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const type = ['Text', 'Image', 'Video', 'Audio', 'File']; // Add your actual column names here

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <Tooltip title="Click here to Search quick replies by name" arrow placement="top">
            <TextField
              sx={{ mr: '5px' }}
              fullWidth
              value={filters.state.name}
              onChange={handleFilterName}
              placeholder="Search quick replies by name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
          <Tooltip title="Click here to apply filters" arrow placement="top">
            <Button
              sx={{ ml: '5px' }}
              size="large"
              variant=""
              startIcon={<Iconify icon="mdi:filter" />}
              onClick={handleFilterClick}
            >
              Filters
            </Button>
          </Tooltip>
        </Stack>
      </Stack>

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          sx={{
            p: 2,
            width: {
              xs: '300px',
              sm: '100%',
              md: 800,
            },
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
            gap: 2,
          }}
        >
          <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 }, justifyContent: 'center' }}>
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}> Quick Replies Type</Typography>
          </FormControl>

          <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
            <TextField
              id="select-currency-label-x"
              variant="outlined"
              fullWidth
              label="Equals to"
              disabled
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
            <TextField
              id="Type"
              variant="outlined"
              select
              fullWidth
              label="Type"
              // value={incomingStatus}
              // onChange={(e) => setIncomingStatus(e.target.value)}
            >
              {type.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
      </Popover>
    </>
  );
}
