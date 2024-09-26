import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import Switch from '@mui/material/Switch';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

export function TablePaginationCustom({
  sx,
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  ...other
}) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
        sx={{ borderTopColor: 'transparent' }}
      />

      {onChangeDense && (
        <Tooltip title='Switch to reduce the table size.' arrow placement='top'>
          <FormControlLabel
            label="Dense"
            control={<Switch name="dense" checked={dense} onChange={onChangeDense} />}
            sx={{
              pl: 2,
              py: 1.5,
              top: 0,
              position: { sm: 'absolute' },
            }}
          />
        </Tooltip>
      )}
    </Box>
  );
}
