import 'react-modal-video/scss/modal-video.scss';

import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Card,
  Chip,
  Button,
  Switch,
  TextField,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { ChooseFacebookAd } from './hooks/dailogs/flow-start-node-facebook-ad-dailog';
import { ChooseTemaplte } from './hooks/dailogs/flow-start-node-choose-templates-dailog';

export default function FlowStartNode({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId, // Add the videoId prop to pass the video ID
  ...other
}) {
  const [tags, setTags] = useState(['Hi Chatflow', 'Support', 'Employee']); // Initialize with default tags
  const [tagInput, setTagInput] = useState(''); // Added state for tag input
  const [switchChecked, setSwitchChecked] = useState(false); // State for Switch component

  // Separate states for each dialog
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isFacebookAdDialogOpen, setIsFacebookAdDialogOpen] = useState(false);

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSwitchChange = (event) => {
    setSwitchChecked(event.target.checked);
  };

  // Handlers for dialog open/close
  const openTemplateDialog = () => setIsTemplateDialogOpen(true);
  const closeTemplateDialog = () => setIsTemplateDialogOpen(false);

  const openFacebookAdDialog = () => setIsFacebookAdDialogOpen(true);
  const closeFacebookAdDialog = () => setIsFacebookAdDialogOpen(false);

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        p: 2,
        backgroundColor: 'rgba(7, 141, 238, 0.08)',
        border: '2px solid #078DEE',
        
        ...sx,
      }}
      {...other} // Ensure other props do not include key
    >
      <CardHeader
        title={<Typography variant="h6">Flow Start</Typography>}
        action={
          <IconButton>
            <Iconify width={24} icon="octicon:dot-16" sx={{ color: '#078DEE' }} />
          </IconButton>
        }
        sx={{ p: 0, mb: 2 }}
      />
      <Card
        sx={{
          boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
          px: 1.5,
          pt: 3.5,
          pb: 2.5,
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'rgba(145, 158, 171)',
        }}
      >
        <Stack spacing={2}>
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={tags}
            onChange={(event, newValue) => setTags(newValue)}
            inputValue={tagInput}
            onInputChange={handleTagInputChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option} // Apply key directly here
                  variant="soft"
                  color="info"
                  size="small"
                  label={option}
                  {...getTagProps({ index })} // Apply other props here
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                onClick={handleAddTag}
                {...params}
                variant="outlined"
                size="large"
                label="Enter Keywords"
                helperText="Type, press enter to add keyword"
                placeholder="+ Enter Keywords"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <InputAdornment position="start" />,
                }}
                sx={{
                  '& .MuiAutocomplete-inputRoot': {
                    minHeight: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                  },
                }}
              />
            )}
          />

          <Stack direction="row" alignItems="center">
            <Typography variant="body2" sx={{ mr: 1 }}>
             Enable toggle for each sensitive Regex.
            </Typography>
            <Switch
              checked={switchChecked}
              onChange={handleSwitchChange}
              color="primary"
              size="medium"
            />
          </Stack>

          <TextField
            label="Enter Regex"
            helperText="Enter regex to match substring trigger"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="outlined"
            color="primary"
            size="Medium"
            onClick={openTemplateDialog}
            fullWidth
          >
            Choose Template
          </Button>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: -1, px: 1.4, fontSize: '12px' }}
          >
            Add up to 1 template to begin flow
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="Medium"
            onClick={openFacebookAdDialog}
            fullWidth
          >
            Choose Facebook Ad
          </Button>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: -1, px: 1.4, fontSize: '12px' }}
          >
            Add up to 1 Meta Ads to begin flow
          </Typography>

          <ChooseTemaplte open={isTemplateDialogOpen} onClose={closeTemplateDialog} />
          <ChooseFacebookAd open={isFacebookAdDialogOpen} onClose={closeFacebookAdDialog} />
        </Stack>
      </Card>
    </Card>
  );
}
