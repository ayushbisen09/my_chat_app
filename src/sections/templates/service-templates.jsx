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

export default function ServiceTemplatesRender() {
  const popover = usePopover();
  const confirm = useBoolean();
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page
  const totalItems = 14; // Total number of items

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Data for ChatBox items with service-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f1.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f2.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f5.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f6.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f5.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f6.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f2.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f1.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.png',
      text: `Hi {{1}}! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: {{2}} Quantity: {{3}} Order ID: {{4}} Delivery Address: {{5}} Estimated Delivery Date: {{6}}`,
      title: 'Order Confirmation',
    },
  ];

  // Calculate the number of pages
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Get the items to display based on the current page
  const displayedChatBoxes = chatBoxes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Service Messages</Typography>
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
