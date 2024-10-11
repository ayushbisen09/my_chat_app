import React, { useState } from 'react';

import { useTheme } from '@mui/material/styles'; // Corrected import

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Alert, Button, Divider, Tooltip, Checkbox, Snackbar } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

const flowNames = [
  'send_offer_message_on_whatsapp',
  'process_customer_inquiry',
  'schedule_appointment',
  'handle_product_return',
  'send_order_confirmation',
  // Add more flow names as needed
];

const secondaryNames = [
  'Rohit Sharma',
  'Virat Kohli',
  'Jasprit Bumrah',
  'Joe Root',
  'Kane Williamson',
  // Add more secondary names as needed
];

export function FlowBuilderTableRow({ row, selected, onSelectRow, flowIndex }) {
  const [flowToDelete, setFlowToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const theme = useTheme(); // Corrected theme import

  const getRandomDate = () => {
    const start = new Date(2024, 0, 1); // Start date (Jan 1, 2024)
    const end = new Date(); // Current date
    const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTimestamp);
  };

  const formatDate = (date) => {
    const optionsDate = { month: 'short', day: 'numeric', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return {
      date: new Intl.DateTimeFormat('en-US', optionsDate).format(date),
      time: new Intl.DateTimeFormat('en-US', optionsTime).format(date),
    };
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const randomDate = getRandomDate();
  const formattedDate = formatDate(randomDate);

  const confirm = useBoolean();
  const popover = usePopover();

  const handleDelete = () => {
    console.log(`Deleting flow: ${flowToDelete}`);
    confirm.onFalse();
    setSnackbarOpen(true); // Set Snackbar to open on delete
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>
      <TableCell width={592}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Flow name" arrow placement="top">
              <Box component="span">{flowNames[flowIndex % flowNames.length]}</Box>
            </Tooltip>
            <Tooltip title="Created by agent names." arrow placement="top">
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {secondaryNames[flowIndex % secondaryNames.length]}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={592}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Date when flow is created by agent" arrow placement="top">
              <Box component="span">{formattedDate.date}</Box>
            </Tooltip>
            <Tooltip title="Time when flow is created by agent" arrow placement="top">
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {formattedDate.time}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={592}>
        {row.status === 'active' ? (
          <Tooltip title="This flow is currently active" arrow placement="top">
            <Label variant="soft" color="success">
              {row.status}
            </Label>
          </Tooltip>
        ) : row.status === 'inactive' ? (
          <Tooltip title="This flow is currently inactive." arrow placement="top">
            <Label variant="soft" color="error">
              {row.status}
            </Label>
          </Tooltip>
        ) : (
          <Label variant="soft" color="success">
            {row.status}
          </Label>
        )}
      </TableCell>
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Actions" arrow placement="top">
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Click here to clone the flow" arrow placement="left">
            <MenuItem>
              <Iconify icon="solar:copy-bold" />
              Clone Flow
            </MenuItem>
          </Tooltip>
          <Tooltip title="Click here to edit the flow" arrow placement="left">
            <MenuItem>
              <Iconify icon="solar:pen-bold" />
              Edit Flow
            </MenuItem>
          </Tooltip>
          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="Click here to delete the flow" arrow placement="left">
            <MenuItem
              onClick={() => {
                setFlowToDelete(flowNames[flowIndex % flowNames.length]);
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete Flow
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={`Are you sure you want to delete the flow "${flowToDelete}"?`}
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
        }}
        
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          WhatsApp Number Added Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
