import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useResponsive } from 'src/hooks/use-responsive';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { ChatHeaderSkeleton } from './chat-skeleton';

// ----------------------------------------------------------------------

export function ChatHeaderDetail({ collapseNav, participants, loading }) {
  const popover = usePopover();

  const lgUp = useResponsive('up', 'lg');

  const group = participants.length > 1;

  const singleParticipant = participants[0];

  const { collapseDesktop, onCollapseDesktop, onOpenMobile } = collapseNav;

  const handleToggleNav = useCallback(() => {
    if (lgUp) {
      onCollapseDesktop();
    } else {
      onOpenMobile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lgUp]);

  const renderSingle = (
    <Tooltip
      title="This is the contact information with whom the loged in user is contacting with"
      arrow
      placement="top"
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Badge
          variant={singleParticipant?.status}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Avatar src="/assets/images/chatavatar/Ayushhh.png" alt={singleParticipant?.name} />
        </Badge>

        <ListItemText
          primary="Ayush Bisen"
          secondary="+91 7489077458"
          secondaryTypographyProps={{
            component: 'span',
            fontSize: '12px',
          }}
        />
      </Stack>
    </Tooltip>
  );

  if (loading) {
    return <ChatHeaderSkeleton />;
  }

  return (
    <>
      {renderSingle}

      <Stack direction="row" flexGrow={1} justifyContent="flex-end">
        <Tooltip
          title={
            collapseDesktop
              ? 'Click here to show the additional chat information of the contact'
              : 'Click here to hide the additional chat information of the contact'
          }
          arrow
          placement="top"
        >
          
          <IconButton onClick={handleToggleNav}>
            <Iconify icon={!collapseDesktop ? 'ri:sidebar-unfold-fill' : 'ri:sidebar-fold-fill'} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Click here for actions" arrow placement='top'>
        <IconButton onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
        </Tooltip>
      </Stack>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList>
        <Tooltip title="Click here to hide the notifications for this contact" arrow placement='left'>
          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:bell-off-bold" />
            Hide notifications
          </MenuItem>
          </Tooltip>
          <Tooltip title="Click here to Block this contact" arrow placement='left'>
          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:forbidden-circle-bold" />
            Block
          </MenuItem>
          </Tooltip>

          <Divider sx={{ borderStyle: 'dashed' }} />
          <Tooltip title="Click here to Delete this contact" arrow placement='left'>
          <MenuItem
            onClick={() => {
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
