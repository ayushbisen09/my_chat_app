import { useState } from 'react';
import { useTheme } from '@emotion/react';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Card,
  Grid,
  Alert,
  Select,
  Avatar,
  MenuItem,
  Snackbar,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Function to generate a random number between min and max
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate initials from a name
const getInitials = (name) => name.split(' ').map((n) => n[0]).join('');

// Function to generate a random background color
const getRandomColor = () => {
  const colors = ['#FFB6C1', '#87CEFA', '#FFD700', '#FF7F50', '#DA70D6', '#FF69B4', '#FFA500', '#8A2BE2', '#FF4500'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function Kanban({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  ...other
}) {
  // State to manage the selected value and card placement
  const [cardData, setCardData] = useState({
    Open: Array(10).fill('Open'),
    'On Hold': Array(8).fill('On Hold'),
    Replied: Array(6).fill('Replied'),
    Resolved: Array(9).fill('Resolved'),
    Closed: Array(4).fill('Closed'),
  });

  // State to manage Snackbar visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Placeholder for task names
  const taskNames = ['Neeraj Agarwal', 'Anand Nayak', 'Chetali Parve', 'Hardik Pradhan', 'Ankit Mandli'];

  const handleFlowChange = (event, cardIndex, childIndex) => {
    const newValue = event.target.value;
    const oldTitle = Object.keys(cardData)[cardIndex];
    const updatedData = { ...cardData };
    const childValues = updatedData[oldTitle];
    
    // Remove the child card from the current list
    childValues[childIndex] = null;

    // Add the child card to the new list
    const newTitle = newValue;
    updatedData[oldTitle] = childValues.filter(value => value !== null);

    if (!updatedData[newTitle]) {
      updatedData[newTitle] = [];
    }
    updatedData[newTitle].push(newValue);

    setCardData(updatedData);

    // Show Snackbar with message
    setSnackbarMessage(`Chat moved to ${newTitle}`);
    setSnackbarOpen(true);
  };

  // Get unique titles from the cardData state
  const cardTitles = Object.keys(cardData);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {cardTitles.map((title, cardIndex) => (
          <Grid item xs={12} sm={6} md={4} key={cardIndex}>
            <Card
              sx={{
                boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
                px: 2,
                pt: 2,
                backgroundColor: '#F4F6F8',
                border: '2px solid transparent',
                ...sx,
              }}
              {...other}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                    <Typography
                      sx={{
                        mr: 2,
                        px: 1,
                        py: 0.2,
                        backgroundColor: '#DFE3E8',
                        borderRadius: '18px',
                        color: '#637381',
                        fontWeight: 'bold',
                        fontSize: '16px'
                      }}
                    >
                      {cardData[title]?.length || 0}
                    </Typography>
                    <Typography variant="h6">{title}</Typography>
                  </Box>
                }
                sx={{ p: 0, mb: 2 }}
              />
              {/* Scrollable chat container */}
              <Box sx={{ maxHeight: 500, overflowY: 'auto', pr: 1 }}> {/* Set maxHeight and enable vertical scroll */}
                {cardData[title]?.map((childValue, childIndex) => {
                  // Assign a random task name for demonstration
                  const taskName = taskNames[childIndex % taskNames.length];
                  const initials = getInitials(taskName);
                  const bgColor = getRandomColor();

                  return (
                    <Card
                      key={childIndex}
                      sx={{
                        boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
                        px: 3.5,
                        pt: 2.5,
                        pb: 2.5,
                        borderRadius: '12px',
                        border: '1px solid transparent',
                        mb: 3,
                      }}
                      {...other}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar
                          sx={{
                            cursor: 'pointer',
                            width: 30,
                            height: 30,
                            mr: 2,
                            bgcolor: bgColor,
                            fontSize: '14px',
                            fontWeight: 'bold',
                          }}
                        >
                          {initials}
                        </Avatar>
                        <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>{taskName}</Typography>
                      </Box>
                      
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: '400',
                          mb: 2,
                          color: 'text.disabled',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        This message can be easily customized depending on your relationship with the recipient and the context.
                      </Typography>

                      <FormControl sx={{ mb: 3, width: 'auto' }} size="small">
                        <InputLabel id={`condition-select-label-${cardIndex}-${childIndex}`} />
                        <Select
                          labelId={`condition-select-label-${cardIndex}-${childIndex}`}
                          id={`condition-select-${cardIndex}-${childIndex}`}
                          value={childValue || 'Open'}
                          onChange={(event) => handleFlowChange(event, cardIndex, childIndex)}
                        >
                          <MenuItem value="Open">Open</MenuItem>
                          <MenuItem value="On Hold">On Hold</MenuItem>
                          <MenuItem value="Replied">Replied</MenuItem>
                          <MenuItem value="Closed">Closed</MenuItem>
                          <MenuItem value="Resolved">Resolved</MenuItem>
                        </Select>
                      </FormControl>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 0.5 }}>
                            <IconButton>
                              <Iconify width={16} icon="ant-design:message-filled" sx={{ color: 'text.secondary', p: 0 }} />
                            </IconButton>
                            <Typography sx={{ ml: -0.5, fontSize: '12px' }}>{getRandomNumber(1, 100)}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Card>
                  );
                })}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
