import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

import { Box, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export default function TemplateList({ onItemSelect }) {
  const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    borderRadius: '6px',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    padding: '8px 16px', // Adjust as needed
    margin: '2px 0', // Add a small margin to prevent layout shifts

    // Unselected state
    color: '#637381',
    backgroundColor: 'transparent',

    '& .MuiListItemIcon-root': {
      color: '#637381',
      transition: 'color 0.2s ease-in-out',
      minWidth: '24px', // Set a fixed minimum width for the icon
      width: '24px', // Set a fixed width for the icon
      height: '24px', // Set a fixed height for the icon
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px', // Add some space between icon and text
    },

    '& .MuiListItemText-root': {
      margin: 0, // Remove default margins
    },

    // Hover state
    '&:hover': {
      backgroundColor: 'rgba(145, 158, 171, 0.08)',
    },

    // Selected state
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

    // Prevent text selection on rapid clicks
    userSelect: 'none',

    // Ensure consistent layout
    display: 'flex',
    alignItems: 'center',
  }));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = useCallback(
    (event, index) => {
      setSelectedIndex(index);
      onItemSelect(index); // Pass the selected index to the parent
    },
    [onItemSelect]
  );
  const dialog = useBoolean();

  return (
    <Box
      sx={{
        backgroundColor:'common.white',
        p:'24px',
        borderRadius:'16px',
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        height:'100%',
        width: {
          xs: '100%',
          sm: '100%',
          md: '253px',
        },
      }}
    >
      <List sx={{ width: '100%' }}>
        {/* Ecomm */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <Iconify icon="fluent:cart-24-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
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
                  Ecommerce
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* food */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <Iconify icon="fluent:food-16-filled" width={20} height={20} />
          </ListItemIcon>
          <ListItemText
            primary={
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
                  Food
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (23)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* festival */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <Iconify icon="icon-park-solid:fireworks" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
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
                  Festival
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* Healtcare */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <Iconify icon="fluent:briefcase-medical-24-filled" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
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
                  Healtcare
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* Special Occasions */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <Iconify icon="ooui:special-pages-rtl" width={20} height={20} />
          </ListItemIcon>
          <ListItemText
            primary={
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
                  Special Occasions
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* Travel */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon>
            <Iconify icon="material-symbols-light:travel" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
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
                  Travel
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* Services */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
        >
          <ListItemIcon>
            <Iconify icon="eos-icons:service" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={
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
                  Services
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* Education */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemIcon>
            <Iconify icon="zondicons:education" width={20} height={20} />
          </ListItemIcon>
          <ListItemText
            primary={
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
                  Education
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>
      </List>
    </Box>
  );
}
