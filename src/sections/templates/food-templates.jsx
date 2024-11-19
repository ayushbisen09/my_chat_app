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

export default function FoodTemplatesRender() {
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page

  // Data for ChatBox items with food-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f1.jpg',
      text: `Hi [Ayush!] Savor the freshness of [Egg], [Tomato], and [Papaya], sourced from [Vegetables] 🥗🍓. Stay healthy and energized with every bite, brought to you by [Big Basket!] 🥑✨ `,
      title: 'Fresh & Nutritious Delights"',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f2.jpg',
      text: `Hi [Ayush!] Indulge in the richness of [Grapes], [Mango], and [Apples] for a wholesome meal 🥗🍇. Sourced from [Fruits], every bite is packed with health and flavor! 🌟🍎`,
      title: 'A Feast of Freshness',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f3.jpg',
      text: `Hi [Ayush!] Dive into the deliciousness of [Pretzels], [Popcorn ], and [Nachos ] 🍿🍫. Perfect for [Every Time], these treats are sure to satisfy every craving! 🥨🍪`,
      title: 'Snacks for Craving',
      type: 'Video',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f4.jpg',
      text: `Hi [Ayush!] Savor the iconic flavors of [Bacon Bliss Burger], [French Fries], and [Coke] 🍔🍟. Your favorites, made fresh and delicious, every time! 🥤✨`,
      title: 'Taste the Arches"',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f5.jpg',
      text: `Hi [Ayush!] 🍨 Enjoy a hearty breakfast with [Dal Makhani], [Paneer Tikka Masala], and [Coke] 🥞🍳. Start your morning right with flavors that energize and delight! ☕🍌`,
      title: 'Breakfast Bliss',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f6.jpg',
      text: `Hi [Ayush!] Savor the flavors of [Butter Chicken], [Chicken Peri Peri], and [Coke] 🍗🥗. Perfectly crafted meals for your special evenings! 🍴✨`,
      title: 'Dinner Delights',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f7.jpg',
      text: `Hi [Ayush!] 🥗 Treat yourself to [Pizza] topped with [Pepperoni] and [Mozzarella Cheese] 🥞🍓. Indulgence never tasted this good! 🍯✨`,
      title: 'Sweet Stacks',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f8.jpg',
      text: `Hi [Ayush!]  Indulge in our delicious [Mushroom Swiss Melt] loaded with [Cherry Tomatoes] and [Whipped Cream] 🥖🍖. A perfect blend of flavors to satisfy your cravings! 🌿✨`,
      title: 'Savory Bites',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f9.jpg',
      text: `Hi [Ayush!] Craft the perfect blend of [Parmesan Shavings], [Dried Cranberries], and [Grilled Chicken] 🌶️🧅. Elevate your dishes with authentic, rich flavors! ✨🍲`,
      title: 'Flavor in the Making',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f10.jpg',
      text: `Hi [Ayush!] Enhance your recipes with [Grilled Chicken] and [Dried Cranberries] 🍅🌿. Pure, natural flavors straight from the garden! ✨🥗`,
      title: 'Fresh & Flavorful',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f11.jpg',
      text: `Hi [Ayush!] Start your day with [Grilled Chicken] and [Dried Cranberries], and a dash of fun 🍞🍊. Perfectly balanced for happy mornings! ☀️✨`,
      title: 'Sunny Breakfast Smiles',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f12.jpg',
      text: `Hi [Ayush!] Indulge in the richness of [Vanila] and [Berry] 🍫🍒. Every bite is a slice of heaven! 🎂✨`,
      title: 'Choco Bliss',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f13.jpg',
      text: `Hi [Ayush!] 🥙 Try our new wrap combos, packed with flavors and fresh ingredients. Perfect for a quick and tasty meal. Order now!`,
      title: 'Wrap Combos',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/food-template-images/f14.jpg',
      text: `Hi [Ayush!] Add the goodness of [Grilled Chicken] and [Dried Cranberries], and Dried Cranberries to your meals 🍅🧄. Fresh flavors straight from the farm! 🌿✨`,
      title: 'Farm Fresh Picks',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
  ];

  // Function to handle page change
  const totalItems = chatBoxes.length;

  // Calculate the number of pages
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Get the items to display based on the current page
  const displayedChatBoxes = chatBoxes.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Food Specials</Typography>
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
