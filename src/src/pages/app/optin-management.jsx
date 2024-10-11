import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Card, Switch, Divider, Tooltip, CardHeader, FormControlLabel } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import OptInSetting from 'src/sections/optIn-management/components/opt-in-and-out-setting/opt-in-setting';
import OptOutSetting from 'src/sections/optIn-management/components/opt-in-and-out-setting/opt-out-setting';

// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function OptInManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Opt-In Management"
        Subheading="Setup keywords that users can type to Opt-in & Opt-out from messaging campaigns."
        showButton={false}
      />

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="API Campaign Opt-out" sx={{ mb: 3 }} />
          <Divider />
          <Tooltip
            title="Click here to Enable/Disable if you don't wish to send API campaigns to opted-out contacts"
            arrow
            placement="top"
          >
            <FormControlLabel
              control={<Switch />}
              label="Enable this if you don't wish to send API campaigns to opted-out contacts"
              sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
            />
          </Tooltip>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <OptInSetting />
      </Box>

      <Box sx={{ mt: 4 }}>
        <OptOutSetting />
      </Box>
    </DashboardContent>
  );
}
