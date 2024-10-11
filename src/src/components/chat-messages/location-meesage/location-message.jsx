import React from 'react';

import { Box } from '@mui/material';

export default function LocationCard() {
  // Google Maps embed URL
  const mapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.7692259564105!2d77.43368311189319!3d23.215079378952012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4253aaaaaaab%3A0x32921fc49af59a1e!2sMagnet%20Brains!5e0!3m2!1sen!2sin!4v1726048550283!5m2!1sen!2sin';

  // Extract latitude and longitude using regex
  const latRegex = /3d(-?\d+(\.\d+)?)/;
  const lonRegex = /2d(-?\d+(\.\d+)?)/;
  const latitude = mapUrl.match(latRegex)[1];
  const longitude = mapUrl.match(lonRegex)[1];

  return (
    <Box
      sx={{
        width: '320px',
        p: 1.5,
        backgroundColor: '#F4F6F8',
        borderRadius: '8px',
      }}
    >
      <Box sx={{ flex: 1, borderRadius: '8px', border: '1px', mb:3}}>
        <iframe
          title="Google Maps Location"
          src={mapUrl}
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        />
      </Box>
      {/* Display the dynamically extracted latitude and longitude values */}
      <Box >
        <Box sx={{ mb: 1 , fontSize: '14px' }}>
          <div>Latitude: {latitude}</div>
        </Box>
        <Box sx={{fontSize: '14px'}}>
          <div>Longitude: {longitude}</div>
        </Box>
      </Box>
    </Box>
  );
}
