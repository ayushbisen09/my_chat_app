import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Card,
  Select,
  MenuItem,
  TextField,
  CardHeader,
  Typography,
  IconButton,
  FormHelperText,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function AskMediaNode({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  ...other
}) {
  const [selectedMedia, setSelectedMedia] = useState('any');
  const [selectedAttribute, setSelectedAttribute] = useState('');

  const handleMediaChange = (event) => {
    setSelectedMedia(event.target.value);
    // Clear the attribute when changing the condition
  };

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        p: 2,
        // width: '350px',
        backgroundColor: '#F4F6F8',
        border: '2px solid transparent',
        '&:hover': {
          border: '2px solid #078DEE',
          borderRadius: '16px',
        },
        ...sx,
      }}
      {...other}
    >
      <CardHeader
        title={<Typography variant="h6">Ask Media</Typography>}
        action={
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <Iconify width={24} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
            <IconButton>
              <Iconify
                width={24}
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'text.secondary' }}
              />
            </IconButton>
            <IconButton>
              <Iconify width={24} icon="octicon:dot-16" sx={{ color: '#078DEE' }} />
            </IconButton>
          </Box>
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
          border: '1px solid transparent',
          '&:hover': {
            border: '1px solid #919EAb',
            borderRadius: '16px',
          },
        }}
        {...other}
      >
        <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField
            label="Enter Message"
            helperText="Add message 1024 letters allowed."
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </FormControl>
        <FormControl fullWidth size="large" sx={{ mb: 3 }}>
          <InputLabel id="condition-select-label">Select Attribute</InputLabel>
          <Select
            labelId="condition-select-label"
            id="condition-select"
            value={selectedAttribute}
            label="Select Attribute"
            onChange={handleAttributeChange}
          >
            <MenuItem value="Equal">User Attribute 1</MenuItem>
            <MenuItem value="Exists">User Attribute 2</MenuItem>
            <MenuItem value="Time In">User Attribute 3</MenuItem>
          </Select>
          <FormHelperText>Select attribute to store media</FormHelperText>
        </FormControl>

        <FormControl fullWidth size="large" sx={{ mb: 3 }}>
          <InputLabel id="condition-select-label">Select Media Type</InputLabel>
          <Select
            labelId="condition-select-label"
            id="condition-select"
            value={selectedMedia}
            label="Select Media Type"
            onChange={handleMediaChange}
          >
            <MenuItem value="any">Any</MenuItem>
            <MenuItem value="image">Image</MenuItem>
            <MenuItem value="video">Video</MenuItem>
            <MenuItem value="document">Document</MenuItem>
            <MenuItem value="audio">Audio</MenuItem>
            
          </Select>
          <FormHelperText>Select media type of the reply.</FormHelperText>
        </FormControl>

        {/* Conditionally render fields based on selected condition */}
        
        <FormControl fullWidth sx={{ mb: 0 }}>
            
              <TextField
                sx={{ mb: 3 }}
                label="Enter number"
                helperText="Number of Attempt"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                defaultValue={1}
                InputLabelProps={{ shrink: true }}
                placeholder="Enter Number of Attempt"
              />
              <TextField
                label="Enter Message"
                helperText="Enter validation error message. Only 1024 characters allowed."
                variant="outlined"
                fullWidth
                multiline
                rows={3}
              />
            </FormControl>
      </Card>
    </Card>
  );
}
