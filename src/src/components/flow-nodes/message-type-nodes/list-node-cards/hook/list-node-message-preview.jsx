import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {
  Card,
  Radio,
  Avatar,
  Divider,
  IconButton,
  Typography,
  CardHeader,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ListNodeMessagePreview({
  showListNodeMessagePreview,
  setShowListNodeMessagePreview,
  onClose,
}) {
  console.log(showListNodeMessagePreview);
  const header = useSelector((state) => state.listNode.header);
  const body = useSelector((state) => state.listNode.body);
  const footer = useSelector((state) => state.listNode.footer);
  const listPlaceholder = useSelector((state) => state.listNode.listPlaceholder);
  const listNodeButtons = useSelector((state) => state.listNode.listNodeButtons);
  const sectionsTitle = useSelector((state) => state.listNode.sectionsTitle);
  const itemTitle = useSelector((state) => state.listNode.itemTitle);
  const itemDescription = useSelector((state) => state.listNode.itemDescription);
  const handleCloseDrawer = () => {
    setShowListNodeMessagePreview();
  };
  const handleBackdropClick = (event) => {
    // Prevent clicks inside the drawer from closing it
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const [showRadioBox, setShowRadioBox] = useState(false);
  const closeRadioBox = () => {
    setShowRadioBox(false);
  };
  const hasContent = header || body || footer;

  return (
    <Drawer
      open={showListNodeMessagePreview}
      onClose={handleCloseDrawer}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 416 } }}
    >
      <Box
        sx={{ p: 3 }}
        onClick={handleBackdropClick} // Handle clicks outside the drawer
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h6">Configure Message</Typography>
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'unset' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Box>
      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            border: '1px solid #919EAB33',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <CardHeader
            sx={{ mb: 2 }}
            avatar={<Avatar aria-label="profile picture">MC</Avatar>}
            title={
              <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                Mireya Conner List
              </Typography>
            }
            subheader={
              <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                Online
              </Typography>
            }
          />
          <Divider />

          <Box
            sx={{
              p: 2,
              pt: '16px',
              backgroundColor: '#CCF4FE',
              borderRadius: '8px',
              mx: 2,
              mt: 2,
              height: hasContent ? 'auto' : '36px',
              minHeight: '36px',
            }}
          >
            {/* <CardMedia
              component="img"
              image="/assets/images/templateImage/template-image1.jpg"
              alt="Chat image"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                marginBottom: 2, // Add some space between the image and the text
                borderRadius: '8px', // Optional: add rounded corners to the image
              }}
            /> */}

            <Typography
              variant="body2"
              sx={{
                px: 0,
                py: 0,
                color: 'primary',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word', // Allows long words to break and wrap
                overflowWrap: 'break-word', // Ensures words that are too long to fit on a single line will break
                // 24px margin bottom
              }}
            >
              {header && (
                <>
                  <strong>{header}</strong>
                  <br />
                </>
              )}
              {body && (
                <>
                  {body}
                  <br />
                </>
              )}
              {footer && (
                <>
                  {footer}
                  <br />
                </>
              )}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: '#CCF4FE',
              my: 1,
              mx: 2,
              gap: 1,
              borderRadius: '8px',
              height: '36px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setShowRadioBox(true)} // Show radio box on click
          >
            <Iconify width={20} icon="lucide:list" sx={{ color: '#078DEE' }} />
            <Typography color="#078DEE" fontWeight="600">
              {listPlaceholder}
            </Typography>
          </Box>
        </Card>
      </Box>

      {showRadioBox && (
        <>
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid #e0e0e0',
              backgroundColor: '#f9f9f9',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              {listPlaceholder}
            </Box>
            <Box>
              <IconButton onClick={closeRadioBox}>
                <Iconify width={20} icon="mingcute:close-line" />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            {Object.entries(sectionsTitle).map(([cardId, title]) => (
              <Box key={cardId}>
                <strong>{title || 'Title'}</strong>{' '}
                {/* Show "Title" as placeholder if title is empty */}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between', // Space between items
              alignItems: 'center', // Center align vertically
              p: 2,
            }}
          >
            <Box sx={{ width: '100%' }}>
              {' '}
              {/* Left side content */}
              {itemTitle && (
                <Typography sx={{ mb: 0.5 }}>
                  <strong>{itemTitle}</strong>
                </Typography>
              )}
              {itemDescription && <Typography>{itemDescription}</Typography>}
            </Box>
            <Box>{(itemTitle || itemDescription) && <Radio />}</Box>
            {/* Radio Button on the Right */}
          </Box>
        </>
      )}
    </Drawer>
  );
}
