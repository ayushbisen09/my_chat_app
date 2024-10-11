import { useTheme } from '@emotion/react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Tooltip, useMediaQuery } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function OrderTableToolbar({ filters, onResetPage, dateError }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const popover = usePopover();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [operator, setOperator] = useState('contains');
  const [filterValue, setFilterValue] = useState('');

  const whatsapp_status = ['Active', 'Inactive']; // Add your actual column names here
  const columns = ['Active', 'Inactive']; // Add your actual column names here

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleApplyFilter = () => {
    console.log('Applying filter:', { column: selectedColumn, operator, value: filterValue });
    filters.setState({ [selectedColumn.toLowerCase()]: filterValue });
    onResetPage();
    handleFilterClose();
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          flexGrow={1}
          sx={{ pr: '12px', width: 1 }}
        >
        <Tooltip title="Search any contacts by WhatsApp number." arrow placement="top">

          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Search contacts WhatsApp number..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
          </Tooltip>

          {/* <Button
            size="large"
            variant=""
            startIcon={<Iconify icon="mdi:filter" />}
            onClick={handleFilterClick}
          >
            Filters
          </Button> */}
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
              xs: '300px', // 100% width on extra-small screens
              sm: '100%', // 100% width on small screens
              md: 800, // 800px width on medium screens and above
            },
            display: 'flex',
            flexDirection: {
              xs: 'column', // column direction on extra-small screens
              sm: 'column', // column direction on small screens
              md: 'row', // row direction on medium screens and above
            },
            gap: 2,
          }}
        >
          <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
            {/* <InputLabel>Whatsapp number Status</InputLabel> */}
            <TextField
              id="select-currency-label-x"
              variant="outlined"
              select
              fullWidth
              label="Whatsapp number Status"
            />
             
          </FormControl>

          <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
            <TextField
              id="select-currency-label-x"
              variant="outlined"
              select
              fullWidth
              label="Operator"
            >
              {columns.map((column) => (
                <MenuItem key={column} value={column}>
                  {column}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl fullWidth sx={{ mb: { xs: 2, sm: 2, md: 0 } }}>
            <TextField
              id="select-currency-label-x"
              variant="outlined"
              select
              fullWidth
              label="Status"
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
