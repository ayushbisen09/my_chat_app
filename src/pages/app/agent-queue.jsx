import { useState } from 'react';
import { useTheme } from '@emotion/react';

import { Box, useMediaQuery } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import Kanban from 'src/sections/agent-queue/card/kanban';
import Agentlist from 'src/sections/agent-queue/agent-list';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const [selectedListItem, setSelectedListItem] = useState(0);

  const handleListItemSelect = (index) => {
    setSelectedListItem(index);
  };

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          title="Agent Chat Overview"
          Subheading="Agent Chat Overview shows the list of chats assigned to Ayush Bisen."
          link_added="#"
        />
      </Box>
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'flex-start',
          // justifyContent: 'space-between',
          mt: '40px',
        }}
      >
        <Agentlist onItemSelect={handleListItemSelect} />
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              mt: 0,

              gap: 3,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' },
            }}
          />

          {/* <KanbanView /> */}
          <Kanban/>
        </Box>
      </Box>
    </DashboardContent>
  );
}
