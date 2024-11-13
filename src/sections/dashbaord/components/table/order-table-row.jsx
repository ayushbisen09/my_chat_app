import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { Tooltip, Divider, Checkbox, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { MoveToFolderPopover } from '../../hooks/move_folder-dailog';

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, dashboardTableIndex }) {
  const confirmDelete = useBoolean();
  const confirmStatus = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();
  const [showToken, setShowToken] = useState(false);
  const [statusToToggle, setStatusToToggle] = useState('');

  const [moveToFolderPopoverOpen, setMoveToFolderPopoverOpen] = useState(false);

  const confirm = useBoolean(); // Assuming you have a useBoolean hook for handling confirmation

  const handleToggleToken = () => {
    setShowToken((prev) => !prev);
  };
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };

  const token =
    '4545656565slfkvdkxvzck44554z65X4c65xz4v6zx4vxzv65xz4v64z35v4zZFzsgfsdgsvzxvdf45645s4cfdsgvjhxlcfOIaPDJSIGJFDGPIDS5464646465468464';

  // Truncate token to 100 characters
  const truncatedToken = truncateText(token, 100);

  // Limit bullet points to a maximum of 20
  const generateBulletPoints = (length) => {
    const bulletPointLength = Math.min(length, 94); // Cap at 20 bullet points
    return '●'.repeat(bulletPointLength);
  };

  // Generate 20 bullet points or fewer
  const bulletPoints = generateBulletPoints(token.length);

  const handleStatusToggle = (newStatus) => {
    setStatusToToggle(newStatus);
    confirmStatus.onTrue();
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

  const teammembersPageDisabled = useSelector((state) => state.access.teammembersPageDisabled);

  const renderPrimary = (
    <TableRow hover selected={selected}>
      {!teammembersPageDisabled && (
        <TableCell padding="checkbox">
        <Tooltip title="Select this WhatsApp number" arrow placement="top">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </Tooltip>
      </TableCell>
      )}
      

      <TableCell width={110}>
        {row.status === 'active' ? (
          <Tooltip title="This WhatsApp number is currently active" arrow placement="top">
            <Label variant="soft" color="success">
              {row.status}
            </Label>
          </Tooltip>
        ) : row.status === 'inactive' ? (
          <Tooltip title="This WhatsApp number is currently inactive." arrow placement="top">
            <Label variant="soft" color="error">
              {row.status}
            </Label>
          </Tooltip>
        ) : (
          <Label variant="soft" color="success">
            {row.status}
          </Label>
        )}
        <Tooltip
          title=" Created: Oct 23, 2024 17:45:32, (UTC+05:30) Asia/Kolkata"
          placement="top"
          arrow
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
            Oct 23, 2024 17:45:32
          </Box>
        </Tooltip>
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
            disabled={row.status === 'inactive'} // Disable the button if status is 'inactive'
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
        <Tooltip title="Click to see options." arrow placement="top">
          {!teammembersPageDisabled && (
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
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
              direction="row"
              gap={2}
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <Tooltip
                title={showToken ? `Access token of your WhatsApp Number: ${token}` : ''}
                arrow
                placement="top"
              >
                <Typography variant="body2">
                  Access Token: {showToken ? truncatedToken : generateBulletPoints(token.length)}
                </Typography>
              </Tooltip>

              <Tooltip title="Click here to show/hide access token." arrow placement="top">
                <IconButton onClick={handleToggleToken}>
                  <Iconify icon={showToken ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </Tooltip>
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
              <Tooltip title="Privacy policy URL of your website." arrow placement="top">
                <span>
                  <ListItemText
                    primary={
                      <Typography component="div" variant="body2">
                        Privacy Policy URL:{' '}
                        <Link
                          style={{ color: '#078DEE' }}
                          underline="always"
                          href="https://www.pabbly.com/privacy-policy/"
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ wordBreak: 'break-all' }}
                        >
                          https://www.pabbly.com/privacy-policy/
                        </Link>
                      </Typography>
                    }
                  />
                </span>
              </Tooltip>
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
              <Tooltip title="Terms of service URL of your website." arrow placement="top">
                <span>
                  <ListItemText
                    primary={
                      <Typography component="div" variant="body2">
                        Terms of Service URL:{' '}
                        <Link
                          href="https://www.pabbly.com/terms-conditions/"
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="always"
                          sx={{ color: '#078DEE' }}
                        >
                          https://www.pabbly.com/terms-conditions/
                        </Link>
                      </Typography>
                    }
                  />
                </span>
              </Tooltip>
            </Stack>
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  const navigate = useNavigate();
  const handleNavigateToTeamMembers = () => {
    navigate('/app/settings/teammembers'); // Adjust the path if needed
  };

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
          {row.status === 'active' ? (
            <Tooltip title="Click to set status to disable" arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('Disable');
                  popover.onClose();
                }}
              >
                <Iconify icon="ion:toggle-sharp" />
                Disable
              </MenuItem>
            </Tooltip>
          ) : (
            <Tooltip title="Click to set status to enable" arrow placement="left">
              <MenuItem
                onClick={() => {
                  handleStatusToggle('Enable');
                  popover.onClose();
                }}
              >
                <Iconify icon="ph:toggle-left-fill" />
                Enable
              </MenuItem>
            </Tooltip>
          )}

          <Tooltip title="Move the WhatsApp number to an existing folder." arrow placement="left">
            <MenuItem
              onClick={() => {
                setMoveToFolderPopoverOpen(true); // Open the Move To Folder dialog
                popover.onClose();
              }}
              sx={{ color: 'secondary' }}
            >
              <Iconify icon="fluent:folder-move-16-filled" />
              Move
            </MenuItem>
          </Tooltip>
          <Tooltip title="Add team members for collaborative editing." arrow placement="left">
            <MenuItem onClick={handleNavigateToTeamMembers} sx={{ color: 'secondary' }}>
              <Iconify icon="fluent:people-team-add-24-filled" />
              Add Team Members
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="This will delete this WhatsApp number" arrow placement="left">
            <MenuItem
              onClick={() => {
                confirmDelete.onTrue();
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
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Delete"
        content="Are you sure you want to delete this WhatsApp number?"
        action={
          <Tooltip title="Click here to delete the whatsapp number" arrow placement="top">
            <Button variant="contained" color="error" onClick={onDeleteRow}>
              Delete
            </Button>
          </Tooltip>
        }
      />

      <ConfirmDialog
        open={confirmStatus.value}
        onClose={confirmStatus.onFalse}
        title={statusToToggle.charAt(0).toUpperCase() + statusToToggle.slice(1)}
        content={`Are you sure you want to set this WhatsApp number as ${statusToToggle.toLowerCase()}?`}
        action={
          <Tooltip title="Click here to disale this whatsAppm number" arrow placement="top">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleStatusToggle(statusToToggle); // Toggle the status here
                confirmStatus.onFalse(); // Close the dialog
              }}
            >
              {statusToToggle.charAt(0).toUpperCase() + statusToToggle.slice(1)}
            </Button>
          </Tooltip>
        }
      />
      <MoveToFolderPopover
        open={moveToFolderPopoverOpen}
        onClose={() => setMoveToFolderPopoverOpen(false)}
      />
    </>
  );
}
