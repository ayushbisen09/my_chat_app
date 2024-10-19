import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Button, Tooltip, useMediaQuery } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import TemplatesTable from './components/table/table';

export default function YourTemplate(color, main) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const handleAddTemplate = () => {
    navigate('/app/template/addtemplate');
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
          title="Templates"
          Subheading="You can Initiate a Conversation with users on WhatsApp using these template messages."
          link_added="#"
        />
        <Tooltip title="Click here to add new template" arrow placement="top">
          <Button
            onClick={handleAddTemplate}
            sx={{ mt: isMobile ? 2 : 0 }}
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
            size="large"
            variant="contained"
            color="primary"
          >
            Add New Template
          </Button>
        </Tooltip>
      </Box>
      <Box
        sx={{
          mt: '40px',
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' },
        }}
      >
        
        <Tooltip title="Total Number of approved templates." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="Approved templates"
              cardstats="18"
              icon_name="Approved.svg"
              icon_color="#28A645"
              bg_gradient="#22C55E"
            />
          </div>
        </Tooltip>
        <Tooltip title="Total Number of pending templates." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="Pending templates"
              cardstats="22"
              icon_name="Pending.svg"
              icon_color="#FFA92E"
              bg_gradient="#FFA92E"
            />
          </div>
        </Tooltip>
        <Tooltip title="Total Number of draft templates." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="Draft templates"
              cardstats="23"
              icon_name="Draft.svg"
              icon_color="#05A6C6"
              bg_gradient="#05A6C6"
            />
          </div>
        </Tooltip>
        <Tooltip title="Total Number of rejected templates." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="Rejected templates"
              cardstats="11"
              icon_name="Rejected.svg"
              icon_color="#F86672"
              bg_gradient="#F86672"
            />
          </div>
        </Tooltip>{' '}
      </Box>
      <TemplatesTable />
      </DashboardContent>
  );
}
