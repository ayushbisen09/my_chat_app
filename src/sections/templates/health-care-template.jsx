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

export default function HealthCareTemplatesRender() {
  const popover = usePopover();
  const confirm = useBoolean();
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 3; // Number of items per page
  const totalItems = 14; // Total number of items

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Data for ChatBox items with healthcare-related messages
  const chatBoxes = [
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h1.png',
      text: `Hi Rajendra! 🩺 Your appointment with Dr. Ayush Bisen is confirmed for Eye at Today. Please arrive 15 minutes early. See you soon! 😊`,
      title: 'Appointment Confirmation',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi Rajendra! 💊 It's time for your Ayush Bisen medication. Don't forget to take your dose at Today. Stay healthy! 🌟`,
      title: 'Medication Reminder',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi Rajendra! 🌿 Here’s a health tip for you: Stay hydrated and drink at least 8 glasses of water a day. Cheers to good health! 💧`,
      title: 'Health Tip',
      type: 'Image',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi Rajendra! 🌼 Your lab test results for Ayush Bisen are now available. Please check your email or contact us for more information. 📋`,
      title: 'Lab Results Available',
      type: 'Text',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi Rajendra! 🏥 You have an upcoming health check-up on Eye. Please remember to fast 12 hours before the appointment. See you soon! 🍎`,
      title: 'Health Check-up Reminder',
      type: 'Video',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h1.png',
      text: `Hi Rajendra! 🧘‍♂️ Join our free yoga class on Eye at Today. It's a great way to relax and stay fit. Reserve your spot today! 🧘‍♀️`,
      title: 'Yoga Class Invitation',
      type: 'Image',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi Rajendra! 🚑 Emergency contact update! Please make sure your emergency contact details are up to date. Safety first! 🛡️`,
      title: 'Emergency Contact Update',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi Rajendra! 💉 Flu shots are now available! Protect yourself and your loved ones this season. Book your vaccination appointment today! 🌡️`,
      title: 'Flu Shot Availability',
      type: 'File',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h1.png',
      text: `Hi Rajendra! 🥗 Nutrition tip: Incorporate more greens and fruits into your diet for a healthy and balanced lifestyle. 🌿`,
      title: 'Nutrition Tip',
      type: 'Video',
      icon: <Iconify icon="icon-park-outline:share" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi Rajendra! 🩹 Reminder: It's time for your Ayush Bisen. Please make sure to attend your appointment at Today. Stay healthy! 💪`,
      title: 'Appointment Reminder',
      type: 'File',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi Rajendra! 📅 Your dental check-up is scheduled for Eye at Today. Please confirm your appointment or reschedule if needed. 🦷`,
      title: 'Dental Check-up Reminder',
      type: 'Image',
      icon: <Iconify icon="solar:copy-bold" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h1.png',
      text: `Hi Rajendra! 🌞 Good morning! Don’t forget to take your morning vitamins to start your day strong. 🌅`,
      title: 'Morning Vitamins Reminder',
      type: 'Video',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi Rajendra! 🏃‍♂️ Stay active! Regular exercise can help reduce stress and improve overall health. Join our fitness class today! 🏋️‍♀️`,
      title: 'Fitness Class Invitation',
      type: 'Audio',
      icon: <Iconify icon="material-symbols:call" width={20} />,
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi Rajendra! 🛏️ Proper sleep is essential for good health. Aim for at least 7-8 hours of sleep tonight. Sweet dreams! 😴`,
      title: 'Sleep Reminder',
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
