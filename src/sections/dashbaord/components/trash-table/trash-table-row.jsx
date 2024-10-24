import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, Tooltip, Divider, Checkbox } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { MoveToFolderPopover } from '../../hooks/move_folder-dailog';

// import { ShareWhatsApp numberPopover } from '../../hooks/table-hook-components/share-WhatsApp number-popover';
// import { RenameWhatsApp numberDialog } from '../../hooks/table-hook-components/rename_WhatsApp number-dailog';

export function TrashTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
  dashboardTableIndex,
}) {
  const confirm = useBoolean();
  const confirmDelete = useBoolean();
  const confirmShare = useBoolean();
  const [moveToFolderPopoverOpen, setMoveToFolderPopoverOpen] = useState(false);

  const [renameDialogOpen, setRenameDialogOpen] = useState(false);

  const collapse = useBoolean();
  const popover = usePopover();

  const [showToken, setShowToken] = useState(false);

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
  };

  const WhatsAppnumbers = [
    '+91 98765 43210',
    '+91 91234 56789',
    '+91 99887 65432',
    '+91 93456 78901',
    '+91 97654 32109',
    // Add more flow names as needed
  ];
  const phonenumberID = [
    '654532354351213',
    '542546584351354',
    '575454548454545',
    '345564764354545',
    '117563543435334',
    // Add more flow names as needed
  ];

  const weebhookURL = [
    'https://chatflow.pabbly.com/65e80c31e88b/5b654444',
    'https://chatflow.pabbly.com/65e80c31e88b/5dxzk545',
    'https://chatflow.pabbly.com/65e80c31e88b/5b665453',
    'https://chatflow.pabbly.com/65e80c31e88b/5b624242',
    'https://chatflow.pabbly.com/65e80c31e88b/5b653435',
    // Add more flow names as needed
  ];

  const renderPrimary = (
    <TableRow hover selected={selected}>

<TableCell padding="checkbox">
        <Tooltip title="Select this WhataApp number" arrow placement="top">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip>
      </TableCell>
      <TableCell width={110}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title={`WhatsApp number is ${row.status}`} placement="top" arrow>
              <Label variant="soft" color= 'error'>
                Inactive
              </Label>
            </Tooltip>
            <Tooltip
              title="WhatsApp number Created: Aug 13, 2024 14:40:03, (UTC+00:00) America/Danmarkshavn"
              placement="bottom"
              arrow
            >
              <Box
                sx={{
                  width: 145,
                  whiteSpace: 'nowrap',
                  color: 'text.disabled',
                }}
                component="span"
              >
                Aug 13, 2024 14:40:03
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={200}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title={` This  WhatsApp number: " ${WhatsAppnumbers[dashboardTableIndex % WhatsAppnumbers.length]}" you have added`}
              arrow
              placement="top"
            >
              <Box component="span">
                {WhatsAppnumbers[dashboardTableIndex % WhatsAppnumbers.length]}
              </Box>
            </Tooltip>
            <Tooltip
              title={` Phone number ID of your WhatsApp Number ${phonenumberID[dashboardTableIndex % phonenumberID.length]}`}
              arrow
              placement="top"
            >
              <Box
                component="span"
                sx={{
                  color: 'text.disabled',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '180px', // Adjust the maxWidth to your desired value
                  display: 'inline-block',
                }}
              >
                Phone No ID: {phonenumberID[dashboardTableIndex % phonenumberID.length]}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={400}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip
              title={`Webhook URL for incoming messages of your WhatsApp Number is: ${weebhookURL[dashboardTableIndex % weebhookURL.length]}`}
              arrow
              placement="top"
            >
              <Box
                component="span"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '350px', // Adjust the maxWidth to your desired value
                  display: 'inline-block',
                }}
              >
                {weebhookURL[dashboardTableIndex % weebhookURL.length]}
              </Box>
            </Tooltip>
            <Tooltip
              title='WhatsApp Business Account ID of your WhatsApp Number is "117359445455733".'
              arrow
              placement="top"
            >
              <Box
                component="span"
                sx={{
                  color: 'text.disabled',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '330px', // Adjust the maxWidth to your desired value
                  display: 'inline-block',
                }}
              >
                WhatsApp Business Account ID: 117359445455733
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={140} align="right">
        <Tooltip title="Access Inbox" arrow placement="top">
          <Button
            size="small"
            variant="outlined"
            color="primary"
            sx={{
              lineHeight: { lg: '14px', md: '14px', xs: '14px' },
              height: { lg: '40px', md: '40px', xs: '40px' }, // Default height
            }}
            disabled='inactive' // Disable the button if status is 'inactive'
          >
            Access Inbox
          </Button>
        </Tooltip>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Click to see more details." arrow placement="top">
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
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <ListItemText
                primary={`Verification Token: ${showToken ? '4545656565' : '●●●●●●●●●'}`}
                primaryTypographyProps={{ typography: 'body2' }}
              />
              <IconButton onClick={handleToggleToken}>
                <Iconify icon={showToken ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <ListItemText
                primary="Privacy Policy URL: https://www.pabbly.com/privacy-policy/"
                primaryTypographyProps={{ typography: 'body2' }}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <ListItemText
                primary="Terms of Service URL: https://www.pabbly.com/terms-conditions/"
                primaryTypographyProps={{ typography: 'body2' }}
              />
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
        <Tooltip title="Move to existing folder." arrow placement="left">
          <MenuItem
            onClick={() => {
              setMoveToFolderPopoverOpen(true); // Open the Move To Folder dialog
              popover.onClose();
            }}
            sx={{ color: 'secondary' }}
          >
            <Iconify icon="fluent:folder-move-16-filled" />
            Move To Folder
          </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="This will delete the WhatsApp number." arrow placement="left">
            <MenuItem
              onClick={() => {
                confirmDelete.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete Permanently
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Delete"
        content="WhatsApp number once deleted will be permanently deleted."
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
      <MoveToFolderPopover
        open={moveToFolderPopoverOpen}
        onClose={() => setMoveToFolderPopoverOpen(false)}
      />
     
    </>
  );
}
