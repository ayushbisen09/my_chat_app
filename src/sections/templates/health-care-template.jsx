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

export default function HealthCareTemplatesRender() {
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page

  // Data for ChatBox items with healthcare-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h1.jpg',
      text: `Hi [Rajendra]! Prioritize the health of [Son], [Daughter], and [Grand-Father] with [Hope Hospital] ❤️🩺. Keep your family [Healthy] and happy! 👨‍👩‍👧‍👦✨`,
      title: 'Family Health First',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.jpg',
      text: `Hi [Rajendra]!  Providing [Complete Blood Count] for [Ayush Bisen] with utmost safety and precision 🩺🧑‍⚕️. Trust us to keep your [Health Condition] in check! 💙✨`,
      title: 'Ensuring Safe Care',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.jpg',
      text: `Hi [[Rajendra]]! The dedicated team of [Orthopedic Surgeon], [Neurosurgeon], and [Plastic Surgeon] working together to provide [Complete Service] 🏥💙. Strength in unity for better care! ✨👩‍⚕️👨‍⚕️`,
      title: 'Healthcare Heroes United',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h4.jpg',
      text: `Hi [Rajendra]!  Delivering [Amlodipine] for [High Blood Pressure] with care and precision 💊🩺. Trust us to prioritize your health and well-being! 💙✨📋`,
      title: 'Essential Medications',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h6.jpg',
      text: `Hi [Rajendra]! Ensuring the best healthcare for [Hezal] with compassion and expertise 🩺👶. Because your child’s health means the world to us! 💙✨`,
      title: 'Caring for Little Smiles',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h5.jpg',
      text: `Hi [Rajendra]! Strengthen your well-being with [Family Medicine Services], [Preventive Care (Vaccinations, Screenings)], and [General Practitioner (GP) Consultations] 🏥✨. Comprehensive care tailored for your health needs! 💙🔧`,
      title: 'Building Better Healthcare',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h7.jpg',
      text: `Hi [Rajendra]! Organize and manage [Amlodipine] for [High Blood Pressure]  with ease 💊🕒. Supporting your journey to better health, one dose at a time! 💙✨`,
      title: 'Timely Medication Matters',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h8.jpg',
      text: `Hi [Rajendra]! Supporting [Manoj] with personalized healthcare plans and expert guidance 🩺✨. Your well-being is our priority! 💙👩‍⚕️`,
      title: 'Compassionate Care',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h9.jpg',
      text: `Hi [Rajendra]! Dedicated to ensuring [Ankit]'s heart health with advanced care and compassion ❤️🩺. Your health, our commitment! 💙✨`,
      title: 'Heartfelt Care',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h10.jpg',
      text: `Hi [Rajendra]! Addressing [Short Term Memory Loss] with advanced treatments and expert care 🧠✨. Prioritizing [Gajni]'s mental and neurological health! 💙🩺`,
      title: 'Focused Brain Care',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h11.jpg',
      text: `Hi [Rajendra]! Providing specialized care for [Asthma] with advanced treatments and diagnostics 🫁✨. Prioritizing healthy lungs and better breathing for [AramDeep]! 💙🩺`,
      title: 'Breathe Easy',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h12.jpg',
      text: `Hi [Rajendra]! Delivering advanced treatments for [Kedney Stone] to ensure healthy kidney function 🩺✨. Trust us to care for [Prajwal]'s renal health with expertise! 💙`,
      title: 'Kidney Care',
      type: 'Video',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h13.jpg',
      text: `Hi [Rajendra]! 🏃‍♂️ Stay active! Regular exercise can help reduce stress and improve overall health. Join our fitness class today! 🏋️‍♀️`,
      title: 'Fitness Class Invitation',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h14.jpg',
      text: `Hi [Rajendra]! Harness the healing benefits of Ayurveda with [Amla], [Tulsi ], and [Ashwagandha] 🌿✨. Restore balance and vitality naturally! 🌟💚`,
      title: 'Ayurvedic Wellness',
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
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Healthcare Messages</Typography>
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
