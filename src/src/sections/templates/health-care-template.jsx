import React, { useState } from 'react';

import {
  Box,
  Button,
  MenuItem,
  MenuList,
  TextField,
  Pagination,
  Typography,
  InputAdornment,
  paginationClasses,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import ChatBox from 'src/components/chat-box/chat-box';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

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
      text: `Hi {{1}}! 🩺 Your appointment with Dr. {{2}} is confirmed for {{5}} at {{6}}. Please arrive 15 minutes early. See you soon! 😊`,
      title: 'Appointment Confirmation',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi {{1}}! 💊 It's time for your {{2}} medication. Don't forget to take your dose at {{6}}. Stay healthy! 🌟`,
      title: 'Medication Reminder',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi {{1}}! 🌿 Here’s a health tip for you: Stay hydrated and drink at least 8 glasses of water a day. Cheers to good health! 💧`,
      title: 'Health Tip',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi {{1}}! 🌼 Your lab test results for {{2}} are now available. Please check your email or contact us for more information. 📋`,
      title: 'Lab Results Available',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi {{1}}! 🏥 You have an upcoming health check-up on {{5}}. Please remember to fast 12 hours before the appointment. See you soon! 🍎`,
      title: 'Health Check-up Reminder',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h1.png',
      text: `Hi {{1}}! 🧘‍♂️ Join our free yoga class on {{5}} at {{6}}. It's a great way to relax and stay fit. Reserve your spot today! 🧘‍♀️`,
      title: 'Yoga Class Invitation',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi {{1}}! 🚑 Emergency contact update! Please make sure your emergency contact details are up to date. Safety first! 🛡️`,
      title: 'Emergency Contact Update',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi {{1}}! 💉 Flu shots are now available! Protect yourself and your loved ones this season. Book your vaccination appointment today! 🌡️`,
      title: 'Flu Shot Availability',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h1.png',
      text: `Hi {{1}}! 🥗 Nutrition tip: Incorporate more greens and fruits into your diet for a healthy and balanced lifestyle. 🌿`,
      title: 'Nutrition Tip',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi {{1}}! 🩹 Reminder: It's time for your {{2}}. Please make sure to attend your appointment at {{6}}. Stay healthy! 💪`,
      title: 'Appointment Reminder',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi {{1}}! 📅 Your dental check-up is scheduled for {{5}} at {{6}}. Please confirm your appointment or reschedule if needed. 🦷`,
      title: 'Dental Check-up Reminder',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h1.png',
      text: `Hi {{1}}! 🌞 Good morning! Don’t forget to take your morning vitamins to start your day strong. 🌅`,
      title: 'Morning Vitamins Reminder',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h2.png',
      text: `Hi {{1}}! 🏃‍♂️ Stay active! Regular exercise can help reduce stress and improve overall health. Join our fitness class today! 🏋️‍♀️`,
      title: 'Fitness Class Invitation',
    },
    {
      coverSrc: '../../assets/images/chatImage/health-care-template-images/h3.png',
      text: `Hi {{1}}! 🛏️ Proper sleep is essential for good health. Aim for at least 7-8 hours of sleep tonight. Sweet dreams! 😴`,
      title: 'Sleep Reminder',
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
        <Button
          disableRipple
          color="inherit"
          onClick={popover.onOpen}
          endIcon={
            <Iconify
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          }
          sx={{ fontWeight: 'fontWeightSemiBold' }}
        >
          Sort by:
          <Box
            component="span"
            sx={{ ml: 0.5, fontWeight: 'fontWeightBold', textTransform: 'capitalize' }}
          />
        </Button>

        <CustomPopover
          open={popover.open}
          anchorEl={popover.anchorEl}
          onClose={popover.onClose}
        >
          <MenuList>
            <MenuItem>Latest</MenuItem>
            <MenuItem>Popular</MenuItem>
            <MenuItem>Oldest</MenuItem>
          </MenuList>
        </CustomPopover>
      </Box>

      <Box
        sx={{ mt: '24px' }}
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {displayedChatBoxes.map((chatBox, index) => (
          <ChatBox
            key={index}
            coverSrc={chatBox.coverSrc}
            showImage
            text={<>{chatBox.text}</>}
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
