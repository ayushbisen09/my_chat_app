import dayjs from 'dayjs';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { FormProvider } from 'react-hook-form';
import ReactCountryFlag from 'react-country-flag';
import React, { useState, useCallback } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  Card,
  Radio,
  Button,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  RadioGroup,
  Typography,
  useMediaQuery,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { countries } from 'src/assets/data';
import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import PageHeader from 'src/components/page-header/page-header';

import RegularMessage from './regular-message';
import { SelectContactDrawer } from './hook/drawer';
import PreApprovedMessage from './pre-approved-message';

export default function AddBroadcast() {
  const [selectedCondition, setSelectedCondition] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer1, setOpenDrawer1] = useState(false);
  const [ setOpenConfirmDialog] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const { includedArray, excludedArray } = useSelector((state) => state.includedArray);
  
  const handleApiEndpointChange = (event) => {
    setApiEndpoint(event.target.value);
  };

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
    // Clear the attribute when changing the condition
  };

  const [messageType, setMessageType] = useState('pre_approved_message');
  const [scheduleType, setScheduleType] = useState('yes_schedule');
  const [templateType, setTemplateType] = useState('text');
  
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState(dayjs(new Date()));

  const handleOpenDrawer1 = () => setOpenDrawer1(true);
  const handleCloseDrawer1 = () => setOpenDrawer1(false);

  const handleConfirmOpen = () => setOpenConfirmDialog(true);
  const handleConfirmClose = () => setOpenConfirmDialog(false);
  
  const [chatBoxImage, setChatBoxImage] = useState('');
  const [message, setMessage] = useState(
    'Thank you for opting-out. In the future, if you ever want to connect again just send "Hello".'
  );

  const handleConfirm = () => {
    // Logic to handle confirmation
    setOpenConfirmDialog(false);
    // Update includedArray or other states as needed
  };

  const handleRadioChange = (event) => setMessageType(event.target.value);
  const handleFieldChange = (event) => setTemplateType(event.target.value);
  const handleScheduleChange = (event) => setScheduleType(event.target.value);
  
  const handleCountryChange = (event) =>
    setSelectedCountry(countries.find((country) => country.code === event.target.value));
  
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  
  const TEMPLATES = [
    { value: 'broadcastCampaign', label: 'Broadcast Campaign' },
    { value: 'apiCampaign', label: 'API Campaign' },
  ];
  
  const [template, setTemplate] = useState('broadcastCampaign'); // Set default value here
  
  const handleChangeTemplate = useCallback((event) => {
    setTemplate(event.target.value);
  }, []);

  const updatedCountries = countries.map((country) => ({
    ...country,
    phone: `+${country.phone}`,
  }));

  const handleChangeMessageType = useCallback((event) => {
    const selectedType = event.target.value;
    setTemplateType(selectedType);

    const defaultImages = {
      text: '',
      image: '../../assets/images/chatImage/imagechat.png',
      video: '../../assets/images/chatImage/video.png',
      file: '../../assets/images/chatImage/document.png',
      audio: '../../assets/images/chatImage/audio.png',
    };

    setChatBoxImage(defaultImages[selectedType] || defaultImages.text);
    if (['file', 'audio', 'video'].includes(selectedType)) {
      setMessage('');
    }
  }, []);

  const MESSAGETYPES = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'file', label: 'File' },
    { value: 'video', label: 'Video' },
    { value: 'audio', label: 'Audio' },
  ];

  // Define helper texts based on template
  const helperTexts = {
    broadcastCampaign: 'Select and filter among your existance audience & Broadcast customized Template or Regular message.',
    apiCampaign: 'Connect your existing systems with our endpoints & send notifications to your users on WhatsApp.',
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          mb: 0,
        }}
      >
        <PageHeader
          title="Whatsapp Broadcast"
          Subheading="Launch a campaign now to initiate new conversations with users on WhatsApp."
          link_added="#"
        />
      </Box>
      <Card sx={{ mt: '40px' }}>
        <CardHeader title="Whatsapp Broadcast" sx={{ mb: 3 }} />
        <Divider />
        <FormProvider>
          <Form>
            
            <Box sx={{ p: 3 }}>
              <TextField
                id="select-currency-label-x"
                select
                fullWidth
                label="Select Broadcast Type"
                placeholder="Select Broadcast Type"
                value={template}
                onChange={handleChangeTemplate}
                helperText={helperTexts[template]} // Use helperTexts object
              >
                {TEMPLATES.map((option) => (
                  
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Broadcast Campaign Specific Fields */}
            {template === 'broadcastCampaign' && (
              <FormControlLabel
                  control={
                    <TextField
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Broadcast Name"
                      helperText="Enter the name of the broadcast."
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Enter the name of the broadcast."
                              arrow
                              placement="top"
                              sx={{ fontSize: '16px' }}
                            >
                              <Iconify
                                icon="material-symbols:info-outline"
                                style={{ width: 20, height: 20 }}
                              />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  }
                  sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
                />
            )}
            
            {template === 'broadcastCampaign' && (
              <Tooltip title="Click here to select contact list in broadcast" arrow placement="top">
                <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  sx={{ m: '0px 24px 24px 24px', alignSelf: 'flex-start' }}
                  onClick={handleOpenDrawer1}
                >
                  Select Contacts
                </Button>
              </Tooltip>
            )}
            
            {template === 'broadcastCampaign' && (
              <SelectContactDrawer open={openDrawer1} onClose={handleCloseDrawer1} />
            )}
            
            {template === 'broadcastCampaign' && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  width: '100%',
                  padding: '0px 24px 8px 24px',
                  mr: 0,
                  ml: 0,
                  mb: 0.5,
                }}
              >
                <Tooltip title="Included contact list in broadcast " arrow placement="left">
                  <Typography fontSize={14}>Included: </Typography>
                  <Typography color="grey" fontSize={14}>
                    {includedArray.join(', ')}
                  </Typography>
                </Tooltip>
              </Box>
            )}

            {template === 'broadcastCampaign' && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  width: '100%',
                  padding: '0px 24px 24px 24px',
                  mr: 0,
                  ml: 0,
                }}
              >
                <Tooltip title="Excluded contact list in broadcast " arrow placement="left">
                  <Typography fontSize={14}>Excluded: </Typography>
                  <Typography color="grey" fontSize={14}>
                    {excludedArray.join(', ')}
                  </Typography>
                </Tooltip>
              </Box>
            )}

            {template === 'broadcastCampaign' && (
              <Divider sx={{ borderStyle: 'dashed', margin: '0px 24px 24px 24px' }} />
            )}
            
            {template === 'broadcastCampaign' && (
              <Box
                sx={{
                  width: '100%',
                  padding: '0px 24px 24px 24px',
                  mr: 0,
                  ml: 0,
                }}
              >
                <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Select Message Type
                </Typography>
                <RadioGroup row value={messageType} onChange={handleRadioChange}>
                  <Tooltip title="Pre-approved template message" arrow placement="bottom">
                    <FormControlLabel
                      value="pre_approved_message"
                      control={<Radio size="small" />}
                      label="Pre-approved template message"
                    />
                  </Tooltip>
                  <Tooltip title="Regular message" arrow placement="right">
                    <FormControlLabel
                      value="regular_message"
                      control={<Radio size="small" />}
                      label="Regular Message"
                    />
                  </Tooltip>
                </RadioGroup>
                {messageType === 'pre_approved_message' && (
                  <form>
                    <PreApprovedMessage />
                  </form>
                )}
                {messageType === 'regular_message' && (
                  <form>
                    <RegularMessage />
                  </form>
                )}
              </Box>
            )}
            
            {template === 'broadcastCampaign' && (
              <Divider sx={{ borderStyle: 'dashed', margin: '0px 24px 24px 24px' }} />
            )}
            
            {template === 'broadcastCampaign' && (
              <FormControlLabel
                control={
                  <Box
                    width="100%"
                    sx={{ display: 'flex', flexWrap: { xs: 'wrap', lg: 'nowrap', md: 'nowrap' } }}
                    gap={2}
                  >
                    <Tooltip title="Enter Phone number here also select the country code" arrow placement="top">
                    <TextField
                      fullWidth
                      helperText="Enter the contact's mobile number."
                      placeholder="Enter mobile number"
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Select
                              value={selectedCountry.code}
                              onChange={handleCountryChange}
                              renderValue={(value) => (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginRight: 2,
                                    ml: '-14px',
                                  }}
                                >
                                  <ReactCountryFlag
                                    countryCode={value}
                                    svg
                                    style={{ marginRight: 8, width: '24px', height: '24px' }}
                                  />
                                  {updatedCountries.find((country) => country.code === value).phone}
                                </Box>
                              )}
                              sx={{
                                mr: 1,
                                minWidth: 100,
                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '& .MuiSelect-select': { paddingRight: '24px' },
                              }}
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    maxHeight: 300,
                                  },
                                },
                              }}
                            >
                              {updatedCountries.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ReactCountryFlag
                                      countryCode={country.code}
                                      svg
                                      style={{ marginRight: 8, width: '24px', height: '24px' }}
                                    />
                                    {country.label} ({country.phone})
                                  </Box>
                                </MenuItem>
                              ))}
                            </Select>
                          </InputAdornment>
                        ),
                      }}
                    />
                    </Tooltip>
                    <Tooltip title="Click here to send text message" arrow placement="top">
                    <Button
                      sx={{ height: '55px', width: { xs: '50%', md: '20%', lg: '20%' } }}
                      variant="contained"
                      color="inherit"
                    >
                      Send Test Message
                    </Button>
                    </Tooltip>
                  </Box>
                }
                sx={{ width: '100%', padding: '0px 24px 32px 24px', mr: 0, ml: 0 }}
              />
            )}
            
            {template === 'broadcastCampaign' && (
              <Box
                sx={{
                  width: '100%',
                  padding: '0px 24px 24px 24px',
                  mr: 0,
                  ml: 0,
                }}
              >
                <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Schedule Broadcast
                </Typography>
                <RadioGroup
                  sx={{ mb: '0px' }}
                  row
                  value={scheduleType}
                  onChange={handleScheduleChange}
                >
                   <Tooltip title="If you want to schedule the broadcast select this" arrow placement="bottom">
                  <FormControlLabel
                    value="yes_schedule"
                    control={<Radio size="small" />}
                    label="Yes (Schedule for Later)"
                  />
                  </Tooltip>
                  <Tooltip title="If you want to send the broadcast instantly select this" arrow placement="bottom">
                  <FormControlLabel
                    value="no_schedule"
                    control={<Radio size="small" />}
                    label="No (Send Instantly)"
                  />
                  </Tooltip>
                </RadioGroup>
                {scheduleType === 'yes_schedule' && (
                    <Tooltip title="Select Date and Time for schedulling the broadcast" arrow placement="top">
                  <Form>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    
                      <DatePicker
                        sx={{ mt: '24px' }}
                        label="Select Date and Time"
                        value={startDate}
                        minDate={dayjs('2017-01-01')}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                        }}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </LocalizationProvider>
                  </Form>
                      </Tooltip>
                )}
              </Box>
            )}
            
            {template === 'broadcastCampaign' && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  width: '100%',
                  padding: '0px 24px 24px 24px',
                  mr: 0,
                  ml: 0,
                }}
              >
                <Button variant="contained" size="large" color="inherit">
                  Add Broadcast
                </Button>
                <Button variant="outlined" size="large" color="inherit">
                  Cancel
                </Button>
              </Box>
            )}

            {/* API Campaign Specific Fields */}
            {template === 'apiCampaign' && (
              <>
                <Box sx={{ px: 3 }}>
                  <TextField
                    fullWidth
                    label=" Enter Campaign Name"
                    placeholder="Enter Campaign Name"
                    value={apiEndpoint}
                    onChange={handleApiEndpointChange}
                    helperText="Pick something that describes your audience & goals."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Pick something that describes your audience & goals."
                            arrow
                            placement="top"
                            sx={{ fontSize: '16px' }}
                          >
                            <Iconify
                              icon="material-symbols:info-outline"
                              style={{ width: 20, height: 20 }}
                            />
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box sx={{ px: 3, pt: 3 }}>
                  <TextField
                    sx={{ mb: 3 }}
                    select
                    fullWidth
                    label="Select Template here"
                    value={templateType}
                    onChange={handleChangeMessageType}
                    helperText= "Select Template here among Text, Audio, Image, Video." // Adjust helperText if needed
                  >
                    {MESSAGETYPES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ px: 3, pb: 3 }}>
                  <Tooltip title="Regular message preview" arrow placement="top">
                    <Box width={isMobile ? '100%' : '40%'} sx={{ mt: isMobile ? 3 : 0 }}>
                      <Card sx={{ border: '1px solid #919EAB33', width: '391.77px' }}>
                        <Box sx={{ p: 2, backgroundColor: '#CCF4FE', borderRadius: 1, m: 2 }}>
                          {chatBoxImage && (
                            <Box sx={{ mb: 2 }}>
                              <img
                                src={chatBoxImage}
                                alt="Chat Preview"
                                style={{ width: '100%', borderRadius: 8 }}
                              />
                            </Box>
                          )}
                          <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500 }}>
                            {`Hi {{1}}! 🎧🛒`}
                            <br />
                            <br />
                            Congratulations! 🎉 Your order for the Headway Bassheads has been
                            confirmed. 🙌
                            <br />
                            <br />
                            Order Details:
                            <br />
                            {`Product: {{2}}`}
                            <br />
                            {`Quantity: {{3}}`}
                            <br />
                            {`Order ID: {{4}}`}
                            <br />
                            {`Delivery Address: {{5}}`}
                            <br />
                            {`Estimated Delivery Date: {{6}}`}
                          </Typography>
                        </Box>
                      </Card>
                    </Box>
                  </Tooltip>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    width: '100%',
                    padding: '0px 24px 24px 24px',
                    mr: 0,
                    ml: 0,
                  }}
                >
                  <Button variant="contained" size="large" color="inherit">
                    Add Broadcast
                  </Button>
                  <Button variant="outlined" size="large" color="inherit">
                    Cancel
                  </Button>
                </Box>
              </>
            )}
          </Form>
        </FormProvider>
      </Card>
    </DashboardContent>
  );
}
