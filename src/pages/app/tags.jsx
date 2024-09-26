// import React, { useState } from 'react';

// import { DataGrid } from '@mui/x-data-grid';
// import { Box, Button, Typography } from '@mui/material';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { DashboardContent } from 'src/layouts/dashboard';

// import { useTable } from 'src/components/table';
// import { Iconify } from 'src/components/iconify';
// import PageHeader from 'src/components/page-header/page-header';

// import { TagDialog } from 'src/sections/tag/hook/tag-dialog';
// import { Tagtable } from 'src/sections/tag/component/tag-table/tag-table';
// import TagsTable from 'src/sections/tag/tag-table/tag-table';

// const columns = [
//   {
//     field: 'shortcut',
//     headerName: 'Shortcut',
//     width: 558,
//     renderCell: (params) => (
//       <Box
//         sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
//       >
//         <Typography variant="subtitle2" sx={{ lineHeight: 1.5 }}>
//           {params.value}
//         </Typography>
//         <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
//           Created by: {params.row.createdBy}
//         </Typography>
//       </Box>
//     ),
//   },
//   { field: 'text', headerName: 'Text', width: 542, flex: 1 },
//   {
//     field: 'type',
//     headerName: 'Type',
//     width: 288,
//   },
// ];

// function DataGridBasic({ data }) {
//   return (
//     <DataGrid
//       columns={columns}
//       rows={data}
//       checkboxSelection
//       disableRowSelectionOnClick
//       pageSize={data.length}
//       rowHeight={76}
//       rowsPerPageOptions={[data.length]}
//       sx={{
//         '& .MuiDataGrid-cell:focus': {
//           outline: 'none',
//           display: 'flex',
//           alignItems: 'center',
//         },
//         '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
//           outline: 'none',
//         },
//         '& .MuiDataGrid-columnHeaderTitle': {
//           fontWeight: 'bold',
//         },
//       }}
//     />
//   );
// }

// const TagsPage = () => {
//   const [copied, setCopied] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(1);
//   const [isOpenList, setOpenList] = useState(null);

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     handleClose();
//   };

//   const handleClose = () => {
//     setOpenList(null);
//   };

//   const handleOpen = (event) => {
//     setOpenList(event.currentTarget);
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(codeSnippet);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const codeSnippet = `<script type="text/javascript" async defer>
// (function (w, d, s, o, f, js, fjs) {
//   w[o] =
//     w[o] ||
//     function () {
//       (w[o].q = w[o].q || []).push(arguments);
//     };
// </script>`;

//   const dialog = useBoolean();

//   // Example data for DataGrid
//   const data = [
//     {
//       id: 1,
//       shortcut: '/Hello',
//       createdBy: 'Ankit Mandli',
//       text: 'Hello User this is canned message.',
//       type: 'Image',
//     },
//     {
//       id: 2,
//       shortcut: '/Hi',
//       createdBy: 'Ankit Mandli',
//       text: 'Hi, thanks for contacting us.',
//       type: 'Text',
//     },
//     {
//       id: 3,
//       shortcut: '/Hi',
//       createdBy: 'Ankit Mandli',
//       text: 'Hi, thanks for contacting us.',
//       type: 'Image',
//     },
//     {
//       id: 4,
//       shortcut: '/Hi',
//       createdBy: 'Ankit Mandli',
//       text: 'Hi, thanks for contacting us.',
//       type: 'Image',
//     },
//     {
//       id: 5,
//       shortcut: '/Hi',
//       createdBy: 'Ankit Mandli',
//       text: 'Hi, thanks for contacting us.',
//       type: 'Image',
//     },
//     {
//       id: 6,
//       shortcut: '/Hi',
//       createdBy: 'Ankit Mandli',
//       text: 'Hi, thanks for contacting us.',
//       type: 'Image',
//     },
//   ];
//   const table = useTable({ defaultRowsPerPage: 10 });

//   return (
//     <DashboardContent maxWidth="xl" backgroundColor="">
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <PageHeader
//           title="Tags"
//           Subheading="The first message tag signifies the interest of the user towards a particular product or
//             service."
//           showButton="True"
//         />
//         <Button
//           variant="contained"
//           onClick={dialog.onTrue}
//           sx={{
//             backgroundColor: '#078dee',
//             '&:hover': {
//               backgroundColor: '#0351ab',
//             },
//           }}
//           startIcon={
//             <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
//           }
//           size="large"
//           // variant="contained"
//         >
//           Add Tag
//         </Button>
//         <TagDialog open={dialog.value} onClose={dialog.onFalse} />
//       </Box>
//       <Box sx={{ mt: 4 }} />

//       <Tagtable />
//       <TagsTable/>
//     </DashboardContent>
//   );
// };

// export default TagsPage;
import 'react-modal-video/css/modal-video.min.css';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip ,useMediaQuery} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import TagTable from 'src/sections/tag/tag-table/tag-table';
import { TagDialog } from 'src/sections/tag/hook/tag-dialog';



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
        <Tooltip
                    title="Click here to add chat assignment rule "
                    arrow
                    placement="top"
                    
                  >
         <Button
           variant="contained"
           onClick={dialog.onTrue}
          sx={{
             backgroundColor: '#078dee',
            '&:hover': {
              backgroundColor: '#0351ab',
            },
          }}
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
      <TagTable/>
    </DashboardContent>
  );
}

