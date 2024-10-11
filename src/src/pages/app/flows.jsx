import 'react-modal-video/css/modal-video.min.css';

import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip,useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import FlowBuilderTable from 'src/sections/flow-builder/component/flowbuildertable/flow-builder-table';

// ----------------------------------------------------------------------

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dialog = useBoolean();

  const navigate = useNavigate();

  const handleAddFlow = () => {
    navigate('/app/flows/createflow');
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
          title="Flow Builder"
          Subheading="You can connect with facebook to fetch catalogue and manage it from our platform."
          link_added="#"
        />
         <Tooltip title="Click here to add flow" arrow placement="top">
        <Button
          onClick={handleAddFlow}
          sx={{ mt: isMobile ? 2 : 0 }}
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          color="primary"
        >
          Add Flow
        </Button>
        </Tooltip>

        {/* <WhatsAppDialog open={dialog.value} onClose={dialog.onFalse} /> */}
      </Box>
      {/* Cards Section */}

      <Box
        sx={{
          mt: '40px',
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
        }}
      >
        {/* Total flows  */}
        <Tooltip title="Number of flows you have added." arrow placement="top">
          <div>
          <StatsCards
          cardtitle="Total flows "
          cardstats="20"
          icon_name="flows_total.png"
          icon_color="#2B78EA"
          bg_gradient="#2B78EA"
        />
          </div>
          </Tooltip>
        

        {/* Active flows */}
        <Tooltip title="Number of active flows you have added." arrow placement="top">
<div>
<StatsCards
          cardtitle="Active flows"
          cardstats="10"
          icon_name="flows_active.png"
          icon_color="#009C53"
          bg_gradient="#009C53"
        />
</div>
</Tooltip>
        

        {/* Inactive flows */}
        <Tooltip title="Number of inactive flows you have added." arrow placement="top">
        <div>

        <StatsCards
          cardtitle="Inactive flows"
          cardstats="10"
          icon_name="flows_inactive.png"
          icon_color="#F86672"
          bg_gradient="#F86672"
        />
        </div>
        </Tooltip>
        {/* Total flows quota */}
        <Tooltip title="Number of flows quota you have." arrow placement="top">
        <div>

        <StatsCards
          cardtitle="Total flows quota"
          cardstats="2,000"
          icon_name="flows_qota.png"
          icon_color="#FFA92E"
          bg_gradient="#FFA92E"
        />
        </div>
        </Tooltip>
      </Box>

      {/* Table */}

      <FlowBuilderTable />
    </DashboardContent>
  );
}
