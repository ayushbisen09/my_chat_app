import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Label } from 'src/components/label';

import { ActivityLogDrawer } from '../drawer/activity-log-drawer';


export function ActivitylogTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const [setShowToken] = useState(false);
  const [openDrawer1, setOpenDrawer1] = useState(false);


  const handleOpenDrawer1 = () => {
    setOpenDrawer1(true);
  };

  const handleCloseDrawer1 = () => {
    setOpenDrawer1(false);
  };
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell width={350}>
      
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Tooltip title="Log Created/Updated Date: 08:23:31, (UTC-03:00) America/Fortaleza" arrow placement="top">
            <Box component="span">Jan 19, 2024</Box>
            </Tooltip>
            <Tooltip title="Log Created/Updated Time: 08:23:31, (UTC-03:00) America/Fortaleza" arrow placement="top">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              08:23:31
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
            <Tooltip title="This is the name of actor who created / updated  the activity log" arrow placement="top">
            <Box component="span">Ayush Bisen</Box>
            </Tooltip>
            <Tooltip title="This is the email address of actor who created / updated  the activity log" arrow placement="top">
            
            <Box component="span" sx={{ color: 'text.disabled' }}>
              ayush.bisen@pabbly.com
            </Box>
            </Tooltip>
          </Stack>
        </Stack>
       
      </TableCell>
      <TableCell width={700}>
      <Tooltip title="Activity log source" arrow placement="top">
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">Team Member Login</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              User
            </Box>
          </Stack>
        </Stack>
        </Tooltip>
      </TableCell>

   
      <TableCell width={110}>
        {row.status === 'created' ? (
          <Tooltip title="This log is created" arrow placement="top">
            <Label variant="soft" color="success">
              {row.status}
            </Label>
          </Tooltip>
        ) : row.status === 'updated' ? (
          <Tooltip title="This log is updated" arrow placement="top">
            <Label variant="soft" color="error">
              {row.status}
            </Label>
          </Tooltip>
        ) : (
          <Label variant="soft" color="success">
            {row.status}
          </Label>
        )}
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
            <Tooltip title="Event Data: 6671324303c8782026584551846" arrow placement="top" disableInteractive>
            <Box
            onClick={handleOpenDrawer1}
              component="span"
              sx={{
                color: '#078DEE',
                display: 'inline-block',
                maxWidth: '150px', // Adjust this value as needed
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              6671324303c8782026584551846
            </Box>
        </Tooltip>
            <ActivityLogDrawer open={openDrawer1} onClose={handleCloseDrawer1} />
          </Stack>
        </Stack>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
