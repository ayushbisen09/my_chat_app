import React from 'react';

import {  Card, Stack, TextField,  } from '@mui/material';



const renderMultiproductNode = (
  card,
  index,

  deleteTextField,
  deleteCard,
  handleHoverCardClick
) => (
  <Card
    key={card.id}
    sx={{
      
      px: 1.5,
      pt: 3.5,
      pb: 2.5,
      mb: 3,

   
    }}
  >
    <Stack spacing={2}>
      <TextField
        label="Enter Header"
        helperText="Enter header here only  20 letter allowed."
        variant="outlined"
        fullWidth
        multiline
        rows={2}
      />
      <TextField
        label="Enter Body"
        helperText="Enter body here only  1024 letter allowed."
        variant="outlined"
        fullWidth
        multiline
        rows={4}
      />
      <TextField
        label="Enter Footer"
        helperText="Enter footer here only  60 letter allowed."
        variant="outlined"
        fullWidth
        multiline
        rows={3}
      />
    </Stack>

    {/* Hover Card */}
    
  </Card>
);

export default renderMultiproductNode;
