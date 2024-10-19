import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import { Box, Button, Tooltip, useMediaQuery } from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import ExploreTemplate from 'src/sections/templates/explore-templates';

// import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Page five | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const basicTabs = useTabs('one');

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
          title=" Explore Templates"
          Subheading="Browse and customize a wide range of templates to streamline your communication."
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

      <ExploreTemplate />
    </DashboardContent>
  );
}
