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

export default function SpecialOccasionsTemplatesRender() {
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page

  // Data for ChatBox items with special occasion messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s1.jpg',
      text: `Hi [Aman!] 🎂 Light up the special day with [24] candles and a delicious [Pine Apple] cake 🎂✨. Make every moment unforgettable! 🎉🥳 🎉`,
      title: 'Happy Birthday',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s2.jpg',
      text: `Hi [Aman!] 💍 Congratulations on your Engagement! Wishing you a wonderful journey ahead as you build your new life together. 💖`,
      title: 'Engagement Congratulations',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s3.jpg',
      text: `Hi [Aman!] 💍 Congratulations on your Marriage! Wishing you a lifetime of love and happiness together. 🎉`,
      title: 'Marriage Congratulations',
      type: 'Video',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s4.jpg',
      text: `Hi [Aman!] 🎉 Happy New Year! May this year bring new happiness, new goals, new achievements, and a lot of new inspirations to your life. 🌟`,
      title: 'Happy New Year',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s5.jpg',
      text: `Hi [Aman!] 🇮🇳 Happy Independence Day! Let’s celebrate the spirit of freedom and unity. Jai Hind! 🎉`,
      title: 'Independence Day',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s6.jpg',
      text: `Hi [Aman!] Celebrate the achievement of [Ayush Bisen] at the [MGCGV Chitrakoot] 🎓✨. A proud moment marking the start of a bright future! 🌟🎉🎉`,
      title: 'Hats Off to Success',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s7.jpg',
      text: `Hi [Aman!] Celebrate the arrival of [Hezal] with love, laughter, and special memories 🎉👶. Join us for a delightful baby shower! 🌸✨🎉`,
      title: 'Bundle of Joy on the Way',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s8.jpg',
      text: `Hi [Aman!] 🎂 Celebrate the inauguration of your new home with love, rituals, and blessings 🏡✨. May this space be filled with happiness and prosperity! 🌸🎉 🎉`,
      title: 'A Warm Welcome Home"',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s9.jpg',
      text: `Hi [Aman!] Celebrate [Rajveer Singh]'s incredible journey and the start of a new chapter 🎉✨. Wishing happiness, relaxation, and new adventures ahead! 🌟🎁🌟`,
      title: 'Cheers to Retirement!',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s10.jpg',
      text: `Hi [Aman!] Protect the planet for future generations 🌳✨. Together, let’s grow a greener, healthier world! 🌍💚`,
      title: 'Nurture Nature',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s11.jpg',
      text: `Hi [Aman!] Celebrate the joy and innocence of childhood 🌈✨. Wishing all the little stars a day filled with fun, love, and laughter! 🎈💖`,
      title: 'Happy Children’s Day!',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s12.jpg',
      text: `Hi [Aman!] Celebrate Peace Day by spreading harmony, love, and understanding 🕊️✨. Together, let’s create a world united in peace! 🌍💙`,
      title: 'International Day of Peace',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s13.jpg',
      text: `Hi [Aman!] Celebrate Earth Day by embracing sustainability and preserving our beautiful planet 🌍✨. Together, let’s build a greener future! 🌱💚`,
      title: 'Protect Our Planet',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/special-occasions-template-images/s14.jpg',
      text: `Hi [Aman!] Honoring the strength, grace, and achievements of women around the world 🌸✨. Happy Women’s Day to all the incredible women! 💖🌟💖`,
      title: 'Celebrating Women’s Day',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
  ];

  const totalItems = chatBoxes.length;

  // Calculate the number of pages
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Get the items to display based on the current page
  const displayedChatBoxes = chatBoxes.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Special Occasions</Typography>
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
