import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Divider, Tooltip,Checkbox } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { ConfirmDialog } from '../custom-dialog';

export function OrderTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();

  const popover = usePopover();

  const renderRow = (label, color) => (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>
      <TableCell width={500}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Status of the template" arrow placement="top">
            <Label
              variant="soft"
              color={
                (row.status === 'approved' && 'success') ||
                (row.status === 'pending' && 'warning') ||
                (row.status === 'draft' && 'info') ||
                (row.status === 'rejected' && 'error') ||
                (row.status === 'pending' && 'warning') ||
                (row.status === 'deleted' && 'default') ||
                'success'
              }
            >
              {row.status}
            </Label>
            </Tooltip>
            <Tooltip title="Date and Time when template is created " arrow placement="top">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              Apr 08, 2024 06:46:43
            </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={600}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Name of the template" arrow placement="top">
            <Box component="span">send_offer_message_on_whatsapp</Box>
            </Tooltip>
            <Tooltip title="Type of the template " arrow placement="top">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              Image
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
            <Tooltip title="This template of Marketing Category" arrow placement="top">
            <Box component="span">Marketing</Box>
            </Tooltip>
            {/* <Box component="span" sx={{ color: 'text.disabled' }}>
              Allowed
            </Box> */}
          </Stack>
        </Stack>
      </TableCell>

      {/* TableCell for the Label */}
      <TableCell width={110}>
      <Tooltip title="This is the Response on the template" arrow placement="top">
        <Label color={color} variant="soft">
          {label}
        </Label>
        </Tooltip>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderRow('Good', 'success')}
      {renderRow('Bad', 'error')}
      {renderRow('Poor', 'warning')}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
        <Tooltip title="Click here to duplicate the this template" arrow placement="left">
          <MenuItem sx={{ color: '' }}>
            <Iconify icon="solar:copy-bold" />
            Duplicate Template
          </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="Click here to remove this template" arrow placement="left">
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Remove
          </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Remove"
        content="Are you sure want to remove this template? (Removed template will go to deleted section)"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Remove
          </Button>
        }
      />
    </>
  );
}
