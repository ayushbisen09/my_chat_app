import React, { useState } from 'react';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Divider, Tooltip, CardHeader } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  // State to manage the switch toggle
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  // Handler to toggle the switch
  const handleToggleSound = (event) => {
    setIsSoundEnabled(event.target.checked);
  };

  return (
    <DashboardContent maxWidth="xl">
        <PageHeader
          title="Notification Preferences"
          Subheading="You can customize different notifications for user chats requesting for intervention."
          showButton={false}
        />
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardHeader
              title="Sound Notification"
              sx={{ mb: 3 }}
            />
            <Divider />
            <Tooltip title="Click to disable/enable sound alerts." arrow placement="top">
              <FormControlLabel
                control={
                  <Switch
                    id="toggle-sound"
                    checked={isSoundEnabled}
                    onChange={handleToggleSound}
                  />
                }
                label={isSoundEnabled ? "Disable sound notification" : "Enable sound notification"}
                sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
              />
            </Tooltip>
          </Card>
        </Box>
      </DashboardContent>
  );
}
