import React, { useState } from 'react';

import { createTheme } from '@mui/material/styles';
import { 
  Box, 
  Menu, 
  Card, 
  Paper,
  Button,
  MenuItem,
  TextField, 
  CardHeader, 
  IconButton, 
  Typography, 
  ListItemIcon,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

const SingleProduct = () => {
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleAddButton = () => {
    console.log('Add Button Clicked');
  };

  return (
    <Card sx={{ 
      backgroundColor: "#F4F6F8", 
      p:2,
      // width: '336px', 
      // margin: '10px', 
      // padding: '16px', 
      alignContent:'center', 
      '&:hover': {
        outline: '2px solid #1976d2'
      },
      position: 'relative', overflow:'visible'
    }}>
      <CardHeader
        title="Single Product"
        action={
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <Iconify width={20} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
            <IconButton>
              <Iconify width={20} icon="solar:trash-bin-trash-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Box>
        }
        sx={{ p: 0, mb:2 }}
      />
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          // // padding: '15px',
          // marginBottom: '10px',
          // position: 'relative'
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              top: 58,
              left: -30,
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
              borderRadius: '10px',
              overflow: 'hidden',
              padding: '5px',
              gap: '4px',
              width: '45px'
            }}
          >
              <IconButton>
              <Iconify width={20} icon="eva:plus-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>
            <IconButton>
              <Iconify width={20} icon="eva:eye-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>       
                      </Paper>
        )}

        <Card
          sx={{
            // display: 'flex',
            // width: '306px',
            px: 1.5,
          pt: 3.5,
          pb: 2.5,
          mb:3,
            borderRadius: '12px',
            boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
            '&:hover': {
        outline: '1px solid #919eab'
      },
          }}
        >
          
     
              <Button
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
                startIcon={<Iconify width={20} icon="solar:add-circle-bold" sx={{ color: '#0080ff' }} />}
                onClick={handleAddButton} sx={{mb:2}}
              >
                Add Product
              </Button>
          
            <TextField
              label="Enter body"
              variant="outlined"
              value={message}
              onChange={handleMessageChange}
              helperText="Body 1024 letter allowed"
              sx={{ marginBottom: '20px', width: '100%' }}
            />
            <TextField
              label="Enter footer"
              variant="outlined"
              value={message}
              onChange={handleMessageChange}
              helperText="Footer 60 letter allowed"
              sx={{ width: '100%' }}
            />
          
        </Card>
      </Box>
     
        <Button 
          variant="outlined" 
          color='primary'
          size='large'
          fullWidth
          startIcon={<Iconify width={20} icon="solar:add-circle-bold" sx={{ color: '#0080ff' }} />}
          onClick={handleClick}
        >
          Add Content
        </Button>
     
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Choose Content Type
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
        <MenuItem onClick={handleClose}>
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
};

export default SingleProduct;