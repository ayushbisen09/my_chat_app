import 'react-modal-video/css/modal-video.min.css';

import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import ActivityLogTable from 'src/sections/activity-logs/components/activity-logs-Table/activity-log-table';

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
          title="Activity Log"
          Subheading="Activity Log is a concise record that captures and summarizes all notable actions, events, and tasks that have occurred within the last 90 days."
          link_added="#"
        />
      </Box>
      <ActivityLogTable />

      {/* Table */}
    </DashboardContent>
  );
}
