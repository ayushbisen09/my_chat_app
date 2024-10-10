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

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { EditQuickRepliesDialog } from '../../hook/edit-quick-replies-dialog';
import { PreviewQuickRepliesDialog } from '../../hook/preview-quick-replies-dialog';

export function QuickRepliesTableRow({ row, selected, onSelectRow, quickrepliesIndex }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const theme = useTheme(); // Corrected theme import
  const dialog = useBoolean();
  const previewDialog = useBoolean();


  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const confirm = useBoolean();
  const popover = usePopover();

  const handleDelete = () => {
    confirm.onFalse();
    setSnackbarOpen(true); // Set Snackbar to open on delete
  };

  const quickreplies = [
    '/Hello',
    '/Product Info',
    '/Return Policy',
    '/Speak to a Representative',
    '/Hey',
    // Add more flow names as needed
  ];

  const quickrepliescreatedby = [
    'Created by: Ayush Bisen',
    'Created by: Ankit Mandli',
    'Created by: Nikhil Patel',
    'Created by: Rajendra Jatav',
    'Created by: Sarthak Tiwari',
    // Add more flow names as needed
  ];

  const quickrepliesmessage = [
    '	Hello User this is Quick Reply.',
    'Hi, thanks for contacting us.',
    'Hi there! Welcome to Magnet Brains Soft. Tech. Let me know if you need help with anything.',
    'Your order is currently being processed. You’ll receive an update once it ships.',
    'For more information on this item, please visit the product page or let me know how I can help',
    // Add more flow names as needed
  ];

  const quickrepliestypes = [
    'Image',
    'Text',
    'Audio',
    'Video',
    'File',
    // Add more flow names as needed
  ];

 

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
            <Tooltip title="Qucik replies shortcut messages" arrow placement="top">
              <Box component="span">{quickreplies[quickrepliesIndex % quickreplies.length]}</Box>
            </Tooltip>
            <Tooltip title="Created by: Agent names." arrow placement="top">
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {quickrepliescreatedby[quickrepliesIndex % quickrepliescreatedby.length]}
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
            <Tooltip title="Message in the quick replies" arrow placement="top">
              <Box component="span">
                {quickrepliesmessage[quickrepliesIndex % quickrepliesmessage.length]}
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
            <Tooltip title="Quick replies message type" arrow placement="top">
              <Box component="span">
                {' '}
                {quickrepliestypes[quickrepliesIndex % quickrepliestypes.length]}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
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
          <Tooltip title="Click here to view the quick replies message" arrow placement="left">
            <MenuItem onClick={previewDialog.onTrue}>
              <Iconify icon="solar:eye-bold" />
              View
            </MenuItem>
          </Tooltip>
          <PreviewQuickRepliesDialog open={previewDialog.value} onClose={previewDialog.onFalse} />
          <Tooltip title="Click here to edit quick replies message" arrow placement="left">
            <MenuItem  onClick={dialog.onTrue}>
             
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>
            <EditQuickRepliesDialog open={dialog.value} onClose={dialog.onFalse} />
          </Tooltip>
          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="Click here to delete quick replies message" arrow placement="left">
            <MenuItem
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={`Are you sure you want to delete quick replies `}
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
          Quick Replies Deleted Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
