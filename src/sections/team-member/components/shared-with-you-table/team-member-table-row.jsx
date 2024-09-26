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
import { Tooltip,Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export function SharedWithYouTeammemberTableRow({
  row,
  selected,
  onViewRow,
  onSelectRow,
  onDeleteRow,
}) {
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();

  const [showToken, setShowToken] = useState(false);

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
      <TableCell width={288}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Team member email who's access shared with you" arrow placement="top">
            <Box component="span">ankit.mandli@pabbly.com</Box>
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
            <Tooltip title="Date when access shared with you" arrow placement="top">
            <Box component="span">ar 10, 2024</Box>
            </Tooltip>
            <Tooltip title="Time when access shared with you" arrow placement="top">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              08:23:313
            </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
      <Tooltip title="Click here see WhatsApp number access shared with you" arrow placement="top">
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>
        </Tooltip>
        <Tooltip title="Action" arrow placement="top">
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
              spacing={2}
              direction="row"
              alignItems="center"
              sx={{
                p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                '&:not(:last-of-type)': {
                  borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                },
              }}
            >
              <Stack
                sx={{
                  typography: 'body2',
                  flex: '1 1 auto',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontSize: '14px',
                    fontWeight: '600', // semibold
                    color: 'text.primary',
                    mb: 1, // spacing from bottom
                  }}
                >
                  WhatsApp Number access shared with you
                </Box>
                <Box component="span">555-123-4567</Box>
                <Box component="span">7489077458</Box>
                <Box component="span">555-123-4567</Box>
                <Box component="span">555-123-4567</Box>
                <Box component="span">555-123-4567</Box>
                <Box component="span">555-123-4567</Box>
                <Box component="span">555-123-4567</Box>
                <Box component="span">555-123-4567</Box>
                <Box component="span">555-123-4567</Box>
                <Box component="span">555-123-4567</Box>
              </Stack>
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
