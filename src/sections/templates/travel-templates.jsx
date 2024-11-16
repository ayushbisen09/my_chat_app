import React, { useState } from 'react';

import {
  Box,
  Tooltip,
  TextField,
  Pagination,
  Typography,
  InputAdornment,
  paginationClasses,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

import ExpoloreTemplateChatBox from './hook/chat-box';

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
      text: `Hi Hardik! ✈️ Your flight booking to Leh has been confirmed! Booking ID: 2525145514. Get ready for an amazing journey! 🌍`,
      title: 'Flight Booking Confirmation',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t2.png',
      text: `Hi Hardik! 🏨 Your hotel reservation at Leh is confirmed! We can't wait to welcome you. Check-in: 25/11/2024, Check-out: 30/11/2024. Enjoy your stay! 🏝️`,
      title: 'Hotel Reservation Confirmation',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t3.png',
      text: `Hi Hardik! 🚌 Your bus tickets to Leh are booked. Departure on 25/11/2024 from 30/11/2024. Safe travels! 🛤️`,
      title: 'Bus Ticket Booking',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t4.png',
      text: `Hi Hardik! 🚗 Your car rental for Leh is confirmed! Enjoy the freedom of exploring at your own pace. Pickup location: 25/11/2024. Drive safe! 🚙`,
      title: 'Car Rental Confirmation',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t5.png',
      text: `Hi Hardik! 🌅 Discover our special tour packages for Leh. From historical tours to adventure trips, find your perfect getaway! 🌄`,
      title: 'Special Tour Packages',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t6.png',
      text: `Hi Hardik! 🎒 Planning your next trip? Check out our travel guides for the best destinations, tips, and deals. Happy travels! 🌐`,
      title: 'Travel Guides',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t7.png',
      text: `Hi Hardik! 🏖️ Exclusive offer! Book a trip to Leh today and get 20% off on your next adventure. Offer valid till 30/11/2024. 🌊`,
      title: 'Exclusive Travel Offer',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t8.png',
      text: `Hi Hardik! 🛳️ Cruise away with us! Explore our luxury cruise packages to beautiful destinations worldwide. Book now for an unforgettable experience! 🚢`,
      title: 'Luxury Cruise Packages',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t4.png',
      text: `Hi Hardik! 🚲 Explore the city like a local! Rent a bike for your trip to Leh. Discover hidden gems at your own pace. Pedal on! 🚴`,
      title: 'Bike Rental',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t6.png',
      text: `Hi Hardik! 🌍 Ready for an adventure? Join our group tours to Leh and meet like-minded travelers. New friends, new experiences await! 🎒`,
      title: 'Group Tours',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t1.png',
      text: `Hi Hardik! ✈️ Time to fly! Check out our last-minute flight deals to top destinations. Book now and save big on your next getaway! 💺`,
      title: 'Last-Minute Flight Deals',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t7.png',
      text: `Hi Hardik! 🏕️ Experience the great outdoors with our camping packages. Perfect for a weekend getaway in nature. Book now and camp under the stars! ✨`,
      title: 'Camping Packages',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t2.png',
      text: `Hi Hardik! 🎿 Winter is here! Discover our ski resort packages and enjoy a thrilling adventure in the snow. Book now and hit the slopes! ❄️`,
      title: 'Ski Resort Packages',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/travel-template-images/t4.png',
      text: `Hi Hardik! 🌺 Aloha! Explore Hawaii with our exclusive island-hopping tours. Discover the beauty of the islands and create unforgettable memories! 🏄‍♂️`,
      title: 'Island-Hopping Tours',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
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
        <Tooltip title="Click here to search the template by name" arrow placement="top">
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
        </Tooltip>
      </Box>

      <Box
        sx={{ mt: '24px' }}
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {displayedChatBoxes.map((chatBox, index) => (
          <ExpoloreTemplateChatBox
            key={index}
            coverSrc={chatBox.coverSrc}
            showImage
            text={chatBox.text}
            icon={chatBox.icon}
            type={chatBox.type}
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
