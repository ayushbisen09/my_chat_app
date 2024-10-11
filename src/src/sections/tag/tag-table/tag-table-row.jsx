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

import { EditTagDialog } from '../hook/edit-tag-dialog';
import { PreviewTagDialog } from '../hook/preview-tag-dialog';

// import { EditQuickRepliesDialog } from '../../hook/edit-quick-replies-dialog';
// import { PreviewQuickRepliesDialog } from '../../hook/preview-quick-replies-dialog';

export function TagTableRow({ row, selected, onSelectRow, tagIndex }) {
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

  const tagname = [
    'Purchase',
    'Pabbly Connect',
    'Employee',
    'Pabbly Subscription Billing',
    'Pabbly Form Builder',
    'Support',
    'Sales',
    // Add more flow names as needed
  ];

  const tagassignwhen = [
    'Want to purchase',
    'Want to purchase Pabbly Connect',
    'Do you want to join as an employee',
    '	Want to purchase Pabbly Subscription Billing',
    '	Want to purchase Pabbly Form Builder',
    'I need support',
    'Manage sales data',
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
            <Tooltip title= {` Tag name: " ${tagname[tagIndex % tagname.length]}" `}  arrow placement="top">
              <Box component="span">{tagname[tagIndex % tagname.length]}</Box>
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
            <Tooltip title= {`${tagname[tagIndex % tagname.length]} tag assign to user when this message "${tagassignwhen[tagIndex % tagassignwhen.length]}" is entered`} arrow placement="top">
              <Box component="span">{tagassignwhen[tagIndex % tagassignwhen.length]}</Box>
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
            <Tooltip title="Date when access shared by you" arrow placement="top">
              <Box component="span">Jan 19, 2024</Box>
            </Tooltip>
            <Tooltip title="Time when access shared by you" arrow placement="top">
              <Box component="span" sx={{ color: 'text.disabled' }}>
                08:23:313
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
          <Tooltip title= {`Click here to view the this ${tagname[tagIndex % tagname.length]} tag?`} arrow placement="left">
            <MenuItem onClick={previewDialog.onTrue}>
              <Iconify icon="solar:eye-bold" />
              View
            </MenuItem>
          </Tooltip>
          <PreviewTagDialog open={previewDialog.value} onClose={previewDialog.onFalse} />
          <Tooltip title={`Click here to edit this ${tagname[tagIndex % tagname.length]} tag?`} arrow placement="left">
            <MenuItem onClick={dialog.onTrue}>
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>
            <EditTagDialog open={dialog.value} onClose={dialog.onFalse} />
          </Tooltip>
          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title= {`click here to delete this ${tagname[tagIndex % tagname.length]} tag?`} arrow placement="left">
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
        content={`Are you sure you want to delete the ${tagname[tagIndex % tagname.length]} tag?`}
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
        anchorOrigin={{ vertical: 'buttom', horizontal: 'right' }}
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
          {tagname[tagIndex % tagname.length]} tag Deleted Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
