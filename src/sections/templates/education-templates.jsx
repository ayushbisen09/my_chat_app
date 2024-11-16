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

export default function EcommTemplatesRender() {
  const popover = usePopover();
  const confirm = useBoolean();
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page
  const totalItems = 14; // Total number of items

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Data for ChatBox items with eCommerce-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/e1.png',
      text: `Hi Nikhil! 🎉 Thank you for shopping with us! Your order for {{2}} has been confirmed. Order ID: {{4}}. Track your order here! 📦`,
      title: 'Order Confirmation',
      type: 'Audio',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e2.png',
      text: `Hi Nikhil! 🚚 Your order for {{2}} has been shipped and is on its way! Estimated Delivery Date: {{6}}. Stay tuned for more updates. 📱`,
      title: 'Shipping Update',
      type: 'Audio',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e3.png',
      text: `Hi Nikhil! 🛒 Great news! Our exclusive sale is live now. Enjoy up to 50% off on selected items. Shop now and save big! 💸`,
      title: 'Exclusive Sale',
      type: 'Video',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e4.png',
      text: `Hi Nikhil! 🎁 Congratulations! You have received a gift voucher worth $2. Use code {{4}} at checkout to redeem it. Happy Shopping! 🎊`,
      title: 'Gift Voucher',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e1.png',
      text: `Hi Nikhil! 💬 Need help with your recent purchase? Our customer support team is here for you. Contact us anytime, and we’ll be happy to assist! 📞`,
      title: 'Customer Support',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e2.png',
      text: `Hi Nikhil! 🛍️ New arrivals alert! Check out our latest collection and be the first to get your hands on these trending products. Shop now! 👗`,
      title: 'New Arrivals',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e3.png',
      text: `Hi Nikhil! 🔔 Your return request for Order ID {{4}} has been processed. You will receive a confirmation once the refund is completed. Thank you! 🙏`,
      title: 'Return Processed',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e4.png',
      text: `Hi Nikhil! 🎯 Looking for more? Check out our 'Recommended for You' section based on your shopping history and discover products you’ll love! 🛍️`,
      title: 'Recommended for You',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e4.png',
      text: `Hi Nikhil! 📦 Your package for Order ID {{4}} is out for delivery today. Please ensure someone is available to receive it. Thank you! 🚚`,
      title: 'Out for Delivery',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e3.png',
      text: `Hi Nikhil! 🎈 Celebrate with us! Enjoy a special discount of 20% on your next purchase using code {{4}}. Valid till {{6}}. 🎉`,
      title: 'Special Discount',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e2.png',
      text: `Hi Nikhil! 🛒 Your cart is waiting! Complete your purchase today and enjoy free shipping on orders above $50. 🛍️`,
      title: 'Cart Reminder',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e1.png',
      text: `Hi Nikhil! 🌟 Your feedback matters to us! Please rate your recent purchase of {{2}}. Your opinion helps us improve our services. ✨`,
      title: 'Feedback Request',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e3.png',
      text: `Hi Nikhil! 📢 Don’t miss out on our flash sale! Limited time only! Grab your favorite items at unbeatable prices. Shop now! 🛒`,
      title: 'Flash Sale',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/e4.png',
      text: `Hi Nikhil! 💌 Thank you for being a loyal customer! Enjoy a special offer exclusively for you. Use code {{4}} and get 15% off on your next order. 🎁`,
      title: 'Loyalty Offer',
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
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Education Templates</Typography>
      <Box display="flex" justifyContent="space-between">
      <Tooltip title="Click here to search the template by name" arrow placement='top'>
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
            type={chatBox.type}
            icon={chatBox.icon}
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
