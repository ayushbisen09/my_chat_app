import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Button, Tooltip, useMediaQuery } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import StatsCards from 'src/components/stats-card/stats-card';
import PageHeader from 'src/components/page-header/page-header';

import BigCard from 'src/sections/dashbaord/components/big-card/big-card';
import DashboardTable from 'src/sections/dashbaord/components/table/table';
import { WhatsAppDialog } from 'src/sections/dashbaord/hooks/add-whatsApp-number';
import TrashTable from 'src/sections/dashbaord/components/trash-table/trash-table';
import DashBoardFolderCard from 'src/sections/dashbaord/components/folder-card/folder-card';

import { AuthContext } from 'src/auth/context/auth-context';

export default function Page({ sx, icon, title, total, color = 'warning', ...other }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const workflowDialog = useBoolean();
  const folderDialog = useBoolean();
  const [activeTable, setActiveTable] = useState('dashboard');
  const [selectedFolder, setSelectedFolder] = useState('Home'); // Add state to track selected folder
  const navigate = useNavigate();

  const dialog = useBoolean();

  const { authenticated, loading } = useContext(AuthContext); // Use AuthContext to check authentication

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/login');
    }
  }, [authenticated, loading, navigate]);

  // Handle trash click to toggle between trash table and dashboard table
  const handleTrashClick = () => {
    setActiveTable('trash');
  };

  // Handle home click to go back to dashboard table
  const handleHomeClick = () => {
    setActiveTable('dashboard');
    setSelectedFolder('Home'); // Reset to 'Home' when navigating back to dashboard
  };

  // Handle folder click to update selected folder name
  const handleFolderClick = (folderLabel) => {
    setSelectedFolder(folderLabel); // Set selected folder when clicked
  };

  if (loading) {
    return <div>Loading...</div>; // Replace this with a loader/spinner if needed
  }

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

      <Box
        sx={{
          mt: '40px',
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
        }}
      >
        {/* WhatsApp Number Added */}

        {/* WhatsApp Message Quota (Outgoing) */}
        <Tooltip title="Number of WhatsApp message alloted to you." arrow placement="top">
          <div>
            <StatsCards
              cardtitle="WhatsApp Message Credits Allotted"
              cardstats="10,000"
              icon_name="2card.png"
              icon_color="#FFA92E"
              bg_gradient={theme.vars.palette[color].main}
            />
          </div>
        </Tooltip>
        {/* Messaage Quota Used */}
        <Tooltip title="Number of WhatsApp message used frow alloted limit" arrow placement="top">
          <div>
            <StatsCards
              cardtitle="WhatsApp Message Credits Remaining"
              cardstats="2,000"
              icon_name="3card.svg"
              icon_color="#7D6ADB"
              bg_gradient="#8E33FF"
            />
          </div>
        </Tooltip>
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
      </Box>

      <Box
        sx={{
          mt: 4,
          gap: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        {/* Pass the folder click handler to FolderCard */}
        <DashBoardFolderCard
          onTrashClick={handleTrashClick}
          onHomeClick={handleHomeClick}
          onFolderClick={handleFolderClick}
        />

        <Box
          sx={{
            width: { xs: '100%', md: 'calc(100% - 346px)' },
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <BigCard />

       
          {activeTable === 'trash' ? (
            <TrashTable />
          ) : (
            <DashboardTable selectedFolder={selectedFolder} /> // Pass selected folder to DashboardTable2
          )}

          {/* <DashboardTable2 selectedFolder={selectedFolder} />  */}
        </Box>
      </Box>

      {/* <CreateWorkflowDialog open={workflowDialog.value} onClose={workflowDialog.onFalse} />
      <CreateFolderDialog open={folderDialog.value} onClose={folderDialog.onFalse} /> */}
    </DashboardContent>
  );
}
