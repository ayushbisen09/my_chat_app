/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useDispatch } from 'react-redux';

import { Box, Card, Stack, Button, TextField, Typography, IconButton } from '@mui/material';

import { updateSectionTitle } from 'src/redux/slices/listNodeMessagePreviewSlice';

import { Iconify } from 'src/components/iconify';

const RenderListNodeAddSectionCard = (
  card,
  index,
  addTextField,
  deleteTextField,
  deleteCard, // This will be used to delete the card
  handleHoverCardClick,
  addItemCard
) => {
  const dispatch = useDispatch();
  const { id } = card;

  const handleTitleChange = (event) => {
    dispatch(updateSectionTitle({ cardId: card.id, title: event.target.value }));
  };
  return (
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
        <>{/* Render the text fields or other content if needed */}</>
      ) : (
        <Stack spacing={3} sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Section Title"
              variant="outlined"
              fullWidth
              onChange={handleTitleChange}
            />
            <IconButton onClick={() => deleteCard(card.id)}>
              {' '}
              {/* Call deleteCard here */}
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
        Add Items
      </Button>

      {/* Hover Card */}
    </Card>
  );
};

export default RenderListNodeAddSectionCard;
