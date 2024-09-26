import React, { useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { useTable } from 'src/components/table';
import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import { QuickRepliesDialog } from 'src/sections/quick-replies/hook/quick-replies-dialog';
import { QuickReplyListView } from 'src/sections/quick-replies/component/quick-reply-list-view';

const columns = [
  {
    field: 'shortcut',
    headerName: 'Shortcut',
    width: 558,
    renderCell: (params) => (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
      >
        <Typography variant="subtitle2" sx={{ lineHeight: 1.5 }}>
          {params.value}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          Created by: {params.row.createdBy}
        </Typography>
      </Box>
    ),
  },
  { field: 'text', headerName: 'Text', width: 542, flex: 1 },
  { field: 'type', headerName: 'Type', width: 288 },
];

function DataGridBasic({ data }) {
  return (
    <DataGrid
      columns={columns}
      rows={data}
      checkboxSelection
      disableRowSelectionOnClick
      pageSize={data.length}
      rowHeight={76}
      rowsPerPageOptions={[data.length]}
      sx={{
        '& .MuiDataGrid-cell:focus': {
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
        },
      }}
    />
  );
}

const QuickRepliesPage = () => {
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isOpenList, setOpenList] = useState(null);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose();
  };

  const handleClose = () => {
    setOpenList(null);
  };

  const handleOpen = (event) => {
    setOpenList(event.currentTarget);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeSnippet = `<script type="text/javascript" async defer>
(function (w, d, s, o, f, js, fjs) {
  w[o] =
    w[o] ||
    function () {
      (w[o].q = w[o].q || []).push(arguments);
    };
</script>`;

  const dialog = useBoolean();

  // Example data for DataGrid
  const data = [
    {
      id: 1,
      shortcut: '/Hello',
      createdBy: 'Ankit Mandli',
      text: 'Hello User this is canned message.',
      type: 'Image',
    },
    {
      id: 2,
      shortcut: '/Hi',
      createdBy: 'Ankit Mandli',
      text: 'Hi, thanks for contacting us.',
      type: 'Text',
    },
    {
      id: 3,
      shortcut: '/Hi',
      createdBy: 'Ankit Mandli',
      text: 'Hi, thanks for contacting us.',
      type: 'Image',
    },
    {
      id: 4,
      shortcut: '/Hi',
      createdBy: 'Ankit Mandli',
      text: 'Hi, thanks for contacting us.',
      type: 'Image',
    },
    {
      id: 5,
      shortcut: '/Hi',
      createdBy: 'Ankit Mandli',
      text: 'Hi, thanks for contacting us.',
      type: 'Image',
    },
    {
      id: 6,
      shortcut: '/Hi',
      createdBy: 'Ankit Mandli',
      text: 'Hi, thanks for contacting us.',
      type: 'Image',
    },
  ];
  const table = useTable({ defaultRowsPerPage: 10 });

  return (
    <DashboardContent maxWidth="xl" backgroundColor="">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <PageHeader
          title="Quick Replies"
          Subheading="You can save quick replies templates and use them in Inbox."
        />
        <Button
          sx={{
            // marginTop: 5,
            backgroundColor: '#078dee',
            '&:hover': {
              backgroundColor: '#0351ab',
            },
          }}
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
          size="large"
          variant="contained"
          onClick={dialog.onTrue} // Added onClick event
        >
          Add Quick Replies
        </Button>
        <QuickRepliesDialog open={dialog.value} onClose={dialog.onFalse} />
      </Box>
      <Box sx={{ mt: 4 }} />

      <QuickReplyListView />
    </DashboardContent>
  );
};

export default QuickRepliesPage;
