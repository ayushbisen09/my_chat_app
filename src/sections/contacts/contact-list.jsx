import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

import {
  Box,
  List,
  Button,
  Tooltip,
  Divider,
  MenuList,
  MenuItem,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { AddContactsListDrawer } from './hook/add-contact-list';
import { EditContactsListDrawer } from './hook/edit-contact-list-drawer';

export default function ContactList({ onItemSelect }) {
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
      onItemSelect(index);
    },
    [onItemSelect]
  );

  const addContactListDrawer = useBoolean();
  const editContactListDrawer = useBoolean();
  const popover = usePopover();

  const contactLists = [
    { name: 'Pabbly Connect List', count: 54 },
    { name: 'Pabbly Subscription Billing List', count: 23 },
    { name: 'Pabbly Form Builder List', count: 54 },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'common.white',
        p: '24px',
        borderRadius: '16px',
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        width: {
          xs: '100%',
          sm: '100%',
          md: '303px',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems= "center" mb={2}>
        
        <Typography fontSize="18px" fontWeight={600}>
          Add Contact List
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
    <Divider sx={{mb:2}}/> 
      <AddContactsListDrawer
        open={addContactListDrawer.value}
        onClose={addContactListDrawer.onFalse}
      />
      <List sx={{ width: '100%' }}>
        {contactLists.map((contact, index) => (
        
            <Box sx={{ display: 'flex' }}>
            <Tooltip key={index} title={`List name: ${contact.name}`} arrow placement="top">
              <CustomListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
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
                      <span style={{ marginLeft: '8px', flexShrink: 0 }}>({contact.count})</span>
                    </div>
                  }
                />
              </CustomListItemButton>
              </Tooltip>
              <IconButton
                color={popover.open ? 'inherit' : 'default'}
                onClick={(e) => {
                  e.stopPropagation();
                  popover.onOpen(e);
                  setSelectedContactName(contact.name); // Set selected contact name
                }}
                sx={{ ml: 0.5 }}
              >
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </Box>
          
        ))}
      </List>

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
                popover.onClose(); // Close the popover
                editContactListDrawer.onTrue(); // Open the edit drawer
              }}
            >
              <Iconify icon="solar:bill-list-bold" />
              Edit List
            </MenuItem>
          </Tooltip>

          <Divider style={{ borderStyle: 'dashed' }} />
          <Tooltip title="Click here to delete this contact list ." arrow placement="right">
            <MenuItem
              onClick={() => {
                confirmDelete.onTrue(); // Open confirm dialog
                popover.onClose(); // Close popover
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete List
            </MenuItem>
          </Tooltip>
        </MenuList>
      </CustomPopover>
      <EditContactsListDrawer
        open={editContactListDrawer.value}
        onClose={editContactListDrawer.onFalse}
        contactName={selectedContactName} // Pass selected contact name
      />
      <ConfirmDialog
        open={confirmDelete.value}
        onClose={confirmDelete.onFalse}
        title="Delete"
        content="Are you sure you want to delete this contact list?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirmDelete.onFalse(); // Close the dialog after deletion
            }}
          >
            Delete
          </Button>
        }
      />
    </Box>
  );
}
