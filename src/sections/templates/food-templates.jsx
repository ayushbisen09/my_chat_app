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

export default function FoodTemplatesRender() {
  const popover = usePopover();
  const confirm = useBoolean();
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page
  const totalItems = 14; // Total number of items

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Data for ChatBox items with food-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f1.png',
      text: `Hi Ayush! 🍔 Try our new Gourmet Burger, crafted with the finest ingredients. Order now and indulge in a delicious experience!`,
      title: 'Gourmet Burger',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f2.png',
      text: `Hi Ayush! 🍕 Craving pizza? Check out our latest flavors and enjoy a cheesy delight! Order your favorite pizza today!`,
      title: 'Pizza Delight',
      type: 'Audio',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.png',
      text: `Hi Ayush! 🍣 Sushi lovers rejoice! Our fresh sushi rolls are here to tantalize your taste buds. Order now and enjoy a taste of Japan!`,
      title: 'Sushi Rolls',
      type: 'Video',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.png',
      text: `Hi Ayush! 🍝 Introducing our new Pasta Alfredo! Creamy, delicious, and perfect for any pasta lover. Order now and savor the flavor!`,
      title: 'Pasta Alfredo',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
      
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f5.png',
      text: `Hi Ayush! 🍨 Cool down with our refreshing ice creams! Try our new exotic flavors and beat the heat in style. Order now!`,
      title: 'Ice Creams',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f6.png',
      text: `Hi Ayush! 🍷 Celebrate your special moments with our exquisite wine collection. Order your favorite bottle today and enjoy!`,
      title: 'Wine Collection',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f5.png',
      text: `Hi Ayush! 🥗 Looking for something healthy? Try our fresh and tasty salads, perfect for a light and nutritious meal. Order now!`,
      title: 'Healthy Salads',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f6.png',
      text: `Hi Ayush! 🍰 Sweeten your day with our delicious cakes and pastries. Perfect for every occasion! Order your favorite dessert today!`,
      title: 'Cakes & Pastries',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.png',
      text: `Hi Ayush! 🌮 Tacos anyone? Our new taco menu is out now! Packed with flavors that will transport you to Mexico. Order today!`,
      title: 'Taco Menu',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.png',
      text: `Hi Ayush! 🍵 Warm up with our special soups, made with fresh ingredients to comfort your soul. Order your bowl of goodness now!`,
      title: 'Special Soups',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f2.png',
      text: `Hi Ayush! 🍹 Refresh yourself with our new range of mocktails and beverages. Perfect for any time of the day. Order yours now!`,
      title: 'Mocktails & Beverages',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f1.png',
      text: `Hi Ayush! 🍜 Noodle lovers, rejoice! Our special ramen bowls are here to satisfy your cravings. Order now and slurp away!`,
      title: 'Ramen Bowls',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.png',
      text: `Hi Ayush! 🥙 Try our new wrap combos, packed with flavors and fresh ingredients. Perfect for a quick and tasty meal. Order now!`,
      title: 'Wrap Combos',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.png',
      text: `Hi Ayush! 🍪 Enjoy our freshly baked cookies, perfect with a cup of coffee or as a treat on the go. Order your batch now!`,
      title: 'Fresh Cookies',
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
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Food Specials</Typography>
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
