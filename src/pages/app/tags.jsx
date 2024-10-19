import 'react-modal-video/css/modal-video.min.css';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import TagTable from 'src/sections/tag/tag-table/tag-table';
import { TagDialog } from 'src/sections/tag/hook/tag-dialog';
import InsertDataField from 'src/sections/workflow/autocomplete';

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
          title="Tags"
          Subheading="The first message tag signifies the interest of the user towards a particular product or
            service."
          showButton="True"
        />
        <Tooltip title="Click here to add chat assignment rule " arrow placement="top">
          <Button
            variant="contained"
            onClick={dialog.onTrue}
            color="primary"
            startIcon={
              <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
            }
            size="large"
            // variant="contained"
          >
            Add Tag
          </Button>
          <TagDialog open={dialog.value} onClose={dialog.onFalse} />
        </Tooltip>
      </Box>
      <TagTable />
      
    </DashboardContent>
  );
}
