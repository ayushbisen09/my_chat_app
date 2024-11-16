import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch for dispatching actions

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { hideAccessBox } from 'src/redux/slices/accessSlice';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import UpgradeCard from 'src/components/uprgade-card/upgrade-card';
import { AnimateLogo1, AnimateAvatar } from 'src/components/animate';

import { useMockedUser } from 'src/auth/hooks'; // Import animation logo component
import { useRouter, usePathname } from 'src/routes/hooks';

import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button'; // Import the action

export function AccountDrawer({ data = [], sx, ...other }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useMockedUser();

  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // State for animation

  const teammembersPageDisabled = useSelector((state) => state.access.teammembersPageDisabled);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleExitClick = useCallback(() => {
    setIsAnimating(true);
    handleCloseDrawer();
    setTimeout(() => {
      setIsAnimating(false);

      dispatch(hideAccessBox());
      router.push('/app');
    }, 2000);
  }, [dispatch, router, handleCloseDrawer]);

  const handleClickItem = useCallback(
    (option) => {
      if (option.label === 'My Account') {
        handleExitClick(); // Executes the logic for "My Account"
      } else {
        handleCloseDrawer();
        router.push(option.href);
      }
    },
    [handleExitClick, handleCloseDrawer, router]
  );

  const selectedTeammemberName = useSelector((state) => state.access.selectedTeammemberName);
  const selectedTeammemberEmail = useSelector((state) => state.access.selectedTeammemberEmail);

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: user?.photoURL, alt: user?.displayName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${theme.vars.palette.primary.main} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {user?.displayName?.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );

  // Filter the data array to remove "Subscription" when teammembersPageDisabled is true
  const filteredData = teammembersPageDisabled
    ? data.filter((option) => option.label !== 'Subscription')
    : data;

  return (
    <>
      {/* Animation Overlay */}
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
            zIndex: 130000000, // High z-index to cover the entire page
          }}
        >
          <AnimateLogo1 />
        </Box>
      )}

      <AccountButton
        open={open}
        onClick={handleOpenDrawer}
        photoURL={user?.photoURL}
        displayName={user?.displayName}
        sx={sx}
        {...other}
      />

      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'absolute' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 8, pb: 3 }}>
            {renderAvatar}

            <Typography variant="subtitle1" noWrap sx={{ mt: 2 }}>
              {selectedTeammemberName || 'Ankit Mandli'}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }} noWrap>
              {selectedTeammemberEmail || 'ankit.madli@pabbly.com'}
            </Typography>
          </Stack>

          <Stack
            sx={{
              py: 3,
              px: 2.5,
              borderTop: `dashed 1px ${theme.vars.palette.divider}`,
              borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
            }}
          >
            {filteredData.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() => handleClickItem(option)}
                sx={{
                  py: 1,
                  color: 'text.secondary',
                  '& svg': { width: 24, height: 24 },
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {option.icon}

                <Box component="span" sx={{ ml: 2 }}>
                  {option.label}
                </Box>

                {option.info && (
                  <Label color="error" sx={{ ml: 1 }}>
                    {option.info}
                  </Label>
                )}
              </MenuItem>
            ))}
          </Stack>

          <Box sx={{ px: 2.5, py: 3 }}>
            <UpgradeCard />
          </Box>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} />
        </Box>
      </Drawer>
    </>
  );
}
