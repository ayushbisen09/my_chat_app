import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { fToNow } from 'src/utils/format-time';

import { clickConversation } from 'src/actions/chat';

import { useMockedUser } from 'src/auth/hooks';

import { useNavItem } from './hooks/use-nav-item';

// ----------------------------------------------------------------------

export function ChatNavItem({ selected, collapse, conversation, onCloseMobile }) {
  const { user } = useMockedUser();
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  const { group, displayName, displayText, participants, lastActivity, hasOnlineInGroup } =
    useNavItem({ conversation, currentUserId: `${user?.id}` });
  const singleParticipant = participants[0];
  console.log("tsdkjksdh",singleParticipant);

  const handleClickConversation = useCallback(async () => {
    try {
      if (!mdUp) {
        onCloseMobile();
      }
      await clickConversation(conversation.id);
      router.push(`${paths.dashboard.inbox}?id=${conversation.id}`);
    } catch (error) {
      console.error(error);
    }
  }, [conversation.id, mdUp, onCloseMobile, router]);

  const renderSingle = ( 
    <Badge key={singleParticipant?.status} variant={singleParticipant?.status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} sx={{ zIndex: -1 }}>
      <Avatar alt={singleParticipant?.name} src="/assets/images/chatavatar/Ayush.png" sx={{ width: 48, height: 48 }} />
    </Badge>
  );

  return (
    <Box component="li" sx={{ display: 'flex' }}>
      <ListItemButton
        onClick={handleClickConversation}
        sx={{
          py: 1.5,
          px: 2.5,
          gap: 2,
          ...(selected && { bgcolor: 'action.selected' }),
        }}
      >
        <Badge
          color="error"
          overlap="circular"
          badgeContent={
            !collapse && conversation.unreadCount ? conversation.unreadCount : undefined
          }
          sx={{ zIndex: -1 }}
        >
          {renderSingle}
        </Badge>

        {!collapse && (
          <>
            <ListItemText
              primary="Ayush Bisen"
              primaryTypographyProps={{ noWrap: true, component: 'span', variant: 'subtitle2' }}
              secondary={displayText}
              secondaryTypographyProps={{
                noWrap: true,
                component: 'span',
                variant: conversation.unreadCount ? 'subtitle2' : 'body2',
                color: conversation.unreadCount ? 'text.primary' : 'text.secondary',
              }}
            />

            <Stack alignItems="flex-end" sx={{ alignSelf: 'stretch' }}>
              <Typography
                noWrap
                variant="body2"
                component="span"
                sx={{ mb: 1.5, fontSize: 12, color: 'text.disabled' }}
              >
                {fToNow(lastActivity)}
              </Typography>

              {!!conversation.unreadCount && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: 'info.main',
                    borderRadius: '50%',
                  }}
                />
              )}
            </Stack>
          </>
        )}
      </ListItemButton>
  
    </Box>
  );
}
