import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Card,
  Grid,
  Alert,
  Select,
  Tooltip,
  MenuItem,
  Snackbar,
  CardHeader,
  Typography,
  useMediaQuery,
} from '@mui/material';

// Function to generate a random number between min and max

// Function to generate initials from a name
const getInitials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('');

// Function to generate a random background color
const getRandomColor = () => {
  const colors = [
    '#FFB6C1',
    '#87CEFA',
    '#FFD700',
    '#FF7F50',
    '#DA70D6',
    '#FF69B4',
    '#FFA500',
    '#8A2BE2',
    '#FF4500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function AgentQues() {
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
  const taskNames = [
    'Neeraj Agarwal',
    'Anand Nayak',
    'Chetali Parve',
    'Hardik Pradhan',
    'Ankit Mandli',
  ];

  const handleFlowChange = (event, cardIndex, childIndex) => {
    const newValue = event.target.value;
    const oldTitle = Object.keys(cardData)[cardIndex];
    const updatedData = { ...cardData };
    const childValues = updatedData[oldTitle];

    // Remove the child card from the current list
    childValues[childIndex] = null;

    // Add the child card to the new list
    const newTitle = newValue;
    updatedData[oldTitle] = childValues.filter((value) => value !== null);

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

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1172px',
        margin: '0 auto',

        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px',
        },

        '&::-webkit-scrollbar-thumb': {
          borderRadius: '10px',
          backgroundColor: 'rgba(99, 115, 129, 0.5)',
        },
      }}
    >
      <Grid
        container
        spacing={1.5}
        wrap="nowrap"
        sx={{
          minWidth: 'max-content',
          mb: 1,
        }}
      >
        {cardTitles.map((title, cardIndex) => (
          <Grid item key={cardIndex}>
            <Card
              sx={{
                boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
                pl: 2,
                // pt: 2,
                py: 2,
                backgroundColor: '#F4F6F8',
                border: '2px solid transparent',

                width: {
                  xs: '280px',
                  sm: '320px',
                  md: '380px',
                },
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: 'flex', alignItems: 'center', px: 1, pt: 1 }}>
                    <Tooltip
                      title={`This is the total of chats in the ${title}  chat is: ${cardData[title]?.length || 0} `}
                      arrow
                      placement="top"
                    >
                      <Typography
                        sx={{
                          mr: 2,
                          px: 1,
                          py: 0.2,
                          backgroundColor: '#DFE3E8',
                          borderRadius: '18px',
                          color: '#637381',
                          fontWeight: 'bold',
                          fontSize: '16px',
                        }}
                      >
                        {cardData[title]?.length || 0}
                      </Typography>
                    </Tooltip>
                    <Tooltip
                      title={`This is the chat status title: ${title}`}
                      arrow
                      placement="top"
                    >
                      <Typography variant="h6">{title}</Typography>
                    </Tooltip>
                  </Box>
                }
                sx={{ p: 0, mb: 2 }}
              />
              {/* Scrollable chat container */}
              <Box
                sx={{
                  maxHeight: {
                    xs: '400px',
                    sm: '500px',
                    md: '616px',
                  }, // Adjust as needed for the maximum height
                  overflowY: 'auto', // Enable vertical scrolling
                  '&::-webkit-scrollbar': {
                    width: '6px', // Width of the scrollbar
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#F4F6F8', // Scrollbar track color
                  },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '10px', // Roundness of the scrollbar thumb
                    backgroundColor: 'rgba(99, 115, 129, 0.5)', // Set opacity to 50%
                  },
                }}
              >
                {cardData[title]?.map((childValue, childIndex) => {
                  const taskName = taskNames[childIndex % taskNames.length];
                  const initials = getInitials(taskName);
                  const bgColor = getRandomColor();

                  return (
                    <Card
                      key={childIndex}
                      sx={{
                        boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
                        px: 2,
                        pt: 2.5,
                        pb: 2.5,
                        borderRadius: '12px',
                        border: '1px solid transparent',
                        // mb: 2,
                        mr: 1,
                        mb: childIndex === cardData[title].length - 1 ? 0.5 : 1.5, // Conditionally apply margin
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {/* <Tooltip title="Initial name of the the chat" arrow placement="top">
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
                        </Tooltip> */}
                        <Tooltip
                          title="This is the full name of the the chat in the Agent list"
                          arrow
                          placement="top"
                        >
                          <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                            {taskName}
                          </Typography>
                        </Tooltip>
                      </Box>
                      <Tooltip
                        title='This is the last message of this contact: "This message can be easily customized depending on your relationship with the recipient and the context."'
                        arrow
                        placement="top"
                      >
                        <Typography
                          onClick={() =>
                            navigate('/app/inbox?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2')
                          }
                          sx={{
                            fontSize: '14px',
                            fontWeight: '400',
                            mb: 1.5,
                            color: 'text.disabled',
                            maxHeight: '66px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            cursor: 'pointer', // Add cursor styling to indicate it's clickable
                          }}
                        >
                          I am good too. I just finished working on a new project at work. It’s been
                          quite a challenge, but I’m excited about it
                        </Typography>
                      </Tooltip>

                      <FormControl sx={{ width: 'auto' }} size="small">
                        <InputLabel id={`condition-select-label-${cardIndex}-${childIndex}`} />
                        <Tooltip
                          title={`Click here to move the chat to: ${[
                            'Open',
                            'On Hold',
                            'Replied',
                            'Closed',
                            'Resolved',
                          ]
                            .filter((status) => status !== childValue)
                            .join(', ')}`}
                          arrow
                          placement="top"
                        >
                          <Select
                            labelId={`condition-select-label-${cardIndex}-${childIndex}`}
                            id={`condition-select-${cardIndex}-${childIndex}`}
                            value={childValue || 'Open'}
                            onChange={(event) => handleFlowChange(event, cardIndex, childIndex)}
                            size="small"
                          >
                            <MenuItem value="Open">Open</MenuItem>
                            <MenuItem value="On Hold">On Hold</MenuItem>
                            <MenuItem value="Replied">Replied</MenuItem>
                            <MenuItem value="Closed">Closed</MenuItem>
                            <MenuItem value="Resolved">Resolved</MenuItem>
                          </Select>
                        </Tooltip>
                      </FormControl>
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
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
