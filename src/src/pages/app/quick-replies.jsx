import React from 'react';

import { Box, Button } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import { QuickRepliesDialog } from 'src/sections/quick-replies/hook/quick-replies-dialog';
import QuickRepliesTable from 'src/sections/quick-replies/component/table/quick-replies-table';

const QuickRepliesPage = () => {
  const dialog = useBoolean();

  // Example data for DataGrid

  return (
    <DashboardContent maxWidth="xl" >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <PageHeader
          title="Quick Replies"
          Subheading="You can save quick replies templates and use them in Inbox."
        />
        <Button
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          color='primary'
          onClick={dialog.onTrue} // Added onClick event
        >
          Add Quick Replies
        </Button>
        <QuickRepliesDialog open={dialog.value} onClose={dialog.onFalse} />
      </Box>
      <Box sx={{ mt: 4 }} />

      <QuickRepliesTable />
    </DashboardContent>
  );
};

export default QuickRepliesPage;
