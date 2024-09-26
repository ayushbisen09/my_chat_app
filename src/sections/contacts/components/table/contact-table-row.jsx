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
import { Divider, Tooltip, Checkbox , Typography} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { ManageTagsDialog } from '../../hook/manage-tags-dialog';
import { BlockandOptDialog } from '../../hook/block-&-opt-dialog';
import { EditContactDialog } from '../../hook/edit-contact-dialog';
import { DeleteContactDialog } from '../../hook/delete-contact-dialog';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const confirmDelete = useBoolean();
 
  const collapse = useBoolean();
  const popover = usePopover();
  const [manageTagsDialogOpen, setManageTagsDialogOpen] = useState(false);
  const [blockAndOptDialogOpen, setBlockAndOptDialogOpen] = useState(false);
  const [editContactDialogOpen, setEditContactDialogOpen] = useState(false);
  const [deleteContactDialogOpen, setDeleteContactDialogOpen] = useState(false);
  const confirmStatus = useBoolean();
  const [statusToToggle, setStatusToToggle] = useState('');
  
  const handleStatusToggle = (newStatus) => {
    setStatusToToggle(newStatus);
    confirmStatus.onTrue();
  };

  const handleManageTagsClick = () => {
    setManageTagsDialogOpen(true);
    popover.onClose(); // Close the popover when dialog is opened
  };

  const handleDeleteContactClick = () => {
    setDeleteContactDialogOpen(true);
    popover.onClose(); // Close the popover when dialog is opened
  };
 
  const handleEditContactClick = () => {
    setEditContactDialogOpen(true);
    popover.onClose(); // Close the popover when dialog is opened
  };


  const handleBlockAndOptClick = () => {
    setBlockAndOptDialogOpen(true);
    popover.onClose(); // Close the popover when dialog is opened
  };

  const handleManageTagsDialogClose = () => {
    setManageTagsDialogOpen(false);
  };

  const handleEditContactDialogClose = () => {
    setEditContactDialogOpen(false);  // Fix: set the correct state
  };
  

  const handleBlockAndOptDialogClose = () => {
    setBlockAndOptDialogOpen(false);
  };
  const handleDeleteContactDialogClose = () => {
    setDeleteContactDialogOpen(false);
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Tooltip title="Select this contact" arrow placement="top">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip>
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
            {row.status === 'opted-in' ? (
              <Tooltip title="This Contact status is currently Opted-In." arrow placement="top">
                <Label variant="soft" color="success">
                  {row.status}
                </Label>
              </Tooltip>
            ) : row.status === 'opted-out' ? (
              <Tooltip title="This Contact status is currently Opted-Out." arrow placement="top">
                <Label variant="soft" color="error">
                  {row.status}
                </Label>
              </Tooltip>
            ) : (
              <Label variant="soft" color="success">
                {row.status}
              </Label>
            )}
            <Tooltip title="Date & Time of the contact created at." arrow placement="top">
              <Box component="span" sx={{ color: 'text.disabled' }}>
                Apr 08, 2024 06:46 AM
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
            <Tooltip title="WhatsApp number of the contact." arrow placement="top">
              <Box component="span">+91 9234567890</Box>
            </Tooltip>

            <Tooltip title="Name of the contact." arrow placement="top">
              <Box component="span" sx={{ color: 'text.disabled' }}>
                Sophia kumar Patel
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
            <Tooltip title="Contact is imported or added manually." arrow placement="top">
              <Box component="span">Imported Manually</Box>
            </Tooltip>

            <Tooltip
              title="Currently the incoming from this contact is allowed."
              arrow
              placement="top"
            >
              <Box component="span" sx={{ color: 'text.disabled' }}>
                Allowed
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={110}>
        <Stack
          sx={{
            typography: 'body2',
            flex: '1 1 auto',
            alignItems: 'flex-start',
          }}
        >
          <Tooltip title="24 Hours status of this contact is Active." arrow placement="top">
            <Label color="success" variant="soft">
              Active
            </Label>
          </Tooltip>
          <Tooltip title="Date & Time of contact last active." arrow placement="top">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              Apr 08, 2024 06:46 AM
            </Box>
          </Tooltip>
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Click here to see more information." arrow placement="top">
          <IconButton
            color={collapse.value ? 'inherit' : 'default'}
            onClick={collapse.onToggle}
            sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
          >
            <Iconify icon="eva:arrow-ios-downward-fill" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Click here to see options." arrow placement="top">
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Tooltip>
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
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <Tooltip
                title="User Attribute and its selected value for this contact."
                arrow
                placement="top"
              >
                <Box width="fit-content">
                  <ListItemText
                    primary="User Attribute - Value"
                    primaryTypographyProps={{ typography: 'body2' }}
                  />
                </Box>
              </Tooltip>

              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title="User Attribute - city & Value - Bhopal." arrow placement="top">
                  <Typography
                    fontSize="14px"
                    component="span"
                    color="text.disabled"
                    sx={{
                      mt: 0.5,
                      whiteSpace: ',',
                      mr: '5px',
                      // Negative margin to remove any gap
                    }}
                  >
                    city-Bhopal
                  </Typography>
                </Tooltip>

                <Typography
                  fontSize="14px"
                  component="span"
                  color="text.disabled"
                  sx={{
                    mt: 0.5,
                    whiteSpace: ',',
                    mr: '5px',
                    // Negative margin to remove any gap
                  }}
                >
                  ,
                </Typography>
                <Tooltip
                  title="User Attribute - email & Value - abc@gmail.com."
                  arrow
                  placement="top"
                >
                  <Typography
                    fontSize="14px"
                    component="span"
                    color="text.disabled"
                    sx={{
                      mt: 0.5,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    email-abc@gmail.com
                  </Typography>
                </Tooltip>
              </Box>
            </Stack>

            <Stack
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <Tooltip title="Tags given to this contact." arrow placement="top">
                <Box width="fit-content">
                  <ListItemText primary="Tags" primaryTypographyProps={{ typography: 'body2' }} />
                </Box>
              </Tooltip>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title="Purchase." arrow placement="top">
                  <Typography
                    fontSize="14px"
                    component="span"
                    color="text.disabled"
                    sx={{
                      mt: 0.5,
                      whiteSpace: ',',
                      mr: '5px',
                      // Negative margin to remove any gap
                    }}
                  >
                    Purchase
                  </Typography>
                </Tooltip>

                <Typography
                  fontSize="14px"
                  component="span"
                  color="text.disabled"
                  sx={{
                    mt: 0.5,
                    whiteSpace: ',',
                    mr: '5px',
                    // Negative margin to remove any gap
                  }}
                >
                  ,
                </Typography>
                <Tooltip title="Pabbly Connect." arrow placement="top">
                  <Typography
                    fontSize="14px"
                    component="span"
                    color="text.disabled"
                    sx={{
                      mt: 0.5,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Pabbly Connect
                  </Typography>
                </Tooltip>
              </Box>
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
          <Tooltip title="Click here to manage tags for this contact." arrow placement="left">
            <MenuItem onClick={handleManageTagsClick}>
              <Iconify icon="solar:bill-list-bold" />
              Manage Tags
            </MenuItem>
          </Tooltip>
          <Tooltip title="Click here to block and Opt for this contact." arrow placement="left">
            <MenuItem onClick={handleBlockAndOptClick}>
              <Iconify icon="solar:user-block-bold" />
              Block & Opt
            </MenuItem>
          </Tooltip>
          <Tooltip title="Click here to edit this contact." arrow placement="left">
            <MenuItem onClick={handleEditContactClick}>
              <Iconify icon="solar:pen-bold" />
              Edit Contact
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="Click here to delete this contact." arrow placement="left">
            <MenuItem
            onClick={handleDeleteContactClick}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>
      

      <ManageTagsDialog open={manageTagsDialogOpen} onClose={handleManageTagsDialogClose} />
      <BlockandOptDialog open={blockAndOptDialogOpen} onClose={handleBlockAndOptDialogClose} />
      <EditContactDialog open={editContactDialogOpen} onClose={handleEditContactDialogClose} />
      <DeleteContactDialog open={deleteContactDialogOpen} onClose={handleDeleteContactDialogClose} />
    </>
  );
}
