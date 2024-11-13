import * as React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import {
  Box,
  List,
  Button,
  Tooltip,
  Divider,
  MenuList,
  MenuItem,
  Skeleton,
  IconButton,
  Typography,
  Pagination,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { setSelectedListName } from 'src/redux/slices/selectedListSlice';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { AddContactsListDrawer } from './hook/add-contact-list';
import { EditContactsListDrawer } from './hook/edit-contact-list-drawer';

export default function ContactList({ onItemSelect, itemsPerPage = 10, currentPage }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer if the component is unmounted
  }, []);
  const dispatch = useDispatch();
  const confirmDelete = useBoolean();
  const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: '6px',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    padding: '8px 16px',
    margin: '2px 0',
    color: '#637381',
    backgroundColor: 'transparent',
    '& .MuiListItemIcon-root': {
      color: '#637381',
      transition: 'color 0.2s ease-in-out',
      minWidth: '24px',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px',
    },
    '& .MuiListItemText-root': {
      margin: 0,
    },
    '&:hover': {
      backgroundColor: 'rgba(145, 158, 171, 0.08)',
    },
    '&.Mui-selected': {
      color: '#1C252E',
      backgroundColor: 'rgba(145, 158, 171, 0.16)',
      '&:hover': {
        backgroundColor: 'rgba(145, 158, 171, 0.24)',
      },
      '& .MuiListItemIcon-root': {
        color: '#1C252E',
      },
    },
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
  }));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedContactName, setSelectedContactName] = useState('');

  const handleListItemClick = useCallback(
    (event, index) => {
      setSelectedIndex(index);
      const selectedName = contactLists[index].name;
      dispatch(setSelectedListName(selectedName));
      onItemSelect(index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, onItemSelect]
  );

  const addContactListDrawer = useBoolean();
  const editContactListDrawer = useBoolean();
  const popover = usePopover();

  const contactLists = [
    { name: 'All', count: 544554 },
    { name: 'Pabbly Connect List', count: 54 },
    { name: 'Pabbly Subscription Billing List', count: 23 },
    { name: 'Pabbly Form Builder List', count: 54 },
    { name: 'SaaS Innovators', count: 21 },
    { name: 'Form Builder Users', count: 50 },
    { name: 'Support Squad', count: 30 },
    { name: 'Engaged Audience', count: 3 },
    { name: 'Loyal Subscribers', count: 10 },
    { name: 'Product Champions', count: 9 },
    { name: 'Webinar Attendees', count: 3 },
    { name: 'Launch Day Users', count: 10 },
    { name: 'Prime Contacts', count: 5 },
  ];

  const [page, setPage] = useState(1);
  const totalItems = contactLists.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentContacts = contactLists.slice(startIndex, endIndex);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const nextPage = currentPage + 1 <= totalPages ? currentPage + 0 : null;
  const previousPage = currentPage - 1 > 0 ? currentPage - 1 : null;
  const pagesToShow = [];
  if (previousPage) pagesToShow.push(previousPage);
  if (nextPage) pagesToShow.push(nextPage);
  pagesToShow.push(currentPage);
  pagesToShow.sort((a, b) => a - b);

  const teammembersPageDisabled = useSelector((state) => state.access.teammembersPageDisabled);

  return (
    <Box
      sx={{
        backgroundColor: 'common.white',
        p: '24px',
        borderRadius: '16px',
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        width: {
          lg: '303px',
          xs: '100%',
        },
        minWidth: {
          lg: '303px',
          xs: '100%',
        },
        maxWidth: {
          lg: '303px',
          xs: '100%',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography fontSize="18px" fontWeight={600}>
          Add Contact List&nbsp;
          <Tooltip title="Total number of lists" arrow placement="top">
            <Typography
              component="span" // Makes it inline
              fontSize="18px"
              fontWeight={600}
              color="text.secondary" // Use secondary color
              sx={{ display: 'inline-flex', alignItems: 'center' }} // Ensures inline placement
            >
              {loading ? <Skeleton variant="text" width={40} height={28} /> : `(${totalItems})`}
            </Typography>
          </Tooltip>
        </Typography>
        <Tooltip title="Click here to add new contact list." arrow placement="top">
          <Button
            sx={{
              mb: '0px',
              p: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 0,
            }}
            onClick={addContactListDrawer.onTrue}
            maxWidth
            color="primary"
            variant="contained"
          >
            <Iconify icon="fa6-solid:plus" />
          </Button>
        </Tooltip>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <AddContactsListDrawer
        open={addContactListDrawer.value}
        onClose={addContactListDrawer.onFalse}
      />
      <List sx={{ width: '100%', mb: 1.5 }}>
        {loading
          ? // Skeleton Loader when contacts are loading
            Array.from(new Array(5)).map((_, index) => (
              <Box sx={{ display: 'flex' }} key={index}>
                <Skeleton variant="text" width="100%" height={42} />
              </Box>
            ))
          : // Render the actual list once contacts are available
            currentContacts.map((contact, index) => (
              <Box sx={{ display: 'flex' }} key={index}>
                <Tooltip title={`List name: ${contact.name}`} arrow placement="top">
                  <CustomListItemButton
                    selected={selectedIndex === index + startIndex}
                    onClick={(event) => handleListItemClick(event, index + startIndex)}
                  >
                    <ListItemText
                      primary={
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            overflow: 'hidden',
                          }}
                        >
                          <span
                            style={{
                              flexGrow: 1,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {contact.name}
                          </span>
                          <span style={{ marginLeft: '8px', flexShrink: 0 }}>
                            ({contact.count})
                          </span>
                        </div>
                      }
                    />
                  </CustomListItemButton>
                </Tooltip>
                {contact.name !== 'All' && (
                  <IconButton
                    color={popover.open ? 'inherit' : 'default'}
                    onClick={(e) => {
                      e.stopPropagation();
                      popover.onOpen(e);
                      setSelectedContactName(contact.name);
                    }}
                    sx={{ ml: 0.5 }}
                  >
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
                )}
              </Box>
            ))}
      </List>

      <Divider sx={{ mb: 2 }} />
      <Box
        display="flex"
        justifyContent="center" // Center horizontally
        alignItems="center" // Center vertically (if needed)
      >
        <Pagination
          count={totalPages}
          page={page}
          siblingCount={0}
          size="small"
          onChange={handlePageChange}
        />
      </Box>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'left-top' } }}
      >
        <MenuList>
          <Tooltip title="Click here to edit the list." arrow placement="right">
            <MenuItem
              onClick={() => {
                popover.onClose();
                editContactListDrawer.onTrue();
              }}
            >
              <Iconify icon="solar:bill-list-bold" />
              Edit List
            </MenuItem>
          </Tooltip>

          <Tooltip title="Click here to delete this contact list ." arrow placement="right">
            {!teammembersPageDisabled && (
              <>
                <Divider style={{ borderStyle: 'dashed' }} />
                <MenuItem
                  onClick={() => {
                    confirmDelete.onTrue();
                    popover.onClose();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon="solar:trash-bin-trash-bold" />
                  Delete List
                </MenuItem>
              </>
            )}
          </Tooltip>
        </MenuList>
      </CustomPopover>
      <EditContactsListDrawer
        open={editContactListDrawer.value}
        onClose={editContactListDrawer.onFalse}
        contactName={selectedContactName}
      />
      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Delete"
        content="Are you sure you want to delete this contact list?"
        action={
          <Tooltip title={`List name: ${contactLists.name}`} arrow placement="top">
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                confirmDelete.onFalse();
              }}
            >
              Delete
            </Button>
          </Tooltip>
        }
      />
    </Box>
  );
}
