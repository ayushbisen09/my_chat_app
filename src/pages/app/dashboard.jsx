// import 'react-modal-video/css/modal-video.min.css';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Tooltip, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import BigCard from 'src/sections/dashbaord/components/big-card/big-card';
import DashboardTable from 'src/sections/dashbaord/components/table/table';
import { WhatsAppDialog } from 'src/sections/dashbaord/hooks/add-whatsApp-number';

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
          title="Dashboard"
          Subheading="Connecting Brands and Customers through WhatsApp Engagement and Marketing."
          link_added="#"
        />
        <Tooltip title="Click here to add WhatsApp Number." arrow placement="top">
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
          Add WhatsApp Number
        </Button>
        </Tooltip>

        <WhatsAppDialog open={dialog.value} onClose={dialog.onFalse} />
      </Box>
      {/* Cards Section */}

      <Box
        sx={{
          mt: '40px',
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {/* WhatsApp Number Added */}
        <Tooltip title="Number of WhatsApp Numbers you have added." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="WhatsApp Number Added"
              cardstats="8"
              icon_name="whatsapp-icon.svg"
              icon_color="#28A645"
              bg_gradient="#22C55E"
            />
          </div>
        </Tooltip>
        {/* WhatsApp Message Quota (Outgoing) */}
        <Tooltip title="Number of WhatsApp Message Quota (Outgoing) assigned to you." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="WhatsApp Message Quota (Outgoing)"
              cardstats="10,000"
              icon_name="2card.png"
              icon_color="#FFA92E"
              bg_gradient={theme.vars.palette[color].main}
            />
          </div>
        </Tooltip>
        {/* Messaage Quota Used */}
        <Tooltip title="Number of WhatsApp Message Quota you have used" arrow placement="top">
          <div>
        <StatsCards
          cardtitle="Message Quota Used"
          cardstats="2,000"
          icon_name="3card.svg"
          icon_color="#7D6ADB"
          bg_gradient="#8E33FF"
        />
        </div>
        </Tooltip>

      </Box>

      {/* Cards Section */}

      {/* Big Card Section */}

      <Grid xs={12} md={8}>
        <BigCard />
      </Grid>

      {/* Big Card Section */}

      {/* Table */}

      <DashboardTable />
    </DashboardContent>
  );
}
