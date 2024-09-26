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
import { Divider, Tooltip, Checkbox } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';


export function ChatAssignmentTableRow({
  row,
  selected,
 
  onSelectRow,
  
  serialNumber,
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
            <Box component="span">{serialNumber}</Box>
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
            <Box component="span">{row.ruleName}</Box>
          </Stack>
        </Stack>
      </TableCell>
      
      <TableCell width={592}>
  {row.status === 'online' ? (
    <Tooltip title="This rule is assigned to online  user " arrow placement="top">
      <Label variant="soft" color="success">
        {row.status}
      </Label>
    </Tooltip>
  ) : row.status === 'offline' ? (
    <Tooltip title="This rule is assigned to offline user" arrow placement="top">
      <Label variant="soft" color="error">
        {row.status}
      </Label>
    </Tooltip>
  ) : row.status === 'both' ? (
    <Tooltip title="This rule is assigned to both online and offline user" arrow placement="top">
      <Label variant="soft" color="warning">
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
      <Tooltip title="Click here to see agent are assigned to this chat assignment rule" arrow placement="top">
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>
        </Tooltip>
        <Tooltip title="Actions" arrow placement="top">
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
                  Agents that are assigned to this chat assignment rule
                </Box>
                <Box component="span">Ayush Bisen</Box>
                <Box component="span">Ankit Mandli</Box>
                <Box component="span">Rajendra Jatav</Box>
                <Box component="span">Anand Nayak</Box>
                <Box component="span">Nikhil Patel</Box>
                <Box component="span">Hardik Pradhan</Box>
                <Box component="span">Rajpal Singh Tomar</Box>
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
          
        <Tooltip title="Click here to edit the rule" arrow placement="left">
          <MenuItem sx={{ color: '' }}>
            <Iconify icon="solar:pen-bold" />
            Edit Rule
          </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="Click here to delete the rule" arrow placement="left">
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

      
    </>
  );
}
