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
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f2.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f5.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f6.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f5.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f6.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f2.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f1.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.png',
      text: `Hi Pabbly! 🎧🛒 Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌 Order Details: Product: Chicken Peri Peri Quantity: 2 Order ID: 24431534121541 Delivery Address: House number  90 Piplani Estimated Delivery Date: Today Evening`,
      title: 'Order Confirmation',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
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
