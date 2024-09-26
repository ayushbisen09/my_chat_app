import React from 'react';

import { Box, Typography, IconButton } from '@mui/material';

import { Iconify } from '../../iconify';

// Function to extract file name from URL
const getFileNameFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};

// Function to get file type based on extension
const getFileType = (fileName) => {
  const extension = fileName.split('.').pop();
  const typeMap = {
    'pdf': 'PDF File',
    'doc': 'DOC File',
    'docx': 'DOCX File',
    'csv': 'CSV File',
    // Add more extensions if needed
  };
  return typeMap[extension] || 'Unknown File Type';
};

const FileMessage = () => {
  // Define the file object
  const file = {
    url: '/assets/videos/chat-videos/sample-pdf.pdf',
  };

  const fileName = getFileNameFromUrl(file.url);
  const fileType = getFileType(fileName);

  const handleDownloadAndOpen = () => {
    // Create a temporary link element for downloading the file
    const link = document.createElement('a');
    link.href = file.url;
    link.download = fileName; // This triggers the file download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        width: '320px', // Correct property name for width
        backgroundColor: '#CCF4FE', // Background color
        padding: 1.5, // Padding for better spacing
        borderRadius: '8px',
      }}
    >
      <Typography
        
        sx={{
          fontSize: '16px',
          position: 'absolute',
          right: '305px', // Adjust X-axis position
          top: '100%', // Adjust Y-axis position
          transform: 'translateY(-50%)', // Center vertically
          zIndex: 1, // Ensure it's above other content
          border: '1px solid #E6E6E6',
          borderRadius: '20px',
          backgroundColor: '#FFFFFF',
          p:0.1,

        }}
      >
        🙏
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <Typography >{fileName}</Typography> {/* Updated variant */}
          <Typography variant="body2" color="textSecondary">
            {fileType}
          </Typography>
        </Box>
        <IconButton onClick={handleDownloadAndOpen}>
          <Iconify width={24} icon="ic:round-download" sx={{ color: 'text.secondary' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FileMessage;
