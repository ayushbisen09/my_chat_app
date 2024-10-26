import React, { useState } from 'react';

import { Box, Tab, Card, Tabs, Tooltip, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';


const Sidebar = () => {
  const [tabValue, setTabValue] = useState(0); // 0 for Messages, 1 for Actions

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const dialog = useBoolean();

  // Define card data for each tab
  const messagesCardData = [
    { icon: 'tabler:hand-click', text: 'Text Button' },
    { icon: 'basil:youtube-outline', text: 'Media Button' },
    { icon: 'fluent:clipboard-bullet-list-20-regular', text: 'List' },
    { icon: 'uil:invoice', text: 'Item List' },
    { icon: 'f7:cube', text: 'Single Product' },
    { icon: 'la:cubes', text: 'Multi Product' },
    { icon: 'icon-park-outline:page-template', text: 'Template' },
  ];

  const actionsCardData = [
    { icon: 'mdi:face-agent', text: 'Intervention' },
    { icon: 'oui:logstash-if', text: 'Condition' },
    { icon: 'hugeicons:location-04', text: 'Ask Address' },
    { icon: 'hugeicons:maps-location-02', text: 'Ask Location' },
    { icon: 'ri:question-line', text: 'Ask Question' },
    { icon: 'codicon:file-media', text: 'Ask Media' },
    { icon: 'material-symbols:user-attributes-outline-rounded', text: 'Set Attribute' },
    { icon: 'mdi:tag-plus-outline', text: 'Add Tag' },
    { icon: 'icon-park-outline:api', text: 'API Request' },
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
        pt: 3,
        px: 5,
        pb: 5,
      }}
    >
      <Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="scrollable tabs example"
          sx={{ position: 'static', mb: 5 }}
        >
           <Tooltip title="Message type nodes" arrow placement="top">
          <Tab label="Messages" />
          </Tooltip>
          <Tooltip title="Action type nodes" arrow placement="top">
          <Tab label="Actions" />
          </Tooltip>
        </Tabs>
      </Box>

      {/* Cards based on selected tab */}
      <Box display="flex" flexDirection="column" gap={1.5}>
        {cardData
          .reduce((rows, card, index) => {
            if (index % 2 === 0) rows.push([]);
            rows[rows.length - 1].push(card);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <Box key={rowIndex} display="flex" gap={1.5}>
              {row.map((card, cardIndex) => (
                <Card key={cardIndex} sx={{ borderRadius: '8px' }}>
                  <Tooltip 
      title={`Drag and drop this node ${card.text}`} 
      arrow 
      placement="top"
    >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(145, 158, 171, 0.06)',
                      height: 90,
                      width: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(145, 158, 171, 0.2)',
                        // '& .icon': {
                        //   height: 36,
                        //   width: 36,
                        // },
                      },
                    }}
                  >
                    <Iconify
                      icon={card.icon}
                      className="icon"
                      sx={{
                        height: 24,
                        width: 24,
                        color: 'rgba(145, 158, 171, 0.9)',
                        transition: 'all 0.3s ease',

                        mt: 0.2,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: '500',
                        textAlign: 'center',
                        mt: 1.5,
                        px: 0.5,
                      }}
                    >
                      {card.text}
                    </Typography>
                  </Box>
                  </Tooltip>

                  {/* <CardContent sx={{ px: '8px !important', py: '24px !important' }}>
                  </CardContent> */}
                </Card>
              ))}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
