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

export default function ServiceTemplatesRender() {

  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page

  // Function to handle page change
 

  // Data for ChatBox items with service-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/service-template-images/ser1.jpg',
      text: `Hi [Everyone] We’re hiring for [Software Developer] in [Hingwadi , Pune] 💼✨. Join our team and grow your career with exciting opportunities! Apply now! 🚀📧`,
      title: 'Exciting Job Alert!',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/service-template-images/ser2.jpg',
      text: ` Explore our comprehensive guide to [Histocical] 📘✨. Step-by-step insights and tips to make your journey smoother and more successful! 🚀💡`,
      title: 'Your Ultimate Guide Awaits!',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/service-template-images/ser3.jpg',
      text: `Hi [Ayush!] Don’t forget your interview for [Software Develoeper] with [Magnet Brains Software Technology] 🕒✨. Date: [20 Nov 2024], Time: [04:30 pm]. Best of luck—you’ve got this! 💼🌟`,
      title: '',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/service-template-images/ser4.jpg',
      text: `Share your experience at [Sarkar Gym] 🏋️‍♂️✨. Your feedback helps us improve and provide a better fitness journey for you! 💪📝`,
      title: 'We Value Your Feedback!',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/service-template-images/ser5.jpg',
      text: `Hi [Ayush!] Enjoy your delicious [Paneer Handi] delivered fresh to your doorstep 🍕✨. Bon appétit and thank you for choosing [Sagar Gaire]! 🍽️🚚`,
      title: 'Your Food Has Arrived!',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/service-template-images/ser6.jpg',
      text: `Share your thoughts about your interview experience for [Software Develoeper] at [Magnet Brains Software Technology]📝✨. Your feedback helps us improve our process! 💼🌟`,
      title: 'Interview Feedback!',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
  ];

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
