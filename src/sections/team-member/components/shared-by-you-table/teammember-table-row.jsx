import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Tooltip, Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export function SharedByYouTeammemberTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  teammemberIndex,
}) {
  const confirm = useBoolean();
  const popover = usePopover();

  const teammemberemail = [
    'ayush.bisen@pabbly.com',
    'ankit.madli@pabbly.com',
    'nikhil.patel@pabbly.com',
    'rajendra.jatav@pabbly.com',
    'anand.nayak@pabbly.com',
    'ayush.bisen@pabbly.com',
    'ayush.bisen@pabbly.com',
    // Add more flow names as needed
  ];

  const sharedondateandtime = [
    'Jan 19, 2024 08:23:31',
    'Jan 10, 2024 01:23:02',
    'Nov 25, 2023 05:27:02',
    'Nov 11, 2024 22:27:02',
    'Aug 14, 2023 11:27:02',
    'Aug 18, 2023 11:52:02',

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
      <TableCell width={700}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title={`Team member email: ${teammemberemail[teammemberIndex % teammemberemail.length]}`}
              arrow
              placement="top"
            >
              <Box component="span">
                {teammemberemail[teammemberIndex % teammemberemail.length]}
              </Box>
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
            <Tooltip
              title={`Whatsapp number shared with this ${teammemberemail[teammemberIndex % teammemberemail.length]}`}
              arrow
              placement="top"
            >
              <Box component="span"> +91 7489077458</Box>
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
            <Tooltip
              title={` Whatsapp number Shared On: ${sharedondateandtime[teammemberIndex % sharedondateandtime.length]} (UTC+05:30) Asia/Kolkata`}
              arrow
              placement="top"
            >
              <Box component="span">
                {sharedondateandtime[teammemberIndex % sharedondateandtime.length]}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align="right">
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
          <Tooltip
            title={`Click here to remove this ${teammemberemail[teammemberIndex % teammemberemail.length]} team member`}
            arrow
            placement="top"
          >
            <MenuItem
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Remove Access
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Remove"
        content={`Are you sure want to remove this team member ${teammemberemail[teammemberIndex % teammemberemail.length]} ?`}
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
