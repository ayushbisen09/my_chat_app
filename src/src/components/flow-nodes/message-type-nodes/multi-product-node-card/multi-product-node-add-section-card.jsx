import React from 'react';

import { Box, Card, Stack, Button, TextField, Typography, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const renderMultiproductNodeAddSectionCard = (
  card,
  index,
  addTextField,
  deleteTextField,
  deleteCard, // This will be used to delete the card
  handleHoverCardClick,
  addItemCard
) => (
  <Card
    sx={{
      position: 'relative',
      px: 1.5,
      pt: 3.5,
      pb: 2.5,
      mb: 3,
      borderRadius: '8px', 
    }}
  >
    {/* Check if card.textFields has data */}
    {card.textFields.length > 0 ? (
      <>
        {/* Render the text fields or other content if needed */}
      </>
    ) : (
      <Stack spacing={3} sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField label="Section Title" variant="outlined" fullWidth />
          <IconButton onClick={() => deleteCard(card.id)}> {/* Call deleteCard here */}
            <Iconify width={20} icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: -2, px: 1.4, fontSize: '12px' }}
        >
          Enter section title 20 letters allowed
        </Typography>
      </Stack>
    )}

    {/* Button to Add New Section */}
    <Button
      variant="outlined"
      color="primary"
      size="medium"
      fullWidth
      startIcon={
        <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
      }
      onClick={() => addItemCard(card.id)} // Trigger the addition of a new card
    >
      Add Products
    </Button>

    {/* Hover Card */}
    
  </Card>
);

export default renderMultiproductNodeAddSectionCard;
