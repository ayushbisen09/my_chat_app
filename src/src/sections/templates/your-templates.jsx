import { useTheme } from '@emotion/react';

import { Box, Tooltip } from '@mui/material';

import StatsCards from 'src/components/stats-card/stats-card';

import TemplatesTable from './components/table/table';

export default function YourTemplate(color, main) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          mt: '24px',
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
</Tooltip>      </Box>
      <TemplatesTable />
    </>
  );
}
