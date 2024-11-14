import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Tooltip, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import { hideAccessBox } from 'src/redux/slices/accessSlice';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { AnimateLogo1 } from 'src/components/animate';

import { HeaderSection } from './header-section';
import { Searchbar } from '../components/searchbar';
import { MenuButton } from '../components/menu-button';
import { AccountDrawer } from '../components/account-drawer';

const StyledDivider = styled('span')(({ theme }) => ({
  width: 1,
  height: 10,
  flexShrink: 0,
  display: 'none',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: theme.spacing(2.5),
  marginRight: theme.spacing(2.5),
  backgroundColor: 'currentColor',
  color: theme.vars.palette.divider,
  '&::before, &::after': {
    top: -5,
    width: 3,
    height: 3,
    content: '""',
    flexShrink: 0,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: 'currentColor',
  },
  '&::after': { bottom: -5, top: 'auto' },
}));

export function HeaderBase({
  sx,
  data,
  slots,
  slotProps,
  onOpenNav,
  layoutQuery,

  slotsDisplay: {
    account = true,
    helpLink = true,
    purchase = true,
    searchbar = true,
    menuButton = true,
  } = {},

  ...other
}) {
  const theme = useTheme();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login'; // Adjust this path if your login route is different

  const showAccessBox = useSelector((state) => state.access.showAccessBox);

  const dispatch = useDispatch();

  const [isAnimating, setIsAnimating] = useState(false);

  const handleExitClick = () => {
    setIsAnimating(true); // Start the animation
    setTimeout(() => {
      setIsAnimating(false); // End the animation after delay
      dispatch(hideAccessBox()); // Execute existing logic after animation
    }, 2000); // Adjust delay time for the animation duration
  };

  const selectedTeammemberName = useSelector((state) => state.access.selectedTeammemberName);

  return (
    <>
      {isAnimating && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#FFFFFF', // Semi-transparent overlay
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300, // High z-index to cover the entire page
          }}
        >
          <AnimateLogo1 />
        </Box>
      )}

      {showAccessBox && (
        <Box
          sx={{
            px: 5,
            py: 2,
            backgroundImage: 'linear-gradient(to left, #455DF7, #2C2A6ABA, #E1497F)', // Linear gradient as background
            borderBottom: '1px dashed',
            borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center" // Center
            spacing={3}
          >
            <Typography fontWeight={400} fontSize={18} color="#FFFFFF">
              👉 Ankit Mandli logged in as: {selectedTeammemberName}
            </Typography>

            <Button
              variant="contained"
              color="warning"
              startIcon={<Iconify icon="pepicons-pop:power" style={{ width: 18, height: 18 }} />}
              onClick={handleExitClick}
            >
              Exit Access
            </Button>
          </Stack>
        </Box>
      )}
      <HeaderSection
        sx={{
          backgroundColor: 'common.white',
          borderBottom: '1px dashed',
          borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
          ...sx,
        }}
        layoutQuery={layoutQuery}
        slots={{
          ...slots,
          leftAreaStart: slots?.leftAreaStart,
          leftArea: (
            <>
              {slots?.leftAreaStart}

              {menuButton && !isLoginPage && (
                <MenuButton
                  data-slot="menu-button"
                  onClick={onOpenNav}
                  sx={{
                    mr: 1,
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
              )}

            

              {isLoginPage ? (
                <Logo data-slot="logo" />
              ) : (
                <>
                  <Box
                    alt="logo"
                    component="img"
                    src={`${CONFIG.site.basePath}/assets/icons/navbar/Chatflow.svg`}
                    width={120}
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      zIndex: theme.zIndex.drawer + 1,
                    }}
                  />
                  <Logo
                    width={30}
                    sx={{
                      display: { xs: 'block', sm: 'none' },
                    }}
                  />
                </>
              )}

              {!isLoginPage && <StyledDivider data-slot="divider" />}

              {slots?.leftAreaEnd}
            </>
          ),
          rightArea: (
            <>
              {slots?.rightAreaStart}

              <Box
                data-area="right"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 1, sm: 1.5 },
                }}
              >
                {helpLink && (
                  <Link
                    data-slot="help-link"
                    href={paths.faqs}
                    component={RouterLink}
                    color="inherit"
                    sx={{ typography: 'subtitle2' }}
                  >
                    Need help?
                  </Link>
                )}

                {searchbar && <Searchbar data-slot="searchbar" data={data?.nav} />}

                {account && (
                  <Tooltip title="Click here to see account details." arrow placement="bottom">
                    <span>
                      <AccountDrawer data-slot="account" data={data?.account} />
                    </span>
                  </Tooltip>
                )}

                {purchase && (
                  <Button
                    data-slot="purchase"
                    variant="contained"
                    rel="noopener"
                    target="_blank"
                    href={paths.minimalStore}
                    sx={{
                      display: 'none',
                      [theme.breakpoints.up(layoutQuery)]: {
                        display: 'inline-flex',
                      },
                    }}
                  >
                    Purchase
                  </Button>
                )}
              </Box>

              {slots?.rightAreaEnd}
            </>
          ),
        }}
        slotProps={slotProps}
        {...other}
      />
    </>
  );
}
