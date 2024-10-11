import React, { useState } from 'react';

import {
  Box,
  Button,
  MenuItem,
  MenuList,
  TextField,
  Pagination,
  Typography,
  InputAdornment,
  paginationClasses,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import ChatBox from 'src/components/chat-box/chat-box';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export default function SpecialOccasionsTemplatesRender() {
  const popover = usePopover();
  const confirm = useBoolean();
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page
  const totalItems = 14; // Total number of items

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Data for ChatBox items with special occasion messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s1.png',
      text: `Hi {{1}}! 🎂 Happy Birthday! May your day be filled with lots of love, joy, and cake! 🎉`,
      title: 'Happy Birthday',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s2.png',
      text: `Hi {{1}}! 💍 Congratulations on your Engagement! Wishing you a wonderful journey ahead as you build your new life together. 💖`,
      title: 'Engagement Congratulations',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s3.png',
      text: `Hi {{1}}! 💍 Congratulations on your Marriage! Wishing you a lifetime of love and happiness together. 🎉`,
      title: 'Marriage Congratulations',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s4.png',
      text: `Hi {{1}}! 🎉 Happy New Year! May this year bring new happiness, new goals, new achievements, and a lot of new inspirations to your life. 🌟`,
      title: 'Happy New Year',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s5.png',
      text: `Hi {{1}}! 🇮🇳 Happy Independence Day! Let’s celebrate the spirit of freedom and unity. Jai Hind! 🎉`,
      title: 'Independence Day',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s3.png',
      text: `Hi {{1}}! 💍 Congratulations on your Marriage! Wishing you a lifetime of love and happiness together. 🎉`,
      title: 'Marriage Congratulations',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s5.png',
      text: `Hi {{1}}! 🇮🇳 Happy Independence Day! Let’s celebrate the spirit of freedom and unity. Jai Hind! 🎉`,
      title: 'Independence Day',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s1.png',
      text: `Hi {{1}}! 🎂 Happy Birthday! May your day be filled with lots of love, joy, and cake! 🎉`,
      title: 'Happy Birthday',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s4.png',
      text: `Hi {{1}}! 🎉 Happy New Year! May this year bring new happiness, new goals, new achievements, and a lot of new inspirations to your life. 🌟`,
      title: 'Happy New Year',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s2.png',
      text: `Hi {{1}}! 💍 Congratulations on your Engagement! Wishing you a wonderful journey ahead as you build your new life together. 💖`,
      title: 'Engagement Congratulations',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s5.png',
      text: `Hi {{1}}! 🇮🇳 Celebrating our freedom! Happy Independence Day! Let’s honor our nation and those who fought for our independence. 🕊️`,
      title: 'Independence Day Celebration',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s1.png',
      text: `Hi {{1}}! 🎂 Wishing you a very Happy Birthday! May your day be filled with happiness, love, and everything that brings you joy. 🎈`,
      title: 'Birthday Wishes',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s4.png',
      text: `Hi {{1}}! 🎉 Happy New Year! May this year bring new happiness, new goals, new achievements, and a lot of new inspirations to your life. 🌟`,
      title: 'New Year Celebrations',
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s2.png',
      text: `Hi {{1}}! 💍 Congratulations on your Engagement! Wishing you a wonderful journey ahead as you build your new life together. 💖`,
      title: 'Engagement Greetings',
    },
  ];

  // Calculate the number of pages
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Get the items to display based on the current page
  const displayedChatBoxes = chatBoxes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Special Occasions</Typography>
      <Box display="flex" justifyContent="space-between">
        <TextField
          placeholder="Search templates..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2.5 }}
        />
        <Button
          disableRipple
          color="inherit"
          onClick={popover.onOpen}
          endIcon={
            <Iconify
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          }
          sx={{ fontWeight: 'fontWeightSemiBold' }}
        >
          Sort by:
          <Box
            component="span"
            sx={{ ml: 0.5, fontWeight: 'fontWeightBold', textTransform: 'capitalize' }}
          />
        </Button>

        <CustomPopover
          open={popover.open}
          anchorEl={popover.anchorEl}
          onClose={popover.onClose}
        >
          <MenuList>
            <MenuItem>Latest</MenuItem>
            <MenuItem>Popular</MenuItem>
            <MenuItem>Oldest</MenuItem>
          </MenuList>
        </CustomPopover>
      </Box>

      <Box
        sx={{ mt: '24px' }}
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {displayedChatBoxes.map((chatBox, index) => (
          <ChatBox
            key={index}
            coverSrc={chatBox.coverSrc}
            showImage
            text={<>{chatBox.text}</>}
            showLinks
            showVisit
            title={chatBox.title} // Pass title prop
            showOnline={false} // Do not show online status
            showAvatar={false} // Do not show avatar
            showTimestamp={false} // Do not show timestamp
          />
        ))}
      </Box>

      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        sx={{
          mt: { xs: 5, md: 8 },
          [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
        }}
      />
    </Box>
  );
}
