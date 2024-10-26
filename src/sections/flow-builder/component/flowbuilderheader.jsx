import React, { useState } from 'react';

import { Box, Button, Switch, Tooltip, TextField, Typography, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { FallbackAndIntentDialog } from '../hook/fallback-&-intent-dialog';

const FlowBuilder = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Flow Builder');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false); // Exit edit mode when clicking outside the input
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false); // Exit edit mode on Enter key press
    }
  };
  const dialog = useBoolean();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const handleSwitchChange = (event) => {
    setIsSwitchOn(event.target.checked);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        background: '#ffffff',
        height: 70,
        pl: 44,
        pr: 3,
      }}
    >
      <Box sx={{ m: 0, display: 'flex', alignItems: 'center' }}>
        {isEditing ? (
          <Tooltip title="Enter New Flow Name" arrow placement="top">
            <TextField
              value={title}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              onKeyPress={handleKeyPress}
              variant="outlined"
              size="small"
              autoFocus
              sx={{ mr: 3 }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Flow Name" arrow placement="top">
            <Typography variant="h6" fontWeight="600" sx={{ mr: 3 }}>
              {title}
            </Typography>
          </Tooltip>
        )}
        <Tooltip title="Click here to edit the flow name" arrow placement="top">
          <IconButton onClick={handleEditClick}>
            <Iconify icon="mingcute:pencil-fill" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip
          title={`If you want to change flow to ${isSwitchOn ? 'inactive' : 'active'}, use this switch.`}
          arrow
          placement="top"
        >
          <Switch checked={isSwitchOn} onChange={handleSwitchChange} />
        </Tooltip>
        <Tooltip title="Click here to open fallback and intent dialog box" arrow placement="top">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={dialog.onTrue}
          sx={{ mr: 2 }}
        >
          Fallback & Intents
        </Button>
        </Tooltip>
        <Tooltip title="Click here to save flow" arrow placement="top">
        <Button variant="contained" color="primary" size="small">
          Save
        </Button>
        </Tooltip>
      </Box>
      <FallbackAndIntentDialog open={dialog.value} onClose={dialog.onFalse} />
    </Box>
  );
};

export default FlowBuilder;
