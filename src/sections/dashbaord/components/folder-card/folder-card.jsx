import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import {
  Box,
  Card,
  Button,
  Tooltip,
  Divider,
  MenuItem,
  MenuList,
  IconButton,
  Typography,
  CardContent,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { varAlpha, stylesMode } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

import { QuickShareDialog } from '../../hooks/quick-share-dailog';
import { CreateFolderDialog } from '../../hooks/create_folder-dailog';
import { RenameFolderDialog } from '../../hooks/rename_folder-dailog';

const LABELS = {
  home: 'Home',
  companyb: 'Company B',
  mainFolder: 'WhatsApp Database',
  whastappDatabase: 'Database 1',
  childFolder2: 'WhatsApp Number List',
  grandChild1: 'Employee List',
  grandChild2: 'Total Member List',
  folder1: 'List 1',
  folder2: 'List 2',
  folder3: 'List 3',
  grandChild3: 'Administrative List',
  childFolder3: 'Active Contact List',
  childFolder4: 'Inactive Contact List',
  pabblySubscriptionBilling: 'Pabbly Subscription Billing',
  pabblyEmailMarketing: 'Pabbly Email Marketing',
  pabblyFormBuilder: 'Pabbly Form Builder',
  pabblyEmailVerification: 'Pabbly Email Verification',
  pabblyHook: 'Pabbly Hook',
  clientA: 'Company B',
  childFolder1Client: 'Company B WhatsApp Numbers',
  grandChild1Client: 'Contact List 1',
  grandChild2Client: 'Contact List 2',
  trash: 'Trash',
};

// Count children for tree view items
const countChildren = (item) =>
  item.children?.length ||
  0 + (item.children?.reduce((acc, child) => acc + countChildren(child), 0) || 0);

// Truncate labels if too long
const truncateLabel = (label, maxLength = 25) =>
  label.length > maxLength ? `${label.slice(0, maxLength)}...` : label;

// Process items for the tree view
const folderItems = (items) =>
  items.map((item) => ({
    ...item,
    fullLabel: item.label, // Ensure fullLabel is assigned for tooltip display
    label: `${truncateLabel(item.label)} (${countChildren(item)})`, // Truncated label for display
    children: item.children ? folderItems(item.children) : [],
  }));

// Items for different sections
const HOMEITEMS = folderItems([{ id: '25', label: LABELS.home, children: [] }]);

const ITEMS = folderItems([
  { id: '0', label: LABELS.companyb, children: [] },
  {
    id: '1',
    label: LABELS.mainFolder,
    children: [
      { id: '2', label: LABELS.whastappDatabase },
      {
        id: '3',
        label: LABELS.childFolder2,
        children: [
          { id: '6', label: LABELS.grandChild1 },
          {
            id: '7',
            label: LABELS.grandChild2,
            children: [
              { id: '9', label: LABELS.folder1 },
              { id: '10', label: LABELS.folder2 },
              { id: '11', label: LABELS.folder3 },
            ],
          },
          { id: '8', label: LABELS.grandChild3 },
        ],
      },
      { id: '4', label: LABELS.childFolder3 },
      { id: '5', label: LABELS.childFolder4 },
    ],
  },
  { id: '12', label: LABELS.pabblySubscriptionBilling, children: [] },
  { id: '13', label: LABELS.pabblyEmailMarketing, children: [] },
  { id: '14', label: LABELS.pabblyFormBuilder, children: [] },
  { id: '15', label: LABELS.pabblyEmailVerification, children: [] },
  { id: '16', label: LABELS.pabblyHook, children: [] },
  {
    id: '17',
    label: LABELS.clientA,
    children: [
      {
        id: '19',
        label: LABELS.childFolder1Client,
        children: [
          { id: '20', label: LABELS.grandChild1Client },
          {
            id: '21',
            label: LABELS.grandChild2Client,
            children: [
              { id: '22', label: LABELS.folder1 },
              { id: '23', label: LABELS.folder2 },
            ],
          },
        ],
      },
    ],
  },
]);

const ITEMS2 = folderItems([{ id: '24', label: LABELS.trash, children: [] }]);

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.vars.palette.grey[800],
  [stylesMode.dark]: { color: theme.vars.palette.grey[200] },
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.8, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '14px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      '& > svg': {
        marginRight: theme.spacing(1),
      },
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: '50%',
    // backgroundColor and dark mode styling removed for the arrow icon
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${varAlpha(theme.vars.palette.text.primaryChannel, 0.4)}`,
  },
}));

const CustomTreeItem = React.forwardRef((props, ref) => {
  const {
    fullLabel,
    label,
    expanded,
    onToggle,
    id,
    onHomeClick,
    onFolderClick,
    hideEllipsis,
    ...other
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [quickShareDialogOpen, setQuickShareDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleIconClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleCreateFolderClick = (event) => {
    setFolderDialogOpen(true);
    handleMenuClose(event);
  };

  const handleRenameFolderClick = (event) => {
    setRenameDialogOpen(true);
    handleMenuClose(event);
  };

  const handleQuickShareDialogClick = (event) => {
    setQuickShareDialogOpen(true);
    handleMenuClose(event);
  };

  const handleDeleteClick = (event) => {
    setConfirmDeleteOpen(true);
    handleMenuClose(event);
  };

  const handleFolderDialogClose = () => {
    setFolderDialogOpen(false);
  };

  const handleRenameFolderClose = () => {
    setRenameDialogOpen(false);
  };

  const handleQuickShareDialogClose = () => {
    setQuickShareDialogOpen(false);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
  };

  const handleItemClick = (event) => {
    if (id === '0') {
      onHomeClick();
    } else {
      onFolderClick(label); // Trigger the folder click event and pass the label
      onToggle?.(event);
    }
  };
  const navigate = useNavigate();
  const handleNavigateToTeamMembers = () => {
    navigate('/app/settings/teammembers'); // Adjust the path if needed
  };

  return (
    <>
      <StyledTreeItem
        ref={ref}
        label={
          <>
            <Tooltip title={`Folder Name: ${fullLabel || label}`} arrow placement="top">
              <Box sx={{ mr: 'auto', cursor: 'pointer', width: '100%' }} onClick={handleItemClick}>
                <span>{label}</span> {/* Truncated label for display */}
              </Box>
            </Tooltip>
            {!hideEllipsis && id !== '0' && (
              <IconButton onClick={handleIconClick} size="small">
                <Tooltip title="Click to see options." arrow placement="top">
                  <Iconify
                    icon="eva:more-vertical-fill"
                    width={16}
                    height={16}
                    sx={{ ml: 'auto' }}
                  />
                </Tooltip>
              </IconButton>
            )}

            <CustomPopover
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PopperProps={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 8],
                    },
                  },
                ],
              }}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 1,
                  boxShadow: 3,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    borderWidth: '6px',
                    borderStyle: 'solid',
                    borderColor: 'transparent transparent white transparent',
                    transform: 'translateY(-100%) translateX(100%)',
                    transformOrigin: 'bottom left',
                  },
                },
              }}
            >
              <MenuList>
                <MenuItem onClick={handleCreateFolderClick}>
                  <Iconify icon="fa6-solid:square-plus" />
                  Create Folder
                </MenuItem>
                <MenuItem onClick={handleRenameFolderClick}>
                  <Iconify icon="fluent:rename-16-filled" />
                  Rename
                </MenuItem>
                {/* <MenuItem onClick={handleNavigateToTeamMembers}>
                  <Iconify icon="jam:share-alt-f" />
                  Share
                </MenuItem> */}
                <MenuItem onClick={handleNavigateToTeamMembers}>
                  <Iconify icon="jam:share-alt-f" />
                  Share
                </MenuItem>
                <Divider style={{ borderStyle: 'dashed' }} />
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                  Delete
                </MenuItem>
              </MenuList>
            </CustomPopover>
          </>
        }
        {...other}
      />

      <CreateFolderDialog open={folderDialogOpen} onClose={handleFolderDialogClose} />
      <RenameFolderDialog open={renameDialogOpen} onClose={handleRenameFolderClose} />
      <QuickShareDialog open={quickShareDialogOpen} onClose={handleQuickShareDialogClose} />

      <ConfirmDialog
        open={confirmDeleteOpen}
        onClose={handleConfirmDeleteClose}
        title="Do you really want to delete this folder?"
        content={
          <>
            Deleting a folder also deletes its subfolders, and WhatsApp number are moved to the home
            folder.
            <Link href="/learn-more" target="_blank" rel="noopener noreferrer">
              Learn more
            </Link>
          </>
        }
        action={
          <Button variant="contained" color="error" onClick={handleConfirmDeleteClose}>
            Delete
          </Button>
        }
      />
    </>
  );
});

export default function DashBoardFolderCard({
  sx,
  icon,
  title,
  total,
  color = 'warning',
  onTrashClick,
  onHomeClick,
  onFolderClick, // Add this prop to handle folder click
  ...other
}) {
  const theme = useTheme();
  const folderDialog = useBoolean();

  return (
    <>
      <Card
        sx={{
          boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
          height: '100%',
          backgroundColor: 'common.white',
          width: { xs: '100%', md: '354.2px' },
          borderRadius: '16px',
          p: 0,
          ...sx,
        }}
        {...other}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2.6,
            }}
          >
            <Box
              sx={{
                minHeight: '100%',
                width: '100%',
                borderBottom: '1px dashed',
                borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2.6,
                }}
              >
                <Typography variant="h6" component="div">
                  <Tooltip
                    title="You can create folders and manage whatsApp number inside them."
                    arrow
                    placement="top"
                  >
                    Folders
                  </Tooltip>
                </Typography>

                <Tooltip title="Create a new folder." arrow placement="top">
                  <Button
                    sx={{
                      mb: '0px',
                      p: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: 0,
                    }}
                    onClick={folderDialog.onTrue}
                    maxWidth
                    color="primary"
                    variant="contained"
                  >
                    <Iconify icon="fa6-solid:plus" />
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box sx={{ minHeight: '100%', width: '100%' }}>
            <RichTreeView
              onClick={onHomeClick}
              defaultExpandedItems={['25']}
              sx={{ overflowX: 'hidden', minHeight: 'auto' }}
              slots={{
                item: (props) => (
                  <CustomTreeItem
                    {...props}
                    onFolderClick={onFolderClick}
                    onHomeClick={onHomeClick}
                  />
                ), // Pass the folder click handler
              }}
              items={HOMEITEMS}
            />
            <RichTreeView
              defaultExpandedItems={['0']}
              sx={{ overflowX: 'hidden', minHeight: 'auto' }}
              slots={{
                item: (props) => (
                  <CustomTreeItem
                    {...props}
                    onFolderClick={onFolderClick}
                    onHomeClick={onHomeClick}
                  />
                ), // Pass the folder click handler
              }}
              items={ITEMS}
            />
          </Box>

          <Box
            sx={{
              minHeight: '100%',
              width: '100%',
              pt: '21px',
              mt: '21px',
              borderTop: '1px dashed',
              borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
            }}
          >
            <RichTreeView
              onClick={onTrashClick}
              defaultExpandedItems={['24']}
              sx={{
                overflowX: 'hidden',
                minHeight: 'auto',
                width: '100%',
              }}
              slots={{
                item: (props) => (
                  <CustomTreeItem
                    {...props}
                    hideEllipsis
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            display: 'flex',
                            flexGrow: 1,
                            mr: 'auto',
                          }}
                        >
                          {props.label}
                        </Typography>

                        <Iconify
                          mr="3.1px"
                          icon="solar:trash-bin-trash-bold"
                          style={{
                            height: '18px',
                            color: '#6c757d',
                          }}
                        />
                      </Box>
                    }
                    onHomeClick={onHomeClick}
                  />
                ),
              }}
              items={ITEMS2}
            />
          </Box>
        </CardContent>
      </Card>
      <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} />
    </>
  );
}
