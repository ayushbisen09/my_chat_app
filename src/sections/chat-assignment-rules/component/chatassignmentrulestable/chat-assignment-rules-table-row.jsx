import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Switch, Tooltip, Checkbox } from '@mui/material';

export function ChatAssignmentTableRow({ row, selected, chatAssignmentRuleTableIndex, onSelectRow }) {
  const teamMember = [
    'ayush.bisen@pabbly.com',
    'nikhil.patel@pabbly.com',
    'ankit.mandli@pabbly.com',
    'ayush.bisen@pabbly.com',
    'ankit.mandli@pabbly.com',
    // Add more flow names as needed
  ];

  const assignedType = [
    'Round Robin',
    'Round Robin',
    'Round Robin',
    'Round Robin',
    'Round Robin',
    // Add more flow names as needed
  ];

  const [isSwitchChecked, setIsSwitchChecked] = useState(chatAssignmentRuleTableIndex % 2 === 0);
  const handleSwitchChange = () => {
    setIsSwitchChecked((prev) => !prev);
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Tooltip title="Select this row to assign or view details" arrow placement="top">
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
            <Tooltip
              title={`Team member email: ${teamMember[chatAssignmentRuleTableIndex % teamMember.length]}`}
              arrow
              placement="top"
            >
              <Box component="span">{teamMember[chatAssignmentRuleTableIndex % teamMember.length]}</Box>
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
            <Tooltip
              title={`Assigned type for chat routing: ${assignedType[chatAssignmentRuleTableIndex % assignedType.length]}`}
              arrow
              placement="top"
            >
              <Box component="span">{assignedType[chatAssignmentRuleTableIndex % assignedType.length]}</Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell width={140} align="right">
        <Tooltip
          title={
            isSwitchChecked
              ? "Chat is assigned to this member."
              : "Chat is not assigned to this member."
          }
          arrow
          placement="top"
        >
          <Switch checked={isSwitchChecked} onChange={handleSwitchChange} />
        </Tooltip>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
