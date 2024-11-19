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

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Data for ChatBox items with eCommerce-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/education-template-images/ed1.jpg',
      text: ` Empowering young minds with curiosity and knowledge in [English] 📚✨. Every question leads to a world of discovery! 🌟👩‍🏫`,
      title: 'Engaged Learning in Action',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/education-template-images/ed2.jpg',
      text: `Watch young learners step into a world of endless opportunities 🎒✨. Every step brings them closer to their dreams! 🌟📚`,
      title: 'Journey to Knowledge',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/education-template-images/ed3.jpg',
      text: `Dive into the treasure trove of books and unlock the power of knowledge 📖✨. A world of learning awaits! 🌟📚`,
      title: 'Library of Wisdom',
      type: 'Video',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/education-template-images/ed4.jpg',
      text: `Hop on the ride of learning and friendship 🚌✨. A new day, a new journey to discover and grow! 🌟🎒`,
      title: 'School Bus Adventures',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/education-template-images/ed5.jpg',
      text: `Where eager minds and creative ideas come alive ✏️✨. Learning today to shape tomorrow! 🌟📚`,
      title: 'Classroom of Curiosity',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/education-template-images/ed6.jpg',
      text: ` Little hands crafting big dreams through art and imagination 🎨✨. Where every stroke tells a story! 🌟🖌️`,
      title: 'Creativity in Action',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/education-template-images/ed7.jpg',
      text: `Honoring the hard work and achievements of bright young minds 🎓✨. A moment of pride and joy! 🌟🏆`,
      title: 'Celebrating Excellence',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
  ];

  const totalItems = chatBoxes.length;

  // Calculate the number of pages
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Get the items to display based on the current page
  const displayedChatBoxes = chatBoxes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Education Templates</Typography>
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
