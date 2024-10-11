import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function ResultItem({ title, path, groupLabel, onClickItem, isActive }) {
  return (
    <ListItemButton
      onClick={onClickItem}
      sx={{
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'transparent',
        borderBottomColor: (theme) => theme.vars.palette.divider,
        '&:hover': {
          borderRadius: 1,
          borderColor: (theme) => theme.vars.palette.primary.main,
          backgroundColor: (theme) =>
            varAlpha(
              theme.vars.palette.primary.mainChannel,
              theme.vars.palette.action.hoverOpacity
            ),
        },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ListItemText
        primaryTypographyProps={{ typography: 'subtitle2', sx: { textTransform: 'capitalize' } }}
        secondaryTypographyProps={{ typography: 'caption', noWrap: true }}
        primary={title.map((part, index) => (
          <Box
            key={index}
            component="span"
            sx={{ color: part.highlight ? 'primary.main' : 'text.primary' }}
          >
            {part.text}
          </Box>
        ))}
        secondary={path.map((part, index) => (
          <Box
            key={index}
            component="span"
            sx={{ color: part.highlight ? 'primary.main' : 'text.secondary' }}
          >
            {part.text}
          </Box>
        ))}
      />
      {groupLabel && <Label color="info">{groupLabel}</Label>}
      <Label
        color={isActive ? 'success' : 'error'}
        sx={{ ml: 1, alignSelf: 'center' }}
      >
        {isActive ? 'Active' : 'Inactive'}
      </Label>
    </ListItemButton>
  );
}
