import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, Tooltip } from '@mui/material';

export function SharedWithYouTeammemberTableRow({
  row,
  selected,
  onSelectRow,
  sharedwithyouteammemberIndex,
}) {
  const sharedondateandtime = [
    'Jan 19, 2024 08:23:31',
    'Jan 10, 2024 01:23:02',
    'Nov 25, 2023 05:27:02',
    'Nov 11, 2024 22:27:02',
    'Aug 14, 2023 11:27:02',
    'Aug 18, 2023 11:52:02',

    // Add more flow names as needed
  ];

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

  const whatsappnumbershared = [
    '+91 9471564821',
    '+91 8834648167',
    '+91 8614837514',
    '+91 9471564821',
    '+91 9471564821',
    '+91 5524564821',
    '+91 9471565524',
    // Add more flow names as needed
  ];

  const renderPrimary = (
    <TableRow hover selected={selected}>
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
              title={`Whatsapp number access shared by you to this team member : ${teammemberemail[sharedwithyouteammemberIndex % teammemberemail.length]}`}
              arrow
              placement="top"
            >
              <Box component="span">
                {teammemberemail[sharedwithyouteammemberIndex % teammemberemail.length]}
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
              title={`This Whatsapp number ${whatsappnumbershared[sharedwithyouteammemberIndex % whatsappnumbershared.length]} access shared by this team member ${teammemberemail[sharedwithyouteammemberIndex % teammemberemail.length]} with you `}
              arrow
              placement="top"
            >
              <Box component="span">
                {whatsappnumbershared[sharedwithyouteammemberIndex % whatsappnumbershared.length]}
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
              title={` Whatsapp number Shared On: ${sharedondateandtime[sharedwithyouteammemberIndex % sharedondateandtime.length]} (UTC+05:30) Asia/Kolkata with this ${teammemberemail[sharedwithyouteammemberIndex % teammemberemail.length]} team member`}
              arrow
              placement="top"
            >
              <Box component="span">
                {sharedondateandtime[sharedwithyouteammemberIndex % sharedondateandtime.length]}
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align="right" width={700}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="flex-end" // Aligns content to the right
            sx={{ width: '100%' }} // Ensure Stack spans the full cell width
          >
            <Tooltip
              title={` Click here to access this team member : ${teammemberemail[sharedwithyouteammemberIndex % teammemberemail.length]} account `}
              arrow
              placement="top"
            >
              <Box component="span">
                <Button variant="outlined" color="primary" size="small">
                  Access Now
                </Button>
              </Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
