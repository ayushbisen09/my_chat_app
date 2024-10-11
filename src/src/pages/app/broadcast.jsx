import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Button, Tooltip ,useMediaQuery} from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import BroadcastTable from 'src/sections/broadcast/components/table/table';

const metadata = { title: `Page three | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const currentData = {
    totalContacts: 54,
    optedInContacts: 40,
    optedOutContacts: 14,
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleAddContact = () => {
    navigate('/app/broadcast/addbroadcast');
  };

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
          title="Broadcast"
          Subheading="Launch a campaign now to initiate new conversations with users on WhatsApp."
          link_added="#"
        />
 <Tooltip title="Clear here to clone the flow" arrow placement="top">
        <Button
          onClick={handleAddContact}
          sx={{ mt: isMobile ? 2 : 0 }}
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          color="primary"
        >
          Add Broadcast
        </Button>
        </Tooltip>
      </Box>
      <Box
        sx={{
          mt: '40px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            mt: '24px',
            gap: 3,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
        
          <Tooltip title="Total broadcast you have created" arrow placement="top">
<div>

          <StatsCards
            cardtitle="Total Broadcast"
            cardstats="18"
            icon_name="TotalCampaign.png"
            icon_color="#28A645"
            bg_gradient="#22C55E"
          />
</div>
</Tooltip>
          
          <Tooltip title="Total live broadcast " arrow placement="top">
            <div>

          <StatsCards
            cardtitle="Live Broadcast "
            cardstats="22"
            icon_name="LiveCampaign.png"
            icon_color="#FFA92E"
            bg_gradient="#FFA92E"
          />
            </div>
            </Tooltip>

          
          <Tooltip title="Total send broadcast" arrow placement="top">
            <div>

          <StatsCards
            cardtitle="Sent Broadcast"
            cardstats="23"
            icon_name="SentCampaign.png"
            icon_color="#05A6C6"
            bg_gradient="#05A6C6"
          />
            </div>
            </Tooltip>
            <Tooltip title="Total scheduled broadcast " arrow placement="top">
              <div>

          <StatsCards
            cardtitle="Scheduled  Broadcast"
            cardstats="11"
            icon_name="ScheduledBroadcast.png"
            icon_color="#F86672"
            bg_gradient="#F86672"
          />
              </div>
              </Tooltip>
        </Box>
        <BroadcastTable />
      </Box>
    </DashboardContent>
  );
}
