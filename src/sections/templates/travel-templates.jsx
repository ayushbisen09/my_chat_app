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

export default function TravelTemplatesRender() {
  const popover = usePopover();
  const confirm = useBoolean();
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page
  const totalItems = 14; // Total number of items

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Data for ChatBox items with travel-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t1.png',
      text: `Hi {{1}}! ✈️ Your flight booking to {{2}} has been confirmed! Booking ID: {{4}}. Get ready for an amazing journey! 🌍`,
      title: 'Flight Booking Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t2.png',
      text: `Hi {{1}}! 🏨 Your hotel reservation at {{2}} is confirmed! We can't wait to welcome you. Check-in: {{5}}, Check-out: {{6}}. Enjoy your stay! 🏝️`,
      title: 'Hotel Reservation Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t3.png',
      text: `Hi {{1}}! 🚌 Your bus tickets to {{2}} are booked. Departure on {{5}} from {{6}}. Safe travels! 🛤️`,
      title: 'Bus Ticket Booking',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t4.png',
      text: `Hi {{1}}! 🚗 Your car rental for {{2}} is confirmed! Enjoy the freedom of exploring at your own pace. Pickup location: {{5}}. Drive safe! 🚙`,
      title: 'Car Rental Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t5.png',
      text: `Hi {{1}}! 🌅 Discover our special tour packages for {{2}}. From historical tours to adventure trips, find your perfect getaway! 🌄`,
      title: 'Special Tour Packages',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t6.png',
      text: `Hi {{1}}! 🎒 Planning your next trip? Check out our travel guides for the best destinations, tips, and deals. Happy travels! 🌐`,
      title: 'Travel Guides',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t7.png',
      text: `Hi {{1}}! 🏖️ Exclusive offer! Book a trip to {{2}} today and get 20% off on your next adventure. Offer valid till {{6}}. 🌊`,
      title: 'Exclusive Travel Offer',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t8.png',
      text: `Hi {{1}}! 🛳️ Cruise away with us! Explore our luxury cruise packages to beautiful destinations worldwide. Book now for an unforgettable experience! 🚢`,
      title: 'Luxury Cruise Packages',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t4.png',
      text: `Hi {{1}}! 🚲 Explore the city like a local! Rent a bike for your trip to {{2}}. Discover hidden gems at your own pace. Pedal on! 🚴`,
      title: 'Bike Rental',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t6.png',
      text: `Hi {{1}}! 🌍 Ready for an adventure? Join our group tours to {{2}} and meet like-minded travelers. New friends, new experiences await! 🎒`,
      title: 'Group Tours',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t1.png',
      text: `Hi {{1}}! ✈️ Time to fly! Check out our last-minute flight deals to top destinations. Book now and save big on your next getaway! 💺`,
      title: 'Last-Minute Flight Deals',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t7.png',
      text: `Hi {{1}}! 🏕️ Experience the great outdoors with our camping packages. Perfect for a weekend getaway in nature. Book now and camp under the stars! ✨`,
      title: 'Camping Packages',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t2.png',
      text: `Hi {{1}}! 🎿 Winter is here! Discover our ski resort packages and enjoy a thrilling adventure in the snow. Book now and hit the slopes! ❄️`,
      title: 'Ski Resort Packages',
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t4.png',
      text: `Hi {{1}}! 🌺 Aloha! Explore Hawaii with our exclusive island-hopping tours. Discover the beauty of the islands and create unforgettable memories! 🏄‍♂️`,
      title: 'Island-Hopping Tours',
    },
  ];

  // Calculate the number of pages
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Get the items to display based on the current page
  const displayedChatBoxes = chatBoxes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Travel Messages</Typography>
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
