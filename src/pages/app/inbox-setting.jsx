import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Divider, Tooltip, CardHeader } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import WorkingHours from 'src/sections/inbox-settings/components/working-hours/working-hours';
import WellComeMessage from 'src/sections/inbox-settings/components/welcome-message/welcome-message';
import OffHourMessages from 'src/sections/inbox-settings/components/off-hours-message/off-hours-message';

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Inbox Settings"
        Subheading="You can customize Auto Resolving capability for users intervened for more than 24 Hours."
        showButton={false}
      />
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Auto Resolve Chats" sx={{ mb: 3 }} />
          <Divider />
          <Tooltip
            title="Click here to Enable/Disabled auto resolve intervened chats"
            arrow
            placement="top"
          >
            <FormControlLabel
              control={<Switch id="toggle-taxes" />}
              label="Disable auto resolve intervened chats."
              sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
            />
          </Tooltip>
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Messages Settings" sx={{ mb: 3 }} />
          <Divider />

          <WellComeMessage />

          <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />

          <OffHourMessages />
        </Card>
      </Box>
      <Box>
        <WorkingHours />
      </Box>
    </DashboardContent>
  );
}
