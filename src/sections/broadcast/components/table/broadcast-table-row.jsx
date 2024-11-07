import React, { useState } from 'react';

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
import { TestCampaignDrawer } from '../../hook/test-broadcast-drawer';

const templatename = ['Classic Layout', '-', 'Elegant Presentation', '-', 'Educational Content'];

const templatetype = ['Broadcast', 'API Broadcast', 'Scheduled Broadcast'];

const broadcastname = [
  'Weekly Digest',
  'Special Announcement',
  'Product Launch',
  'Seasonal Campaign',
  'New Feature Alert',
];

export function OrderTableRow({ row, selected, onSelectRow, onDeleteRow, broadcastIndex }) {
  const confirm = useBoolean();
  const stopApiBroadcastConfirmDialog = useBoolean();
  const pauseApiBroadcastConfirmDialog = useBoolean();
  const resumeApiBroadcastConfirmDialog = useBoolean();

  const collapse = useBoolean();
  const popover = usePopover();

  const editpopover = usePopover();
  const resumePopover = usePopover(); // New popover for Resume and Stop

  const isApiBroadcast = templatetype[broadcastIndex % templatetype.length] === 'API Broadcast';
  const [openTestCampaignDrawer, setOpenTestCampaignDrawer] = useState(false);

  // State to manage row status
  const [currentStatus, setCurrentStatus] = useState(row.status);

  const handleOpenTestCampaignDrawer = () => {
    setOpenTestCampaignDrawer(true);
  };

  const handleCloseTestCampaignDrawer = () => {
    setOpenTestCampaignDrawer(false);
  };

  // Handle the stop action
  const handleStopAction = () => {
    setCurrentStatus('stopped'); // Change the status to 'stopped'
    editpopover.onClose(); // Close the edit popover
  };

  // Handle the pause action
  const handlePauseAction = () => {
    setCurrentStatus('paused'); // Change the status to 'paused'
    editpopover.onClose(); // Close the edit popover
  };

  // Handle the resume action
  const handleResumeAction = () => {
    setCurrentStatus('live'); // Change the status to 'live' or whatever status you want
    resumePopover.onClose(); // Close the resume popover
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
      <TableCell width={900}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip title="Broadcast name " arrow placement="top">
              <Box component="span">{broadcastname[broadcastIndex % broadcastname.length]}</Box>
            </Tooltip>
            <Tooltip title="Template type " arrow placement="top">
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {templatetype[broadcastIndex % templatetype.length]}
                {/* Show Edit icon if the template type is API Broadcast and status is not 'stopped' */}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={1000}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip title="Template name " arrow placement="top">
              <Box component="span">{templatename[broadcastIndex % templatename.length]}</Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={800}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
            <Tooltip title="Date when broadcast is created " arrow placement="top">
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
        {currentStatus === 'live' ? (
          <Tooltip title="This broadcast is live" arrow placement="top">
            <Label variant="soft" color="success">
              {currentStatus}
            </Label>
          </Tooltip>
        ) : currentStatus === 'sent' ? (
          <Tooltip title="This broadcast is sent" arrow placement="top">
            <Label variant="soft" color="warning">
              {currentStatus}
            </Label>
          </Tooltip>
        ) : currentStatus === 'scheduled' ? (
          <Tooltip title="This broadcast is scheduled" arrow placement="top">
            <Label variant="soft" color="info">
              {currentStatus}
            </Label>
          </Tooltip>
        ) : currentStatus === 'paused' ? ( // Render 'paused' state
          <Tooltip title="This broadcast is paused" arrow placement="top">
            <Label variant="soft" color="warning">
              {currentStatus}
            </Label>
          </Tooltip>
        ) : currentStatus === 'failed' ? (
          <Tooltip title="This broadcast has failed" arrow placement="top">
            <Label variant="soft" color="error">
              {currentStatus}
            </Label>
          </Tooltip>
        ) : (
          <Label variant="soft" color="error">
            {currentStatus}
          </Label>
        )}

        {isApiBroadcast && currentStatus !== 'stopped' && (
          <IconButton sx={{ ml: 1 }} onClick={editpopover.onOpen}>
            <Iconify icon="solar:pen-bold" sx={{ width: '16px', height: '16px' }} />
          </IconButton>
        )}
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {isApiBroadcast ? (
          <Button variant="outlined" color="primary" onClick={handleOpenTestCampaignDrawer}>
            Test Broadcast
          </Button>
        ) : (
          '-'
        )}
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="Click here to see receiver list and stats" arrow placement="top">
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
                <Tooltip title="Included receiver list" arrow placement="left">
                  <Typography sx={{ mb: '2px' }} fontSize="14px" color="text.secondary">
                    <Box component="span" fontWeight="medium" color="text.primary">
                      Included:
                    </Box>{' '}
                    Pabbly Connect List, Pabbly Subscription Billing, Pabbly Support.
                  </Typography>
                </Tooltip>
                <Tooltip title="Excluded receiver list" arrow placement="left">
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
          <Tooltip title="Click here to delete the broadcast" arrow placement="left">
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

      <CustomPopover
        open={editpopover.open}
        anchorEl={editpopover.anchorEl}
        onClose={editpopover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Click here to stop the broadcast" arrow placement="left">
            <MenuItem
              // onClick={handleStopAction} // Handle Stop action
              onClick={() => {
                stopApiBroadcastConfirmDialog.onTrue();
              }}
            >
              <Iconify icon="ant-design:stop-outlined" />
              Stop
            </MenuItem>
          </Tooltip>
          {currentStatus === 'paused' ? ( // Conditional rendering for Resume
            <Tooltip title="Click here to resume the broadcast" arrow placement="left">
              <MenuItem
                // onClick={handleResumeAction} // Handle Resume action
                onClick={() => {
                  resumeApiBroadcastConfirmDialog.onTrue();
                }}
              >
                <Iconify icon="ant-design:play-circle-outlined" />
                Resume
              </MenuItem>
            </Tooltip>
          ) : (
            <Tooltip title="Click here to pause the broadcast" arrow placement="left">
              <MenuItem
                // onClick={handlePauseAction} // Handle Pause action
                onClick={() => {
                  pauseApiBroadcastConfirmDialog.onTrue();
                }}
              >
                <Iconify icon="zondicons:pause-outline" />
                Pause
              </MenuItem>
            </Tooltip>
          )}
        </MenuList>
      </CustomPopover>

      <CustomPopover
        open={resumePopover.open}
        anchorEl={resumePopover.anchorEl}
        onClose={resumePopover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip title="Click here to resume the broadcast" arrow placement="left">
            <MenuItem
              onClick={() => {
                resumeApiBroadcastConfirmDialog.onTrue();
              }}
            >
              <Iconify icon="ant-design:play-circle-outlined" />
              Resume
            </MenuItem>
          </Tooltip>
          <Tooltip title="Click here to stop the broadcast" arrow placement="left">
            <MenuItem
              onClick={handleStopAction} // Handle Stop action
            >
              <Iconify icon="ant-design:stop-outlined" />
              Stop
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
      <ConfirmDialog
        open={stopApiBroadcastConfirmDialog.value}
        onClose={stopApiBroadcastConfirmDialog.onFalse}
        title={`Stopping "${broadcastname[broadcastIndex % broadcastname.length]}" `}
        content={
          <>
            <Box mb={1}>Are you sure you want to stop this broadcast?</Box>
            <Box ml={2}>
            <ul>
              <ul> ● API campaign will stop functioning immediately.</ul>
              <ul> ● You won&apos;t be able to resume this broadcast.</ul>
            </ul>
            </Box>
            
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleStopAction(); // Perform the stop action
              stopApiBroadcastConfirmDialog.onFalse(); // Close the dialog
              
            }}
            
          >
            Stop
          </Button>
        }
      />

      <ConfirmDialog
        open={pauseApiBroadcastConfirmDialog.value}
        onClose={pauseApiBroadcastConfirmDialog.onFalse}
        title={`Pausing "${broadcastname[broadcastIndex % broadcastname.length]}" `}
        content={
          <>
            <Box mb={1}>Are you sure you want to stop this broadcast?</Box>
            <Box ml={2}>
              <ul>
                <ul> ● API broadcast will pause immediately.</ul>
                <ul> ● You can resume this broadcast anytime.</ul>
              </ul>
            </Box>
          </>
        }
        action={
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              handlePauseAction(); // Perform the stop action
              pauseApiBroadcastConfirmDialog.onFalse(); // Close the dialog
            }}
          >
            Pause
          </Button>
        }
      />

      <ConfirmDialog
        open={resumeApiBroadcastConfirmDialog.value}
        onClose={resumeApiBroadcastConfirmDialog.onFalse}
        title={`Resuming "${broadcastname[broadcastIndex % broadcastname.length]}" `}
        content={
          <>
            <Box mb={1}>Are you sure you want to resume this broadcast?</Box>
            <Box ml={2}>
            <ul>
              <ul> ● API broadcast will start to function immediately.</ul>
            </ul>
            </Box>
           
          </>
        }
        action={
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleResumeAction(); // Perform the stop action
              resumeApiBroadcastConfirmDialog.onFalse(); // Close the dialog
            }}
          >
            Resume
          </Button>
        }
      />

      <TestCampaignDrawer open={openTestCampaignDrawer} onClose={handleCloseTestCampaignDrawer} />
    </>
  );
}
