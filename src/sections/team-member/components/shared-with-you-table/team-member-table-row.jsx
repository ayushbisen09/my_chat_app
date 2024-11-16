import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, Tooltip, Checkbox, MenuList, MenuItem, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { showAccessBox } from 'src/redux/slices/accessSlice';

import { Iconify } from 'src/components/iconify';
import { AnimateLogo1 } from 'src/components/animate';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export function SharedWithYouTeammemberTableRow({
  row,
  selected,
  onSelectRow,
  sharedwithyouteammemberIndex,
  onDeleteRow,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAccessNowClick = () => {
    setIsAnimating(true);
    const selectedTeammemberName =
      teammembername[sharedwithyouteammemberIndex % teammembername.length];

    setTimeout(() => {
      setIsAnimating(false);
      dispatch(showAccessBox(selectedTeammemberName)); // Pass the team member name
      navigate('/app');
    }, 2000);
  };

  const confirm = useBoolean();
  const popover = usePopover();

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
    'hardik.pradhan@pabbly.com',
    'abhishek.nagar@pabbly.com',
    // Add more flow names as needed
  ];
  const teammembername = [
    'Ayush Bisen',
    'Ankit Mandli',
    'Nikhil Patel',
    'Rajendra Jatav',
    'Anand Nayak',
    'Hardik Pradhan',
    'Abhishek Nagr',
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
    <>
      {isAnimating && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999999999, // High z-index to cover the entire page
          }}
        >
          <AnimateLogo1 />
        </Box>
      )}
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
          />
        </TableCell>

        <TableCell width={1500}>
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
              <Tooltip
                title={` Whatsapp number access shared by you to this team member name ${teammembername[sharedwithyouteammemberIndex % teammembername.length]}`}
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
                  {teammembername[sharedwithyouteammemberIndex % teammembername.length]}
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell width={1500}>
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

        <TableCell width={1900}>
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

        <TableCell width={700}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              // justifyContent="flex-end" // Aligns content to the right
              sx={{ width: '100%' }} // Ensure Stack spans the full cell width
            >
              <Tooltip
                title={` Click here to access this team member : ${teammemberemail[sharedwithyouteammemberIndex % teammemberemail.length]} account `}
                arrow
                placement="top"
              >
                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleAccessNowClick}
                    disabled={isAnimating} // Optionally disable button during animation
                  >
                    Access Now
                  </Button>
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell align="right" width={100}>
          <Tooltip title="Action" arrow placement="top">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );

  return (
    <>
      {renderPrimary}
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <Tooltip
            title={`Click here to remove access from this " ${teammemberemail[sharedwithyouteammemberIndex % teammemberemail.length]} " team member`}
            arrow
            placement="top"
          >
            <MenuItem
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Remove Access
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Remove"
        content={`Are you sure want to remove this team member ${teammemberemail[sharedwithyouteammemberIndex % teammemberemail.length]} ?`}
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
