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

import { Iconify } from 'src/components/iconify';

import ExpoloreTemplateChatBox from './hook/chat-box';

export default function EcommTemplatesRender() {
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page

  // Data for ChatBox items with eCommerce-related messages
  const chatBoxes = [
   
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e2.jpg',
      text: `Hi [Ankit!] 🚚 Discover endless possibilities with our seamless online shopping experience. From everyday essentials to luxury items, shop with confidence and convenience right from your laptop. Your next great find is just a click away. Start browsing today!. 📱`,
      title: 'Shipping Update',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e3.jpg',
      text: `Hi [Ankit!] 🛒 Shop smarter with a seamless online experience. Fill your cart with top brands, exclusive deals, and everyday essentials—all delivered to your doorstep 💸`,
      title: 'Exclusive Sale',
      type: 'Video',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e4.jpg',
      text: `Hi [Ankit!] 🎁 Your favorite products are just a tap away! Enjoy a smooth mobile shopping experience with exclusive deals, quick checkout, and fast delivery. Everything you need, right at your fingertips. Start shopping today!🎊`,
      title: 'Seamless Mobile Shopping Experience',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e5.jpg',
      text: `Hi [Ankit!] 💬  Experience seamless online trade where convenience meets security. Exchange goods and payments effortlessly through digital platforms📞`,
      title: 'Digital Shoping',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e6.jpg',
      text: `Hi [Ankit!] 🛍️ New arrivals alert! Check out our latest collection and be the first to get your hands on these trending products. Shop now! 👗`,
      title: 'New Arrivals',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e7.jpg',
      text: `Hi [Ankit!] 🔔 Shop your favorite products and enjoy up to 50% off with special offers. Add to your cart and save big today!🎊`,
      title: 'Unlock Exclusive Discounts',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e8.jpg',
      text: `Hi [Ankit!] 🎯 Efficient logistics to ensure your packages are processed and delivered on time. From warehouse to doorstep, we’ve got it covered! 🛍️`,
      title: 'Order Fulfillment',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e9.jpg',
      text: `Hi [Ankit!]  Experience seamless online shopping where payments 💶 meet products 🛒. A smarter, faster way to shop from screen to reality! 🚀`,
      title: 'Shop from Home',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e10.jpg',
      text: `Hi [Ankit!] Preparing your package [Order ID: 43543246545] with precision and care for a seamless delivery experience! 📦✨`,
      title: 'Packing with Care',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e11.jpg',
      text: `Hi [Ankit!] Explore your favorite products [Vegatables, Groceries] with ease 🛍️📱. Shop smarter with technology at your fingertips! 🛒✨`,
      title: 'Smart Shopping Redefined',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e12.jpg',
      text: `Hi [Ankit!] 🌟 Add [Iphone 16 Pro Max] to your cart 🛒💻 and enjoy exclusive deals! Easy, fast, and secure shopping at your fingertips. 💸✨`,
      title: 'Shop & Save Online',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e13.jpg',
      text: `Hi [Ankit!] 📢 Don’t miss out on our flash sale! Limited time only! Grab your favorite items at unbeatable prices. Shop now! 🛒`,
      title: 'Flash Sale',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/ecommerce-template-images/e14.jpg',
      text: `Hi [Ankit!] 💌 Fill your bags with [Home Needs] 🛍️✨. Grab amazing deals and offers before they’re gone! 🛒🎉`,
      title: 'Loyalty Offer',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
  ];
  const totalItems = chatBoxes.length;

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const displayedChatBoxes = chatBoxes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Ecommerce Messages</Typography>
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
            type={chatBox.type}
            icon={chatBox.icon}
            showLinks={false}
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
