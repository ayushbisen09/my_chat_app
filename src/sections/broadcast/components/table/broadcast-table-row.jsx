import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Divider, Tooltip, Checkbox, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { ConfirmDialog } from '../../hook/confirm-dialog';

const templatename = [
  'Classic Layout',
  'Creative Portfolio',
  'Elegant Presentation',
  'Professional Report',
  'Educational Content',
  // Add more flow names as needed
];

const templatetype = [
  'Manual Broadcast',
  'API Broadcast',
  'Scheduled Broadcast',
  'Instant Broadcast',
  // Add more flow names as needed
];

const broadcastname = [
  'Weekly Digest',
  'Special Announcement',
  'Product Launch',
  'Seasonal Campaign',
  'New Feature Alert'
  // Add more flow names as needed
];


export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow ,broadcastIndex}) {
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Broadcast name " arrow placement="top">
            <Box component="span">{broadcastname[broadcastIndex % broadcastname.length]}</Box>
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
             <Tooltip title="Template name " arrow placement="top">
            <Box component="span">{templatename[broadcastIndex % templatename.length]}</Box>
            </Tooltip>
            <Tooltip title="Template type " arrow placement="top">

            <Box component="span" sx={{ color: 'text.disabled' }}>
            {templatetype[broadcastIndex % templatetype.length]}
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
          ><Tooltip title="Date when broadcast is created " arrow placement="top">
            <Box component="span">Jan 19, 2024</Box>
            </Tooltip>
            <Tooltip title="Time when broadcast is created" arrow placement="top">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              08:23:31
            </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

   
      <TableCell width={110}>
  {row.status === 'live' ? (
    <Tooltip title="This broadcast is live " arrow placement="top">
      <Label variant="soft" color="success">
        {row.status}
      </Label>
    </Tooltip>
  ) : row.status === 'sent' ? (
    <Tooltip title="This broadcast is sent" arrow placement="top">
      <Label variant="soft" color="warning">
        {row.status}
      </Label>
    </Tooltip>
  ) : row.status === 'scheduled' ? (
    <Tooltip title="This broadcast is scheduled" arrow placement="top">
      <Label variant="soft" color="info">
        {row.status}
      </Label>
    </Tooltip>
  ) : (
    <Label variant="soft" color="default">
      {row.status}
    </Label>
  )}
</TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
      <Tooltip title="Click here to see reciver list and stats" arrow placement="top">
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>
        </Tooltip>

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            <Stack>
              <Box sx={{ p: '12px 24px 12px 24px' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Receivers List
                </Typography>
                <Tooltip title="Included reciever list" arrow placement="left">
                <Typography sx={{ mb: '2px' }} fontSize="14px" color="text.secondary">
                  <Box component="span" fontWeight="medium" color="text.primary">
                    Included:
                  </Box>{' '}
                  Pabbly Connect List, Pabbly Subscription Billing, Pabbly Support.
                </Typography>
                </Tooltip>
                <Tooltip title="Excluded reciever list" arrow placement="left">
                <Typography fontSize="14px" color="text.secondary">
                  <Box component="span" fontWeight="medium" color="text.primary">
                    Excluded:
                  </Box>{' '}
                  Pabbly Email Marketing, Pabbly Form Builder.
                </Typography>
                </Tooltip>
              </Box>
              <Divider />
              <Tooltip title="Broadcast stats" arrow placement="left">
              <Box sx={{ p: '12px 24px 12px 24px' }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Stats
                </Typography>
                <Stack spacing={0.5}>
                  {' '}
                  {/* 0.5 * 8px = 4px gap, adjust to 2px using 0.25 */}
                  {[
                    { label: 'Sent', value: '700 (20%)' },
                    { label: 'Delivered', value: '565 (45%)' },
                    { label: 'Read', value: '565 (45%)' },
                    { label: 'Clicked', value: '122 (04%)' },
                    { label: 'Replied', value: '122 (04%)' },
                    { label: 'Replied', value: '700 (20%)' },
                  ].map((item, index) => (
                    <Typography key={index} fontSize="14px" color="text.primary">
                      {item.label}:{' '}
                      <Box component="span" color="text.secondary">
                        {item.value}
                      </Box>
                    </Typography>
                  ))}
                </Stack>
              </Box>
              </Tooltip>
              {/* <Box sx={{ p: '6px 24px 24px 24px' }}>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
                    Add to Existing list
                  </Button>
                  <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
                    Add to New list
                  </Button>
                </Stack>
              </Box> */}
            </Stack>
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          
        {/* <Tooltip title="Click here to edit broadcast" arrow placement="left">
          <MenuItem sx={{ color: '' }}>
            <Iconify icon="solar:pen-bold" />
            Edit Broadcast
          </MenuItem>
          </Tooltip> */}

          {/* <Divider style={{ borderStyle: 'dashed' }} /> */}
          <Tooltip title="Click here to detele the broadcast" arrow placement="left">
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
        content="Are you sure want to remove this Broadcast?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
