import React, { useState } from 'react';

import { Box, Tab, Card, Tabs, Switch, Button, Typography, CardContent } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { FallbackAndIntentDialog } from '../../hook/fallback-&-intent-dialog';

const Sidebar = () => {
  const [tabValue, setTabValue] = useState(0); // 0 for Messages, 1 for Actions

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const dialog = useBoolean();

  // Define card data for each tab
  const messagesCardData = [
    { icon: "tabler:hand-click", text: "Text Button" },
    { icon: "basil:youtube-outline", text: "Media Button" },
    { icon: "fluent:clipboard-bullet-list-20-regular", text: "List" },
    { icon: "uil:invoice", text: "Item List" },
    { icon: "f7:cube", text: "Single Product" },
    { icon: "la:cubes", text: "Multi Product" },
    { icon: "icon-park-outline:page-template", text: "Template" },
  ];

  const actionsCardData = [
    
    { icon: "mdi:face-agent", text: "Intervention" },
    { icon: "oui:logstash-if", text: "Condition" },
    { icon: "hugeicons:location-04", text: "Ask Address" },
    { icon: "hugeicons:maps-location-02", text: "Ask Location" },
    { icon: "ri:question-line", text: "Ask Question" },
    { icon: "codicon:file-media", text: "Ask Media" },
    { icon: "material-symbols:user-attributes-outline-rounded", text: "Set Attribute" },
    { icon: "mdi:tag-plus-outline", text: "Add Tag" },
    { icon: "icon-park-outline:api", text: "API Request" },
  ];

  // Determine which card data to use based on the selected tab
  const cardData = tabValue === 0 ? messagesCardData : actionsCardData;

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        p: 5,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Box sx={{ pb: 1, m: 0 }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Flow Builder <Iconify icon="mingcute:pencil-fill" />
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 ,p: 0 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>Flow On/Off</Typography>
          <Switch  />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>Set Flow</Typography>
          <Button variant="outlined" color="primary" onClick={dialog.onTrue}>Fallback & Intents</Button>
          <FallbackAndIntentDialog open={dialog.value} onClose={dialog.onFalse} />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>Save your flow</Typography>
          <Button variant="contained" color="inherit">Save</Button>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="scrollable tabs example"
          sx={{ position: 'static', mb: 3 }}
        >
          <Tab label="Messages" />
          <Tab label="Actions" />
        </Tabs>
      </Box>

      {/* Cards based on selected tab */}
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{ mb: 3 }}
      >
        {cardData.reduce((rows, card, index) => {
          if (index % 2 === 0) rows.push([]);
          rows[rows.length - 1].push(card);
          return rows;
        }, []).map((row, rowIndex) => (
          <Box key={rowIndex} display="flex" gap={3}>
            {row.map((card, cardIndex) => (
              <Card key={cardIndex} sx={{ minWidth: 128 }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(145, 158, 171, 0.06)',
                    height: 98,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(145, 158, 171, 0.2)',
                      '& .icon': {
                        height: 50,
                        width: 50,
                      },
                    },
                  }}
                >
                  <Iconify
                    icon={card.icon}
                    className="icon"
                    sx={{
                      height: 40,
                      width: 40,
                      color: 'rgba(145, 158, 171, 0.5)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </Box>
                <CardContent  sx={{ padding: '16px !important'}}>
                  <Typography sx={{ fontSize: '14px', fontWeight: '400',
    textAlign: 'center'}}>{card.text}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
