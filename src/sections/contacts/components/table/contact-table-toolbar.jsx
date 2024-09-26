import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { Tooltip, Typography, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function OrderTableToolbar({ filters, onResetPage, dateError }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const confirm = useBoolean();

  const popover = usePopover();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const [importingStatus, setImportingStatus] = useState('');
  const [incomingStatus, setIncomingStatus] = useState('');
  const [hoursStatus, setHoursStatus] = useState('');

  const whatsapp_status = ['Imported Manually', 'Imported via API']; // Add your actual column names here
  const columns = ['Active', 'Inactive']; // Add your actual column names here

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
          <Tooltip title="Click here to search any contact." arrow placement="top">
            <TextField
              sx={{ mr: '5px' }}
              fullWidth
              value={filters.state.name}
              onChange={handleFilterName}
              placeholder="Search contacts by Mobile number or Name..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
          <Tooltip title="Click here to filter the contacts." arrow placement="top">
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
          <Tooltip title="Click here to see more options." arrow placement="top">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip
            title="Click here to export all contacts as CSV to your mail."
            arrow
            placement="top"
          >
            <MenuItem
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'primary' }}
            >
              <Iconify icon="line-md:uploading-loop" />
              Export
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>
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
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Importing State</Typography>
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
              id="importing-status"
              variant="outlined"
              select
              fullWidth
              label="Importing Status"
              value={importingStatus}
              onChange={(e) => setImportingStatus(e.target.value)}
            >
              {whatsapp_status.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
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
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>Incoming Status</Typography>
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
              id="incoming-status"
              variant="outlined"
              select
              fullWidth
              label="Status"
              value={incomingStatus}
              onChange={(e) => setIncomingStatus(e.target.value)}
            >
              {columns.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>
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
            <Typography sx={{ fontSize: '16px', fontWeight: '600' }}>24 Hours Status</Typography>
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
              id="hours-status"
              variant="outlined"
              select
              fullWidth
              label="Status"
              value={hoursStatus}
              onChange={(e) => setHoursStatus(e.target.value)}
            >
              {columns.map((column) => (
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