import { memo, useState, useEffect, forwardRef } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl } from '@mui/material';

import { varAlpha, stylesMode } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';

import { kanbanClasses } from '../classes';

const predefinedNames = [
  'Neeraj Aggarwal',
  'Anand Nayak',
  'Chetali Parve',
  'Hardik Pradhan',
  'Ankit mandli',
];
const avatarImages = {
  'Neeraj Aggarwal': '/assets/images/chatavatar/Neerajsir.png',
  'Anand Nayak': '/assets/images/chatavatar/anandnayak.png',
  'Chetali Parve': '/assets/images/chatavatar/chetaliparve.png',
  'Hardik Pradhan': '/assets/images/chatavatar/hardikpradhan.png',
  'Ankit mandli': '/assets/images/chatavatar/ankitmandli.png',
};
let lastAssignedNameIndex = 0;

const getUniqueName = () => {
  lastAssignedNameIndex = (lastAssignedNameIndex + 1) % predefinedNames.length;
  return predefinedNames[lastAssignedNameIndex];
};
const getAvatarImage = (name) => avatarImages[name] || '/assets/images/chatavatar/Default.png';

// ----------------------------------------------------------------------

export const StyledItemWrap = styled(ListItem)(() => ({
  '@keyframes fadeIn': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
  transform:
    'translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1)) scaleY(var(--scale-y, 1))',
  transformOrigin: '0 0',
  touchAction: 'manipulation',
  [`&.${kanbanClasses.state.fadeIn}`]: { animation: 'fadeIn 500ms ease' },
  [`&.${kanbanClasses.state.dragOverlay}`]: { zIndex: 999 },
}));

export const StyledItem = styled(Stack)(({ theme }) => ({
  width: '100%',
  cursor: 'grab',
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  transformOrigin: '50% 50%',
  touchAction: 'manipulation',
  boxShadow: theme.customShadows.z1,
  borderRadius: 'var(--item-radius)',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: theme.vars.palette.common.white,
  transition: theme.transitions.create(['box-shadow']),
  [stylesMode.dark]: { backgroundColor: theme.vars.palette.grey[900] },
  [`&.${kanbanClasses.state.disabled}`]: {},
  [`&.${kanbanClasses.state.sorting}`]: {},
  [`&.${kanbanClasses.state.dragOverlay}`]: {
    backdropFilter: `blur(6px)`,
    boxShadow: theme.customShadows.z20,
    backgroundColor: varAlpha(theme.vars.palette.common.whiteChannel, 0.48),
    [stylesMode.dark]: { backgroundColor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48) },
  },
  [`&.${kanbanClasses.state.dragging}`]: { opacity: 0.2, filter: 'grayscale(1)' },
}));

const ItemBase = forwardRef(({ task, stateProps, sx, ...other }, ref) => {
  const [priority, setPriority] = useState('Open');
  const [taskName] = useState(getUniqueName());

  const avatarSrc = getAvatarImage(taskName);
  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  useEffect(() => {
    if (!stateProps?.dragOverlay) {
      return;
    }

    document.body.style.cursor = 'grabbing';

    // eslint-disable-next-line consistent-return
    return () => {
      document.body.style.cursor = '';
    };
  }, [stateProps?.dragOverlay]);

  const itemWrapClassName = kanbanClasses.itemWrap.concat(
    (stateProps?.fadeIn && ` ${kanbanClasses.state.fadeIn}`) ||
      (stateProps?.dragOverlay && ` ${kanbanClasses.state.dragOverlay}`) ||
      ''
  );

  const itemClassName = kanbanClasses.item.concat(
    (stateProps?.dragging && ` ${kanbanClasses.state.dragging}`) ||
      (stateProps?.disabled && ` ${kanbanClasses.state.disabled}`) ||
      (stateProps?.sorting && ` ${kanbanClasses.state.sorting}`) ||
      (stateProps?.dragOverlay && ` ${kanbanClasses.state.dragOverlay}`) ||
      ''
  );

  const renderInfo = (
    <Stack direction="row" alignItems="center">
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        sx={{ typography: 'caption', color: 'text.disabled' }}
      >
        <Iconify width={16} icon="solar:chat-round-dots-bold" sx={{ mr: 0.25 }} />

        <Box component="span" sx={{ mr: 1 }}>
          {task?.comments?.length}
        </Box>

        <Iconify width={16} icon="eva:attach-2-fill" sx={{ mr: 0.25 }} />
        <Box component="span">{task?.attachments?.length}</Box>
      </Stack>

      <Avatar
        src={avatarSrc} // Use the unique avatar source
        alt={taskName} // Use the unique task name as the alt text
        sx={{
          cursor: 'pointer',
          width: 24,
          height: 24,
        }}
      />
    </Stack>
  );

  return (
    <StyledItemWrap ref={ref} disablePadding className={itemWrapClassName}>
      <StyledItem
        className={itemClassName}
        data-cypress="draggable-item"
        tabIndex={0}
        {...stateProps?.listeners}
        {...other}
      >
        <Stack spacing={2} sx={{ px: 2, py: 2.5, position: 'relative' }}>
          <Typography variant="subtitle2">{taskName}</Typography>
          <Box>
            <Typography variant="body2" color="text.secondary">
              #56715
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Submit your figma links here before...{' '}
            </Typography>
          </Box>
          <stack>
            <FormControl sx={{ width: '120px' }} fullWidth size="small">
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={priority}
                onChange={handlePriorityChange}
              >
                <MenuItem value="Open">Open </MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
                <MenuItem value="Replied">Replied</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </stack>

          {renderInfo}
        </Stack>
      </StyledItem>
    </StyledItemWrap>
  );
});

export default memo(ItemBase);
