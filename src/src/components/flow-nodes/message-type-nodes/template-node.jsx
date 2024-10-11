import React, { useState } from 'react';

import {
  Box,
  Card,
  Menu,
  Button,
  MenuItem,
  Typography,
  IconButton,
  CardHeader,
  ListItemIcon,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import RenderTemplateNode from './template-node-card/template-node-card'; // Updated import

export default function TemplateNode({ sx, ...other }) {
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'text-button',
      textFields: [{ id: 1 }], // Initialize with one text field for the first card
    },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addCard = (type) => {
    if (type === 'text-button') {
      setCards([...cards, { id: cards.length + 1, type, textFields: [{ id: 1 }] }]);
    }
    handleClose();
  };

  const addListCard = (type) => {
    if (type === 'list') {
      setCards([...cards, { id: cards.length + 1, type, textFields: [{ id: 1 }] }]);
    }
    handleClose();
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
        // width:'350px',
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
        title={<Typography variant="h6">Template</Typography>}
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
        <RenderTemplateNode
          key={card.id}
          card={card}
          index={index}
          addTextField={addTextField}
          deleteTextField={deleteTextField}
          deleteCard={deleteCard}
          handleHoverCardClick={handleHoverCardClick}
        />
      )}
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        onClick={handleClick}
        fullWidth
        startIcon={
          <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
        }
      >
        Add Content
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Choose Content Type
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => addCard('text-button')}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="teenyicons:button-outline" />
            Text + Button
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="ant-design:youtube-outlined" />
            Media
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={() => addListCard('list')}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="typcn:th-list-outline" />
            List
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="ion:cube-outline" />
            Single Product Message
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="mdi:shopping-outline" />
            Multi Product Message
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="icon-park-outline:page-template" />
            Template
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Iconify width={20} sx={{ mr: 1 }} icon="mdi:face-agent" />
            Intervention
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Card>
  );
}
