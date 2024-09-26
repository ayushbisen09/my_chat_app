import React from 'react';

import { Box, Typography, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Function to extract file name from URL
const getFileNameFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};

// Function to get file type based on extension
const getFileType = (fileName) => {
  const extension = fileName.split('.').pop();
  const typeMap = {
    pdf: 'PDF File',
    doc: 'DOC File',
    docx: 'DOCX File',
    csv: 'CSV File',
    // Add more extensions if needed
  };
  return typeMap[extension] || 'Unknown File Type';
};

const FileType = () => {
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
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <Typography>{fileName}</Typography> {/* Updated variant */}
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

export default FileType;
