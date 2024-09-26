import { useState } from 'react';
import { useSelector } from 'react-redux';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Card, Avatar, Button, Divider, Tooltip, CardHeader } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import PageHeader from 'src/components/page-header/page-header';

import FileType from 'src/sections/optIn-management/hook/messages-type/file';
import AudioType from 'src/sections/optIn-management/hook/messages-type/audio';
import VideoType from 'src/sections/optIn-management/hook/messages-type/video';
import {
  ConfigurationDrawer1,
  ConfigurationDrawer2,
} from 'src/sections/optIn-management/hook/drawer';

// ----------------------------------------------------------------------

const metadata = { title: `Page four | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const savedTemplate = useSelector((state) => state.template.selectedTemplate);
  const [openDrawer1, setOpenDrawer1] = useState(false);
  const [openDrawer2, setOpenDrawer2] = useState(false);

  const handleOpenDrawer1 = () => {
    setOpenDrawer1(true);
  };

  const handleCloseDrawer1 = () => {
    setOpenDrawer1(false);
  };

  const handleOpenDrawer2 = () => {
    setOpenDrawer2(true);
  };

  const handleCloseDrawer2 = () => {
    setOpenDrawer2(false);
  };

  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };



  const renderTemplateContent = () => {
    switch (savedTemplate.type) {
      case 'video':
        return (
          <VideoType
            videoSrc="../../../public/assets/videos/chat-videos/advertisement.mp4"
            captionsSrc="../../assets/captions/sample.vtt"
          />
        );
      case 'audio':
        return <AudioType audioSrc="../../../public/assets/audios/new-instrumental.mp3" />;
      case 'file':
        return <FileType />;
      default:
        return null;
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <PageHeader
        title="Opt-In Management"
        Subheading="Setup keywords that user can type to Opt-in & Opt-out from messaging campaign."
        showButton={false}
      />
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="API Campaign Opt-out" sx={{ mb: 3 }} />
          <Divider />
          <Tooltip
            title="Click here to Enable/Disable this if you don't wish to send api campaign to opted-out contacts"
            arrow
            placement="top"
          >
            <FormControlLabel
              control={<Switch id="toggle-taxes" />}
              label="Enable this if you don't wish to send api campaign to opted-out contacts"
              sx={{ paddingLeft: 3, mt: 2, mb: 2 }}
            />
          </Tooltip>
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title=" Opt-Out Settings" sx={{ mb: 3 }} />
          <Divider />
          <Stack sx={{ padding: '32px 24px 32px 24px' }}>
            <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
              Opt-Out Keywords:
            </Typography>
            <Tooltip title="Opt-Out keywords" arrow placement="top">
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={tags}
                onChange={(event, newValue) => setTags(newValue)}
                inputValue={tagInput}
                onInputChange={(event, newInputValue) => {
                  setTagInput(newInputValue);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && tagInput.trim()) {
                    setTags([...tags, tagInput.trim()]);
                    setTagInput('');
                    event.preventDefault();
                  }
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="soft"
                      color="info"
                      size="small"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    onClick={handleAddTag}
                    {...params}
                    variant="outlined"
                    size="large"
                    helperText="Enter opt-out keywords"
                    placeholder="+ Add a keyword"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: <InputAdornment position="Start" />,
                    }}
                    sx={{
                      '& .MuiAutocomplete-inputRoot': {
                        minHeight: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                      },
                    }}
                  />
                )}
              />
            </Tooltip>
          </Stack>
          <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />
          <CardHeader
            title={
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Opt-Out Response
              </Typography>
            }
          />
          <Box sx={{ px: 3, py: 2 }}>
            <Tooltip
              title="Click here to Enable/Disable Setup a response message for opt-out user keywords"
              arrow
              placement="top"
            >
              <FormControlLabel
                control={<Switch id="toggle-taxes" />}
                label="Setup a response message for opt-out user keywords"
              />
            </Tooltip>
          </Box>

          <Box sx={{ px: 3, pb: 3 }}>
            {savedTemplate && (
              <Box sx={{ mt: 4 }}>
                <Tooltip title="Opt-Out response preview" arrow placement="top">
                  <Card
                    sx={{
                      border: '1px solid #919EAB33',
                      width: '100%',
                      maxWidth: '380px',
                    }}
                  >
                    <CardHeader
                      sx={{ mb: 2 }}
                      avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                      title={
                        <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                          Mireya Conner
                        </Typography>
                      }
                      subheader={
                        <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                          Online
                        </Typography>
                      }
                    />
                    <Divider />
                    <Typography
                      variant="caption"
                      sx={{
                        pr: 2,
                        pt: 3,
                        display: 'flex',
                        color: '#919EAB',
                        justifyContent: 'end',
                      }}
                    >
                      4:02 PM
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: '#CCF4FE',
                        borderRadius: '8px',
                        m: 2,
                      }}
                    >
                      {renderTemplateContent()}
                  
                  {savedTemplate.chatBoxImage && (
                    <img
                      src={savedTemplate.chatBoxImage}
                      alt="Chat Preview"
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                  )}
                      
                      
                      <Box
                      sx={{mt:2}}>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ fontSize: 14, fontWeight: '500' }}
                      >
                        {savedTemplate.message}
                      </Typography>

                      </Box>
                    </Box>
                  </Card>
                </Tooltip>
              </Box>
            )}

            <Tooltip title=" Configure Opt-Out response " arrow placement="top">
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="inherit"
                onClick={handleOpenDrawer1}
              >
                Configure
              </Button>
            </Tooltip>
            <ConfigurationDrawer1 open={openDrawer1} onClose={handleCloseDrawer1} />
          </Box>
        </Card>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardHeader title="Opt-In Settings" sx={{ mb: 3 }} />
          <Divider />
          <Stack sx={{ padding: '32px 24px 32px 24px' }}>
            <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
              Opt-In Keywords:
            </Typography>
            <Tooltip title="Opt-In keywords" arrow placement="top">
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={tags}
                onChange={(event, newValue) => setTags(newValue)}
                inputValue={tagInput}
                onInputChange={(event, newInputValue) => {
                  setTagInput(newInputValue);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && tagInput.trim()) {
                    setTags([...tags, tagInput.trim()]);
                    setTagInput('');
                    event.preventDefault();
                  }
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="soft"
                      color="info"
                      size="small"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    onClick={handleAddTag}
                    {...params}
                    variant="outlined"
                    size="large"
                    helperText="Enter opt-out keywords"
                    placeholder="+ Add a tag"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: <InputAdornment position="Start" />,
                    }}
                    sx={{
                      '& .MuiAutocomplete-inputRoot': {
                        minHeight: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                      },
                    }}
                  />
                )}
              />
            </Tooltip>
          </Stack>
          <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />
          <CardHeader
            title={
              <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                Opt-In Response
              </Typography>
            }
          />
          <Box sx={{ px: 3, py: 2 }}>
            <Tooltip
              title="Click here to Enable/Disable Setup a response message for Opt-In user keywords"
              arrow
              placement="top"
            >
              <FormControlLabel
                control={<Switch id="toggle-taxes" />}
                label="Setup a response message for Opt-In user keywords"
              />
            </Tooltip>
          </Box>
          <Box sx={{ px: 3, pb: 3 }}>
            <Tooltip title="Opt-In response preview" arrow placement="top">
              <Card
                sx={{
                  border: '1px solid #919EAB33',
                  width: '100%',
                  maxWidth: '500px',
                }}
              >
                <CardHeader
                  sx={{ mb: 2 }}
                  avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                  title={
                    <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
                      Mireya Conner
                    </Typography>
                  }
                  subheader={
                    <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
                      Online
                    </Typography>
                  }
                />
                <Divider />
                <Typography
                  variant="caption"
                  sx={{
                    pr: 2,
                    pt: 3,
                    display: 'flex',
                    color: '#919EAB',
                    justifyContent: 'end',
                  }}
                >
                  4:02 PM
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: '#CCF4FE',
                    borderRadius: '8px',
                    m: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: 14, fontWeight: '500' }}
                  >
                    Hey,
                    <br />
                    {
                      ' Thank you for opting-out. In future if you ever want to connect again just send "Hello". '
                    }
                  </Typography>
                </Box>
              </Card>
            </Tooltip>
            <Tooltip title="Configure Opt-In response " arrow placement="top">
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="inherit"
                onClick={handleOpenDrawer2}
              >
                Configure
              </Button>
            </Tooltip>
            <ConfigurationDrawer2 open={openDrawer2} onClose={handleCloseDrawer2} />
          </Box>
        </Card>
      </Box>
    </DashboardContent>
  );
}
