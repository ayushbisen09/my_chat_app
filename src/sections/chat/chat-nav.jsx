import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { ToggleButton } from './styles';
import { ChatNavItem } from './chat-nav-item';
import { ChatNavAccount } from './chat-nav-account';
import { ChatNavItemSkeleton } from './chat-skeleton';
import { ChatFilterDialog } from './hooks/chat-filter-dialog';
import { ChatNavSearchResults } from './chat-nav-search-results';

// ----------------------------------------------------------------------

const NAV_WIDTH = 320;
const NAV_COLLAPSE_WIDTH = 96;

// ----------------------------------------------------------------------

export function ChatNav({ loading, contacts, conversations, collapseNav, selectedConversationId }) {
  const theme = useTheme();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const dialog = useBoolean();

  const {
    openMobile,
    onOpenMobile,
    onCloseMobile,
    onCloseDesktop,
    collapseDesktop,
    onCollapseDesktop,
  } = collapseNav;

  const [searchContacts, setSearchContacts] = useState({ query: '', results: [] });
  const [chatCount, setChatCount] = useState(0); // State to store chat count
  const [visitedCount, setVisitedCount] = useState(0); // State to track visited chats

  useEffect(() => {
    if (!mdUp) {
      onCloseDesktop();
    }
  }, [onCloseDesktop, mdUp]);

  useEffect(() => {
    // Simulate API call to fetch chat count and visited count
    const fetchChatData = async () => {
      try {
        // Assume this is an API call to get the chat count
        const count = conversations.allIds.length;
        setChatCount(count);

        // Here, we'll mock the visited chat count (for example purposes)
        const visited = Math.min(1, count); // This assumes you've visited at least 1 chat
        setVisitedCount(visited);
      } catch (error) {
        console.error('Error fetching chat count:', error);
      }
    };

    fetchChatData();
  }, [conversations.allIds]); // Dependency array ensures it runs when the conversation list updates

  const handleToggleNav = useCallback(() => {
    if (mdUp) {
      onCollapseDesktop();
    } else {
      onCloseMobile();
    }
  }, [mdUp, onCloseMobile, onCollapseDesktop]);

  const handleClickCompose = useCallback(() => {
    if (!mdUp) {
      onCloseMobile();
    }
    router.push(paths.dashboard.inbox);
  }, [mdUp, onCloseMobile, router]);

  const handleSearchContacts = useCallback(
    (inputValue) => {
      setSearchContacts((prevState) => ({ ...prevState, query: inputValue }));

      if (inputValue) {
        const results = contacts.filter((contact) =>
          contact.name.toLowerCase().includes(inputValue)
        );
        setSearchContacts((prevState) => ({ ...prevState, results }));
      }
    },
    [contacts]
  );

  const handleClickAwaySearch = useCallback(() => {
    setSearchContacts({ query: '', results: [] });
  }, []);

  const handleClickResult = useCallback(
    (result) => {
      handleClickAwaySearch();
      router.push(`${paths.dashboard.inbox}?id=${result.id}`);
    },
    [handleClickAwaySearch, router]
  );

  const renderLoading = <ChatNavItemSkeleton />;

  const renderList = (
    <nav>
      <Box>
        <Box>
          {conversations.allIds.map((conversationId) => (
            <ChatNavItem
              key={conversationId}
              collapse={collapseDesktop}
              conversation={conversations.byId[conversationId]}
              selected={conversationId === selectedConversationId}
              onCloseMobile={onCloseMobile}
            />
          ))}
        </Box>
      </Box>
    </nav>
  );

  const renderListResults = (
    <ChatNavSearchResults
      query={searchContacts.query}
      results={searchContacts.results}
      onClickResult={handleClickResult}
    />
  );

  const renderSearchInput = (
    <ClickAwayListener onClickAway={handleClickAwaySearch}>
      <TextField
        fullWidth
        value={searchContacts.query}
        onChange={(event) => handleSearchContacts(event.target.value)}
        placeholder="Search contacts..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ mt: 2.5 }}
      />
    </ClickAwayListener>
  );

  const renderContent = (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2.5, pb: 0 }}>
        {!collapseDesktop && (
          <>
            <ChatNavAccount />
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}

        <IconButton onClick={handleToggleNav}>
          <Iconify
            icon={collapseDesktop ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
          />
        </IconButton>

        {!collapseDesktop && (
          <IconButton onClick={handleClickCompose}>
            <Iconify width={24} icon="solar:user-plus-bold" />
          </IconButton>
        )}

        <IconButton onClick={dialog.onTrue} >
          <Iconify width={24} icon="iconoir:filter-solid" />
        </IconButton>
        <ChatFilterDialog open={dialog.value} onClose={dialog.onFalse} />
      </Stack>

      <Box sx={{ p: 2.5, pt: 0 }}>{!collapseDesktop && renderSearchInput}</Box>

      {loading ? (
        renderLoading
      ) : (
        <>
          <Scrollbar>
            {searchContacts.query && !!conversations.allIds.length ? renderListResults : renderList}
          </Scrollbar>
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              backgroundColor: '#FFFFFF', // Ensure it has a background
              padding: '12px', // Add some padding for better appearance
              borderTop: '1px solid rgba(145, 158, 171, 0.2)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row', // Display side by side
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 1, // spacing between texts
              }}
            >
              <Box
                sx={{
                  fontWeight: '400',
                  fontSize: '14px',
                  // color: '#919EAB', // using the MUI secondary color
                  display: 'felx',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 0.5 }}>{visitedCount}</Typography>
                  <Typography sx={{ mr: 0.5 }}>-</Typography>
                  <Typography sx={{ mr: 0.5 }}>{chatCount}</Typography>
                  <Typography sx={{ mr: 0.5 }}>of</Typography>
                  <Typography>{chatCount}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );

  return (
    <>
      <ToggleButton onClick={onOpenMobile} sx={{ display: { md: 'none' } }}>
        <Iconify width={16} icon="solar:users-group-rounded-bold" />
      </ToggleButton>

      <Stack
        sx={{
          minHeight: 0,
          flex: '1 1 auto',
          width: NAV_WIDTH,
          display: { xs: 'none', md: 'flex' },
          borderRight: `solid 1px ${theme.vars.palette.divider}`,
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(collapseDesktop && { width: NAV_COLLAPSE_WIDTH }),
        }}
      >
        {renderContent}
      </Stack>

      <Drawer
        open={openMobile}
        onClose={onCloseMobile}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: NAV_WIDTH } }}
      >
        {renderContent}
      </Drawer>
    </>
  );
}
