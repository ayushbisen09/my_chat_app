import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, Tooltip, IconButton } from '@mui/material';

import { setExcludedArray, setIncludedArray } from 'src/redux/slices/contactSlice';

import { Iconify } from 'src/components/iconify';

export function SelectContactDrawerTableRow({ row, selected }) {
  const [state, setState] = useState('initial');
  const dispatch=useDispatch();
  const handleCheckIconClick = (action) => {
    if (action === 'confirm') {
      setState('showButtons');
    } else {
      setState(state === 'initial' ? 'initial' : 'excludeinitials');
    }
  };

  const handlecloseIconClick = (action) => {
    if (action === 'confirm') {
      setState('showButtons1');
    } else {
      setState(state === 'initial' ? 'initial' : 'excludeinitials');
    }
  };

  const handleCheckConfirm = () => {
    setState('included');
    dispatch(setIncludedArray('Pabbly Connect List'));
  };

  const handleCloseConfirm = () => {
    setState('excluded');
    dispatch(setExcludedArray('Pabbly Connect List'));
  };

  const handleCancel = () => {
    setState('initial');
  };

  const handleExcludeCancel = () => {
    setState('excludeinitials');
  };

  const handleRevert = () => {
    setState('initial');
  };

  const handlExcludeRevert = () => {
    setState('excludeinitials');
  };

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell width={500}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
             <Tooltip title="Contact list name" arrow placement="top">
            <Box component="span">Pabbly Connect List</Box>
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
             <Tooltip title="233 contact in the list" arrow placement="top">
            <Box component="span">233</Box>
            </Tooltip>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell width={110}>
        {(state === 'initial' || state === 'excludeinitials') && (
          <>
            <Tooltip title="for including list click here" arrow placement='top'>
              <IconButton
                sx={{ color: 'success.main', marginRight: '8px' }}
                onClick={() => handleCheckIconClick('confirm')}
              >
                <Iconify icon="icon-park-solid:check-one" />
              </IconButton>
            </Tooltip>
            <Tooltip title="for excluding Contact list click here" arrow placement='top'>
              <IconButton
                sx={{ color: 'error.main', marginRight: '8px' }}
                onClick={() => handlecloseIconClick('confirm')}
              >
                <Iconify icon="icon-park-solid:close-one" />
              </IconButton>
            </Tooltip>
          </>
        )}
        {state === 'showButtons' && (
          <>
            <Button
              variant="soft"
              color="success"
              onClick={handleCheckConfirm}
              sx={{ marginBottom: '8px' }}
            >
              Confirm
            </Button>
            <Button variant="soft" color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
        {state === 'included' && (
          <Box component="span" sx={{ color: 'success.main' }} onClick={handleRevert}>
            Included
          </Box>
        )}
        {state === 'showButtons1' && (
          <>
            <Button
              variant="soft"
              color="success"
              onClick={handleCloseConfirm}
              sx={{ marginBottom: '8px' }}
            >
              Confirm
            </Button>
            <Button variant="soft" color="error" onClick={handleExcludeCancel}>
              Cancel
            </Button>
          </>
        )}
        {state === 'excluded' && (
          <Box component="span" sx={{ color: 'error.main' }} onClick={handlExcludeRevert}>
            Excluded
          </Box>
        )}
      </TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
}
