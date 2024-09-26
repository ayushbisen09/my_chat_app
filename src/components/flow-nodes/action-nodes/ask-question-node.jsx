import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Card,
  Stack,
  Select,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  Typography,
  IconButton,
  FormHelperText
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function AskQuestionNode({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  ...other
}) {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState('');

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
    // Clear the attribute when changing the condition
  };

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };
  const formatOptions = [
    { value: 'any', label: 'Any', tooltip: 'Any format allowed' },
    { value: 'text', label: 'Text', tooltip: 'Input should be text' },
    { value: 'number', label: 'Number', tooltip: 'Input should be a number' },
    { value: 'date', label: 'Date', tooltip: 'Input should be a date' },
    { value: 'true/false', label: 'True/False', tooltip: 'Input should be true or false' },
    { value: 'email', label: 'Email', tooltip: 'Input should be an email address' },
    { value: 'regex', label: 'Regex', tooltip: 'Input should match a regular expression' }
  ];

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
        title={<Typography variant="h6">Ask Question</Typography>}
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
          <FormHelperText>Select attribute to store address</FormHelperText>
        </FormControl>

        <FormControl fullWidth size="large" sx={{ mb: 3 }}>
    <InputLabel id="Select Format">Select Format</InputLabel>
    <Select
      labelId="Select Format"
      id="Select Format"
      value={selectedCondition}
      label="Select Format"
      onChange={handleConditionChange}
    >
      {formatOptions.map(({ value, label, tooltip }) => (
        <Tooltip key={value} title={tooltip} placement="left">
          <MenuItem value={value}>{label}</MenuItem>
        </Tooltip>
      ))}
    </Select>
    <FormHelperText>Select format of the reply.</FormHelperText>
  </FormControl>

        {/* Conditionally render fields based on selected condition */}
        {selectedCondition === 'text' && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 0 }}>
              <TextField
                sx={{ mb: 3 }}
                label="Enter Number"
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
          </Stack>
        )}

        {selectedCondition === 'number' && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 0 }}>
              <Box sx={{ mb: 3 }}>
                <Box display="flex" gap={2}>
                  <TextField label="min" variant="outlined" fullWidth />
                  <TextField label="max" variant="outlined" fullWidth />
                </Box>
                <FormHelperText>Enter min and max value</FormHelperText>
              </Box>
              <TextField
                sx={{ mb: 3 }}
                label="Enter Number"
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
          </Stack>
        )}

        {/* Conditionally render fields based on selected condition */}
        {selectedCondition === 'date' && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 0 }}>
              <TextField
                sx={{ mb: 3 }}
                label="Enter Number"
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
          </Stack>
        )}
        {/* Conditionally render fields based on selected condition */}
        {selectedCondition === 'true/false' && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 0 }}>
              <TextField
                sx={{ mb: 3 }}
                label="Enter Number"
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
          </Stack>
        )}
        {/* Conditionally render fields based on selected condition */}
        {selectedCondition === 'email' && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 0 }}>
              <TextField
                sx={{ mb: 3 }}
                label="Enter Number"
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
          </Stack>
        )}
        {/* Conditionally render fields based on selected condition */}
        {selectedCondition === 'regex' && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <FormControl fullWidth sx={{ mb: 0 }}>
            <TextField
                sx={{ mb: 3 }}
                label="Enter Regex"
                helperText="Enter or paste regex."
                variant="outlined"
                fullWidth
                type="number"
               
              />
              <TextField
                sx={{ mb: 3 }}
                label="Enter Number"
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
          </Stack>
        )}
      </Card>
    </Card>
  );
}
