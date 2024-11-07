import { useTheme } from '@emotion/react';
import React, { useState, useCallback } from 'react';

import { Card, Divider, MenuItem, TextField, CardHeader, CardContent } from '@mui/material';

import ApiCampaign from '../api-campaign/api-campaign';
import BroadcastCampaign from '../broadcast-campaign/broadcast-campaign';

export default function WhatsAppBroadcast() {
  const theme = useTheme();

  const TEMPLATES = [
    { value: 'broadcastCampaign', label: 'Broadcast Campaign' },
    { value: 'apiCampaign', label: 'API Campaign' },
  ];

  const [template, setTemplate] = useState('broadcastCampaign'); // Set default value here

  const handleChangeTemplate = useCallback((event) => {
    setTemplate(event.target.value);
  }, []);

  // Define helper texts based on template
  const helperTexts = {
    broadcastCampaign:
      'Select and filter among your existance audience & Broadcast customized Template or Regular message.',
    apiCampaign:
      'Connect your existing systems with our endpoints & send notifications to your users on WhatsApp.',
  };

  return (
    <Card sx={{ mt: '40px' }}>
      <CardHeader title="Whatsapp Broadcast" sx={{ mb: 3 }} />
      <Divider />
      <CardContent>
        <TextField
        sx={{ mb: 3 }}
          id="select-currency-label-x"
          select
          fullWidth
          label="Select Broadcast Type"
          placeholder="Select Broadcast Type"
          value={template}
          onChange={handleChangeTemplate}
          helperText={helperTexts[template]} // Use helperTexts object
        >
          {TEMPLATES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      {template === 'broadcastCampaign' && <BroadcastCampaign />}
      {template === 'apiCampaign' && <ApiCampaign />}
      </CardContent>
    </Card>
  );
}
