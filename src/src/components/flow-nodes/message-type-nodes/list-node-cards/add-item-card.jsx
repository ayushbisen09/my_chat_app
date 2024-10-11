import React from 'react';
import { useDispatch } from 'react-redux';

import { Box, Card, Stack, TextField, IconButton } from '@mui/material';

import { updateItemTitle, updateItemDescription } from 'src/redux/slices/listNodeMessagePreviewSlice';

import { Iconify } from 'src/components/iconify';

const RenderAddItemCard = (
  card,
  index,
  addTextField,
  deleteTextField,
  deleteCard, // Ensure this is passed as a prop
  handleHoverCardClick
) => {
  const dispatch = useDispatch();
  const id ={ card}
  const handleTitleChange = (event) => {
    dispatch(updateItemTitle(event.target.value));
  };

  const handleDescriptionChange = (event) => {
    dispatch(updateItemDescription(event.target.value));
  };
return(



  <Card
    key={id}
    sx={{
      position: 'relative',
      px: 1.5,
      pt: 3.5,
      pb: 2.5,
      mb: 3,
      borderRadius: '8px',
      border: '1px solid transparent',
      overflow: 'visible',
      '&:hover': {
        border: '1px solid #919EAb',
        borderRadius: '16px',
      },
      '&:hover .hoverCard': {
        opacity: 1,
      },
    }}
  >
    <Stack spacing={3} sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Box for both TextFields */}
        <Box sx={{ flex: 1, mr: 2 }}>
          <TextField
            label="Enter Title"
            helperText="Enter title here only 24 letters allowed."
            variant="outlined"
            fullWidth
            multiline
            rows={1}
            sx={{ mb: 2 }}
            onChange={handleTitleChange} // Dispatch title change
          />
          <TextField
            label="Enter Description"
            helperText="Enter description here only 72 letters allowed."
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            onChange={handleDescriptionChange} // Dispatch description change
          />
        </Box>
        {/* Box for Icons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Delete card icon */}
          <IconButton onClick={() => deleteCard(id)}>
            <Iconify width={20} icon="solar:trash-bin-trash-bold" />
          </IconButton>
          <IconButton>
            <Iconify width={24} icon="octicon:dot-16" sx={{ color: '#078DEE' }} />
          </IconButton>
          {/* Additional icons can be added here */}
        </Box>
      </Box>
    </Stack>
  </Card>
);
};

export default RenderAddItemCard;
