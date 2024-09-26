import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Tooltip,Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';


const tagname = [
  'Purchase',
  'Pabbly Connect',
  'Employee',
  'Pabbly Subscription Billing',
  'Pabbly Form Builder',
  'Support',
  'Sales'
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

export function TagTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
  tagIndex
}) {
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();

  const [setShowToken] = useState(false);

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
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
      <TableCell width={700}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Tag name" arrow placement="top">
            <Box component="span">{tagname[tagIndex % tagname.length]}</Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={700}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Tag Assign when" arrow placement="top">
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
            <Box component="span">Jan 19, 2024</Box></Tooltip>
            <Tooltip title="Time when access shared by you" arrow placement="top">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              08:23:313
            </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
      
        <Tooltip title="Action" arrow placement="top">
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
        <Tooltip title="Click here to remove team member" arrow placement="left">
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
        content="Are you sure want to remove?"
        action={
          <Tooltip title="Click here to remove team member" arrow placement="bottom">
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Remove
          </Button>
          </Tooltip>
        }
      />
    </>
  );
}
