import React from 'react';

import { Box, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';

import { Iconify } from 'src/components/iconify'; // Adjust your Iconify import as needed

const contacts = ['Ayush Bisen']; // Example contact names

export default function ShareContact() {
  return (
    <Box
      sx={{
        width: '320px',
        p: 1.5,
        backgroundColor: '#F4F6F8',
        borderRadius: '8px',
      }}
    >
      {contacts.map((contact, index) => (
        <React.Fragment key={index}>
          <Typography
            sx={{
              fontSize: '16px',
              position: 'absolute',
              left: '-10px',
              top: '100%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              border: '1px solid #E6E6E6',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              p: 0.1,
            }}
          >
            🙏
          </Typography>
          <Box sx={{mb:2}}>
            <Typography sx={{fontSize: '14px'}} > Contact Name: {contact}</Typography>
          </Box> 

         
        </React.Fragment>
      ))}

      {/* Accordion */}
      <Accordion>
        <AccordionSummary
          expandIcon={<Iconify icon="iconamoon:arrow-down-2-bold" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{fontSize: '14px'}}>More Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{fontSize: '14px'}}>
            Contact Number: XXX44524XX
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
