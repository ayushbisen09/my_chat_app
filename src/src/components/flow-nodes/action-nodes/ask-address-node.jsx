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

export default function AskAddressNode({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  ...other
}) {
  const [selectedAddress, setSelectedAddress] = useState('');


  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);

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
        title={<Typography variant="h6">Ask Address</Typography>}
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
        <FormControl fullWidth size="large" sx={{ mb: 3 }}>
          <TextField
            label="Question Message"
            variant="outlined"
            fullWidth
            helperText="Type question message value"
          />
        </FormControl>
        <FormControl fullWidth size="large" sx={{ mb: 3 }}>
          <InputLabel id="condition-select-label">Select Attribute</InputLabel>
          <Select
            labelId="condition-select-label"
            id="condition-select"
            value={selectedAddress}
            label="Select Attribute"
            onChange={handleAddressChange}
           
          >
            <MenuItem value="Equal">User Attribute 1</MenuItem>
            <MenuItem value="Exists">User Attribute 2</MenuItem>
            <MenuItem value="Time In">User Attribute 3</MenuItem>
          </Select>
          <FormHelperText>Select attribute to store address</FormHelperText>
        </FormControl>

        
      </Card>
    </Card>
  );
}
