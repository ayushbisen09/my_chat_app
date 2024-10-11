import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Box,
  Card,
  Menu,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  IconButton,
  Typography,
  ListItemIcon,
} from '@mui/material';

import { updateListPlaceholder } from 'src/redux/slices/listNodeMessagePreviewSlice';

import { Iconify } from 'src/components/iconify';

import RenderListNode from './list-node-cards/list-card';
import RenderAddItemCard from './list-node-cards/add-item-card';
import renderTextButtonNode from './text-button-node-card/text-button-card';
import RenderListNodeAddSectionCard from './list-node-cards/list-node-add-section-card';
import { ListNodeMessagePreview } from './list-node-cards/hook/list-node-message-preview';


const commonCardStyles = {
  px: 1.5,
  pt: 3.5,
  pb: 2.5,
  mb: 3,
  borderRadius: '16px',
  border: '1px solid transparent',
  overflow: 'visible',
  position: 'relative', // Ensure the Box is positioned relative to this Card
  '&:hover': {
    border: '1px solid #919EAb',
    borderRadius: '16px',
  },
};

export default function ListNode({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  ...other
}) {
  const [cards, setCards] = useState([
    { id: 1, type: 'list-node', textFields: [] },
    {
      id: 2,
      type: 'text-button',
      textFields: [{ id: 1 }], // Initialize with one text field for the first card
    },
  ]);
  const [outsideCards, setOutsideCards] = useState([]); // State for cards outside the main card
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showListNodeMessagePreview, setShowListNodeMessagePreview] = useState(false);

  const addTextField = (cardId) => {
    setCards(
      cards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            textFields: [...card.textFields, { id: card.textFields.length + 1 }],
          };
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
    const newCard = { id: cards.length + 1, type, textFields: [] };
    console.log('Adding card:', newCard); // Debug line
    setCards([...cards, newCard]); // Adding new card at the end of the list
    handleClose();
  };

  const addItemCard = (cardId) => {
    const newCard = { id: cards.length + 1, type: 'add-item', textFields: [] };
    setCards([...cards, newCard]);
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

  const addOutsideCard = (type) => {
    const newCard = { id: outsideCards.length + 1, type, textFields: [] };

    setOutsideCards((prev) => [...prev, newCard]);
    handleClose();
  };
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        p: 2,
        backgroundColor: '#F4F6F8',
        border: '2px solid transparent',
        '&:hover': {
          border: '2px solid #078DEE',
          borderRadius: '16px',
        },
        overflow: 'visible',

        ...sx,
      }}
      {...other}
    >
      <CardHeader
        title={<Typography variant="h6">List</Typography>}
        action={
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <Iconify
                width={24}
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'text.secondary' }}
              />
            </IconButton>
            <IconButton onClick={() => handleHoverCardClick(cards[0].id)}>
              <Iconify width={24} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Box>
        }
        sx={{ p: 0, mb: 2 }}
      />

      <Card
        sx={{
          position: 'relative',
          boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
          px: 1.5,
          pt: 3.5,
          pb: 2.5,
          mb: 3,
          borderRadius: '8px',
          border: '1px solid transparent',
          overflow: 'visible',
          '&:hover': {
            border: '1px solid #919EAb',
            borderRadius: '8px',
          },
          '&:hover .hoverCard': {
            opacity: 1,
          },
        }}
      >
        {cards.map((card, index) => (
          <Box sx={{ position: 'relative' }} key={card.id}>
            {card.type === 'list-node' &&
              RenderListNode(card, index, deleteTextField, deleteCard, handleHoverCardClick)}
            {card.type === 'add-section' &&
              RenderListNodeAddSectionCard(
                card,
                index,
                addTextField,
                deleteTextField,
                deleteCard,
                handleHoverCardClick,
                addItemCard
              )}
            {card.type === 'add-item' &&
              RenderAddItemCard(
                card,
                index,
                addTextField,
                deleteTextField,
                deleteCard,
                handleHoverCardClick
              )}
          </Box>
        ))}

        <Button
          sx={{ mb: 3 }}
          variant="outlined"
          color="primary"
          size="medium"
          onClick={() => addCard('add-section')}
          fullWidth
          startIcon={
            <Iconify icon="heroicons:plus-circle-16-solid" style={{ width: 18, height: 18 }} />
          }
        >
          Add Section
        </Button>

        <TextField
          sx={{
            '& .MuiFilledInput-root': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            '& .MuiInputBase-input': {
              textAlign: 'center',
              padding: '12px',
            },
            '& .MuiInputLabel-root': {
              display: 'none', // Hide the label
            },
          }}
          variant="filled"
          fullWidth
          placeholder="List"
          InputProps={{
            sx: { textAlign: 'center' },
          }}
          onChange={(e) => dispatch(updateListPlaceholder(e.target.value))}  // Dispatch action on change
        />
        <Box
          className="hoverCard"
          sx={{
            position: 'absolute',
            top: 30,
            right: -40,
            width: '50px',
            backgroundColor: 'background.paper',
            border: '1px solid #ddd',
            borderRadius: '12px',
            opacity: 0,
            transition: 'opacity 0.1s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 10,
            p: 1,
          }}
        >
          <Tooltip title="Add">
            <IconButton>
              <Iconify width={24} icon="eva:plus-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Preview">
            <IconButton
              onClick={() => {
                console.log('clicked');
                setShowListNodeMessagePreview(true);
              }}
            >
              <Iconify width={20} icon="eva:eye-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>
          <ListNodeMessagePreview
            showListNodeMessagePreview={showListNodeMessagePreview}
            setShowListNodeMessagePreview={setShowListNodeMessagePreview}
          />
        </Box>
      </Card>

      {/* Render cards that are outside the main Card */}
      {outsideCards.map((card, index) => (
        <Box sx={{ position: 'relative' }}>
          {card.type === 'list-node' &&
            RenderListNode(card, card.id, deleteTextField, deleteCard, handleHoverCardClick)}

          {card.type === 'text-button' &&
            renderTextButtonNode(
              card,
              index,
              addTextField,
              deleteTextField,
              deleteCard,
              handleHoverCardClick
            )}
          {/* Add handling for other types if needed */}
        </Box>
      ))}

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
        <MenuItem onClick={() => addOutsideCard('text-button')}>
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
        <MenuItem onClick={() => addCard('list-node')}>
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
