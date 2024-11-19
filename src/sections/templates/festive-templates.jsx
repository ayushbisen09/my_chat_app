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

export default function FestiveTemplatesRender() {
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page

  // Function to handle page change

  // Data for ChatBox items with festive-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes1.jpg',
      text: `Hi [Ayush!] 🌈 Happy Holi! May the colors of joy, happiness, and positivity fill your life. 🥳`,
      title: 'Holi Greetings',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes2.jpg',
      text: `Hi [Ayush!] 🎆 Happy Diwali! May this festival of lights bring joy and prosperity to your life. 🪔`,
      title: 'Diwali Wishes',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes3.jpg',
      text: `Hi [Ayush!] 🎉 Happy Navratri! May the divine blessings of Maa Durga be with you always. 🌺`,
      title: 'Navratri Blessings',
      type: 'Video',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes4.jpg',
      text: `Hi [Ayush!] 🙏 Happy Ganesh Chaturthi! May Lord Ganesha bring you happiness, wisdom, and prosperity. 🐘`,
      title: 'Ganesh Chaturthi',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes5.jpg',
      text: `Hi [Ayush!] 🤗 Happy Raksha Bandhan! May the bond of love and protection between siblings grow stronger. 🎁`,
      title: 'Raksha Bandhan',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes6.jpg',
      text: `Hi [Ayush!] 🤗 Happy Raksha Bandhan! May the bond of love and protection between siblings grow stronger. 🎁`,
      title: 'Raksha Bandhan Special',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes7.jpg',
      text: `Hi [Ayush!] 🎆 Celebrate togetherness with [Diwali] vibes 🎉👨‍👩‍👧‍👦. Share love, laughter, and delicious moments with your family! ✨🍛🪔`,
      title: 'Festive Family Joy',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes8.jpg',
      text: `Hi [Ayush!] Embrace the spirit of [Diwali] with diyas, devotion, and delicious treats 🪔✨. Let the light of joy fill your home! 🌟🎊 🏵️`,
      title: 'Divine Festive Glow',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes9.jpg',
      text: `Hi [Ayush!] Celebrate the auspicious [Ganesh Pooja] with devotion, diyas, and delicious prasad 🪔🌟. Bring prosperity and joy to your home! 🎊✨`,
      title: 'Blessings & Lights',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes10.jpg',
      text: `Hi [Ayush!] Celebrate the sacred [Chhath Puja] with prayers, offerings, and gratitude 🌅🙏. Honor traditions and seek blessings from the Sun God! 🌞✨`,
      title: 'Chhath Puja Devotion',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes11.jpg',
      text: `Hi [Ayush!] Celebrate the magic of Cristmas with joy, gifts, and love 🎅🎁. Let the holiday spirit light up your home! ✨🌟🪔`,
      title: 'Santa’s Cheer',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes12.jpg',
      text: `Hi [Ayush!]  Celebrate Easter with love, happiness, and colorful surprises 🌸🐰. Let the spirit of renewal fill your heart with joy! 🥚✨`,
      title: 'Joyful Easter',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes13.jpg',
      text: `Hi [Ayush!] Celebrate the harvest with joy, gratitude, and traditions 🌾🍚. May this Pongal bring prosperity and happiness to your home! 🪁✨`,
      title: 'Happy Pongal!',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/festival-template-images/fes14.jpg',
      text: `Hi [Ayush!] Celebrate the festival of prosperity and unity with joy and vibrant traditions 🌸🌾. Wishing you and your family a blessed Onam! 🌟🎉`,
      title: 'Happy Onam!',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
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
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Festive Messages</Typography>
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
