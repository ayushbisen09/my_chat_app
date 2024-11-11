import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// ----------------------------------------------------------------------

export function ConfirmDialog({ title, content, action, open, onClose, ...other }) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {action}
        <Tooltip
              title= "If you don't want to delete the template click this cancel button"
              arrow
              placement="top"
            >
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
}
