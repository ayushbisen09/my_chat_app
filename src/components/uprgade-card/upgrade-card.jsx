import React from 'react';
import { Icon } from '@iconify/react';

import { Box,Card, Button,  Typography, } from '@mui/material';

export default function  UpgradeCard(){
    
    return(
  <Card
    sx={{
      background: 'linear-gradient(to bottom, #F7BB95, #5B2FF3)',
      padding: 3,
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    //   width: '200px',
    }}
  >
    <Typography variant="h4" fontWeight="bold" color="white">
      5% OFF
    </Typography>
    <Typography variant="body1" color="white" mb={2}>
      Join Pabbly Chatflow Now!
    </Typography>
    <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'warning.main',
          color: 'warning.contrastText',
          '&:hover': {
            backgroundColor: 'warning.dark',
          },
          borderRadius: '20px',
          padding: '8px 16px',
        }}
      >
        Upgrade to Pro
      </Button>
      <Icon icon="mdi:rocket-launch" style={{ fontSize: '60px', color: 'white' }} />
    </Box>
  </Card>
    )
}

