import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Card, Stack, Tooltip, TextField, IconButton } from '@mui/material';

import { updateBody,updateFooter } from 'src/redux/slices/cataLougeMessageNodeMessagePreviewSlice';

import { Iconify } from 'src/components/iconify';

import { CatalougeMessageNodeMessagePreview } from './hook/catalouge-message-node-message-preview';

const RenderCatalougeMessageNodeCard = (
  card,
  index,
  deleteCard,
  handleHoverCardClick
) => {
  const [showCatalougeMessageNodeMessagePreview, setShowCatalougeMessageNodeMessagePreview] = useState(false);
  const id = card

  const dispatch = useDispatch();
  return (
    <Card
      key={id}
      sx={{
        position: 'relative',
        boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
        px: 1.5,
        pt: 3.5,
        pb: 2.5,
        mb: 3,

        borderRadius: '12px',
        border: '1px solid transparent',
        overflow: 'visible',
        '&:hover': {
          border: '1px solid #919EAb',
          borderRadius: '12px',
        },
        '&:hover .hoverCard': {
          opacity: 1,
        },
      }}
    >
      <Stack spacing={2}>
      <TextField
          label="Enter Body"
          helperText="Enter body here only  1024 letter allowed."
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          onChange={(e) => dispatch(updateBody(e.target.value))}

        />
       <TextField
          label="Enter Footer"
          helperText="Enter footer here only  60 letter allowed."
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          onChange={(e) => dispatch(updateFooter(e.target.value))}
        />
      </Stack>
      {/* Hover Card */}
      <Box
        className="hoverCard"
        sx={{
          position: 'absolute',
          top: 30,
          right: -37,
          width: '50px',
          height: 30 + (index === 0 ? 3 : 4) * 30,
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
          <IconButton onClick={() => handleHoverCardClick(id)}>
            <Iconify width={20} icon="eva:plus-fill" sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Preview">
          <IconButton
            onClick={() => {
              console.log('clicked');
              setShowCatalougeMessageNodeMessagePreview(true);
            }}
          >
            <Iconify width={20} icon="eva:eye-fill" sx={{ color: 'text.secondary' }} />
          </IconButton>
        </Tooltip>
        <CatalougeMessageNodeMessagePreview
          showCatalougeMessageNodeMessagePreview={showCatalougeMessageNodeMessagePreview}
          setShowCatalougeMessageNodeMessagePreview={setShowCatalougeMessageNodeMessagePreview}
        />
        {index > 0 && (
          <Tooltip title="Delete Content">
            <IconButton onClick={() => deleteCard(id)}>
              <Iconify
                width={20}
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'text.secondary' }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Card>
  );
};

export default RenderCatalougeMessageNodeCard;
