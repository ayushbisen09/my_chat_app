import React, { useState } from 'react';

import { Box, Card, Typography, IconButton, CardHeader } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import RenderCatalougeMessageNodeCard from './catalouge-node-card/catalouge-message-node-card';

export default function CatalougeMessageNode({ sx, ...other }) {
  const [cards, setCards] = useState([
    {
      id: 1,

      textFields: [{ id: 1 }], // Initialize with one text field for the first card
    },
  ]);

  const addTextField = (cardId) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardId) {
          if (card.textFields.length < 3) {
            return {
              ...card,
              textFields: [...card.textFields, { id: card.textFields.length + 1 }],
            };
          }
        }
        return card;
      })
    );
  };

  const deleteTextField = (cardId, fieldId) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            textFields: card.textFields.filter((field) => field.id !== fieldId),
          };
        }
        return card;
      })
    );
  };
  const deleteCard = (cardId) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };
  const handleHoverCardClick = (cardId) => {
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    if (cardIndex !== -1) {
      const newCard = {
        ...cards[cardIndex],
        id: cards.length + 1,
      };
      setCards([...cards, newCard]);
    }
  };
  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        p: 2,
        backgroundColor: '#F4F6F8',
        border: '2px solid transparent',
        overflow: 'visible',
        '&:hover': {
          border: '2px solid #078DEE',
          borderRadius: '16px',
        },
        ...sx,
      }}
      {...other}
    >
      <CardHeader
        title={<Typography variant="h6">Catalogue Message</Typography>}
        action={
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <Iconify
                width={24}
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'text.secondary' }}
              />
            </IconButton>
            <IconButton>
              <Iconify width={24} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Box>
        }
        sx={{ p: 0, mb: 2 }}
      />
      {cards.map((card, index) =>
        RenderCatalougeMessageNodeCard(
          card,
          index,
          addTextField,
          deleteTextField,
          deleteCard,
          handleHoverCardClick
        )
      )}
    </Card>
  );
}
