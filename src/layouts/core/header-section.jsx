import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Button, Typography } from '@mui/material';

import { useScrollOffSetTop } from 'src/hooks/use-scroll-offset-top';

import { bgBlur, varAlpha } from 'src/theme/styles';
import { hideAccessBox } from 'src/redux/slices/accessSlice';

import { Iconify } from 'src/components/iconify';

import { layoutClasses } from '../classes';

// ----------------------------------------------------------------------

const StyledElevation = styled('span')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  m: 'auto',
  height: 24,
  zIndex: -1,
  opacity: 0.48,
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export function HeaderSection({
  sx,
  slots,
  slotProps,
  disableOffset,
  disableElevation,
  layoutQuery = 'md',
  ...other
}) {
  const theme = useTheme();

  const { offsetTop } = useScrollOffSetTop();

  const toolbarStyles = {
    default: {
      minHeight: 'auto',
      height: 'var(--layout-header-mobile-height)',
      transition: theme.transitions.create(['height', 'background-color'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      }),
      [theme.breakpoints.up('sm')]: {
        minHeight: 'auto',
      },
      [theme.breakpoints.up(layoutQuery)]: {
        height: 'var(--layout-header-desktop-height)',
      },
    },
    offset: {
      ...bgBlur({
        color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8),
      }),
    },
  };

  const selectedTeammemberName = useSelector((state) => state.access.selectedTeammemberName);
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

  return (
    <>

    {showAccessBox && (
        <Box
        className={layoutClasses.header}
          sx={{
           
            px: 5,
            py: 2,
            backgroundImage: 'linear-gradient(to left, #455DF7, #2C2A6ABA, #E1497F)', // Linear gradient as background
            borderBottom: '1px dashed',
            borderColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.3),
            justifyContent: 'center',
            display: 'flex',
            ...sx,
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
    <AppBar
      position="sticky"
      className={layoutClasses.header}
      sx={{
        zIndex: 'var(--layout-header-zIndex)',
        ...sx,
      }}
      {...other}
    >
      {slots?.topArea}

      <Toolbar
        disableGutters
        {...slotProps?.toolbar}
        sx={{
          ...toolbarStyles.default,
          ...(!disableOffset && offsetTop && toolbarStyles.offset),
          ...slotProps?.toolbar?.sx,
        }}
      >
        <Container
          {...slotProps?.container}
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            ...slotProps?.container?.sx,
          }}
        >
          {slots?.leftArea}

          <Box sx={{ display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
            {slots?.centerArea}
          </Box>

          {slots?.rightArea}
        </Container>
      </Toolbar>

      {slots?.bottomArea}

      {!disableElevation && offsetTop && <StyledElevation />}
    </AppBar>


    
    </>
    

    
  );
}
