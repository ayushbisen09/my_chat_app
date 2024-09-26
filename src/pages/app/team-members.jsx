import 'react-modal-video/css/modal-video.min.css';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Tooltip,useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import BigCard from 'src/sections/team-member/components/big-card/big-card';
import { TeamMemberDialog } from 'src/sections/team-member/hooks/add-team-member';
import SharedbyYouTeamMemberTable from 'src/sections/team-member/components/shared-by-you-table/team-member-table';
import SharedWithYouTeamMemberTable from 'src/sections/team-member/components/shared-with-you-table/team-member-table';

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
          title="Team Members"
          Subheading="You can add members with varying access level to manage your business."
          link_added="#"
        />
        <Tooltip title="Click here to add team member" arrow placement="top">
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
          Add Team Member
        </Button>
        </Tooltip>
        <TeamMemberDialog open={dialog.value} onClose={dialog.onFalse} />
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
        <Tooltip title="Team members added by you" arrow placement="top">
          <div>
        <StatsCards
          cardtitle="Unique Team Members Added"
          cardstats="2"
          icon_name="unique.png"
          icon_color="#1A76FF"
          bg_gradient="#1A76FF"
        />
        </div>
        </Tooltip>
        {/* WhatsApp Numbers Shared By You */}
        <Tooltip title="WhatsApp number shared by you with team members." arrow placement="top">
          <div>

          <StatsCards
          cardtitle="WhatsApp Numbers Shared By You"
          cardstats="2"
          icon_name="byyou.png"
          icon_color="#009C53"
          bg_gradient="#009C53"
        />
          </div>
        
        </Tooltip>

        {/* WhatsApp Numbers Shared With You */}
       
          
      
        <Tooltip title="WhatsApp number shared with you by admins." arrow placement="top">
          <div>
          <StatsCards
          cardtitle="WhatsApp Numbers Shared With You"
          cardstats="10,000"
          icon_name="sharedwithyou.png"
          icon_color="#009CBB"
          bg_gradient="#009CBB"
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
      <SharedbyYouTeamMemberTable />
      <SharedWithYouTeamMemberTable />
    </DashboardContent>
  );
}
