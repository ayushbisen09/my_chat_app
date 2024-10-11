import 'react-modal-video/css/modal-video.min.css';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip ,useMediaQuery} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import { AddrulesDialog } from 'src/sections/chat-assignment-rules/hook/add-rules-dialog';
import ChatAssignmentTable from 'src/sections/chat-assignment-rules/component/chatassignmentrulestable/chat-assignment-rules-table';

// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dialog = useBoolean();
  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="Chat Assignment Rules"
          Subheading="Here you can set the assignment rules for the upcoming chats to the team members."
          link_added="#"
        />
        <Tooltip
                    title="Click here to add chat assignment rule "
                    arrow
                    placement="top"
                    
                  >
        <Button
          onClick={dialog.onTrue}
          sx={{ mt: isMobile ? 2 : 0 }}
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          color="primary"
        >
          Add Rule
        </Button>
        </Tooltip>
        <AddrulesDialog open={dialog.value} onClose={dialog.onFalse} />
      </Box>
      <ChatAssignmentTable />
    </DashboardContent>
  );
}
