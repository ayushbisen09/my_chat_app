import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

import { Box, List, Tooltip, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '6px',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  padding: '8px 16px',
  margin: '2px 0',
  color: '#637381',
  backgroundColor: 'transparent',
  '& .MuiListItemIcon-root': {
    color: '#637381',
    transition: 'color 0.2s ease-in-out',
    minWidth: '24px',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
  },
  '&:hover': {
    backgroundColor: 'rgba(145, 158, 171, 0.08)',
  },
  '&.Mui-selected': {
    color: '#1C252E',
    backgroundColor: 'rgba(145, 158, 171, 0.16)',
    '&:hover': {
      backgroundColor: 'rgba(145, 158, 171, 0.24)',
    },
    '& .MuiListItemIcon-root': {
      color: '#1C252E',
    },
  },
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
}));

const TEMPLATES = [
  { icon: 'fluent:cart-24-filled', label: 'Ecommerce', count: 54 },
  { icon: 'fluent:food-16-filled', label: 'Food', count: 23 },
  { icon: 'icon-park-solid:fireworks', label: 'Festival', count: 54 },
  { icon: 'fluent:briefcase-medical-24-filled', label: 'Healthcare', count: 54 },
  { icon: 'ooui:special-pages-rtl', label: 'Special Occasions', count: 54 },
  { icon: 'material-symbols-light:travel', label: 'Travel', count: 54 },
  { icon: 'eos-icons:service', label: 'Services', count: 54 },
  { icon: 'zondicons:education', label: 'Education', count: 54 },
];

export default function TemplateList({ onItemSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = useCallback(
    (event, index) => {
      setSelectedIndex(index);
      onItemSelect(index);
    },
    [onItemSelect]
  );

  return (
    <Box
      sx={{
        backgroundColor: 'common.white',
        p: '24px',
        borderRadius: '16px',
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        height: '100%',
        width: {
          xs: '100%',
          sm: '100%',
          md: '253px',
        },
      }}
    >
      <List sx={{ width: '100%' }}>
        {TEMPLATES.map((template, index) => (
          <CustomListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemIcon>
              <Iconify icon={template.icon} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Tooltip title= {` This is template category name : "${template.label}" and number template in this category is: "${template.count}"`} arrow placement="top">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  
                    <span
                      style={{
                        flexGrow: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {template.label}
                    </span>
                 
                  <span
                    style={{
                      marginLeft: '8px',
                      flexShrink: 0,
                    }}
                  >
                    ({template.count})
                  </span>
                </div>
                </Tooltip>
              }
            />
          </CustomListItemButton>
        ))}
      </List>
    </Box>
  );
}
