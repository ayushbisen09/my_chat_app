import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { FormProvider } from 'react-hook-form';
import ReactCountryFlag from 'react-country-flag';

import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  Radio,
  Button,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  RadioGroup,
  Typography,
  useMediaQuery,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { countries } from 'src/assets/data';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { ChooseTemplate } from 'src/components/flow-nodes/message-type-nodes/hooks/dailogs/flow-start-node-choose-templates-dailog';

import ChatBox from '../chat-box/chat-box';
import RegularMessage from '../../regular-message';
import { SelectContactDrawer } from '../../hook/drawer';
import TemplateImage from '../../../../../public/assets/images/chatImage/limitedtimeoffer.png'

export default function BroadcastCampaign() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer1, setOpenDrawer1] = useState(false);

  const { includedArray, excludedArray } = useSelector((state) => state.includedArray);

  const [messageType, setMessageType] = useState('pre_approved_message');
  const [scheduleType, setScheduleType] = useState('yes_schedule');

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState(dayjs(new Date()));

  const handleOpenDrawer1 = () => setOpenDrawer1(true);
  const handleCloseDrawer1 = () => setOpenDrawer1(false);

  const handleRadioChange = (event) => setMessageType(event.target.value);
  const handleScheduleChange = (event) => setScheduleType(event.target.value);

  const handleCountryChange = (event) =>
    setSelectedCountry(countries.find((country) => country.code === event.target.value));

  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);

  const updatedCountries = countries.map((country) => ({
    ...country,
    phone: `+${country.phone}`,
  }));

  const openTemplateDialog = () => setIsTemplateDialogOpen(true);
  const closeTemplateDialog = () => setIsTemplateDialogOpen(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false); // Moved inside the component
  const text = 'Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌';
  const showImage = true; 
  const showLinks = true; 
  const showCall = true;
  const showCoupon = true; 
  const showVisit = true; 

  return (
    <FormProvider>
      <Form>
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

        <SelectContactDrawer open={openDrawer1} onClose={handleCloseDrawer1} />

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

        <Divider sx={{ borderStyle: 'dashed', margin: '0px 24px 24px 24px' }} />

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
            
              
                  <Button
                    variant="outlined"
                    color="primary"
                    size="Medium"
                    onClick={openTemplateDialog}
                    sx={{ width: '230px', mt: 2,mb:3 }}
                  >
                    Select WhatsApp Template
                  </Button>
                
                <Box width="380px">
                  <ChatBox
                    text={text}
                    coverSrc={TemplateImage}
                    showImage={showImage}
                    showLinks={showLinks}
                    showCall={showCall}
                    showCoupon={showCoupon}
                    showVisit={showVisit}
                  />
                </Box>
              
            </form>
          )}
          {messageType === 'regular_message' && (
            <form>
              <RegularMessage />
            </form>
          )}
        </Box>

        <ChooseTemplate open={isTemplateDialogOpen} onClose={closeTemplateDialog} />

        <Divider sx={{ borderStyle: 'dashed', margin: '0px 24px 24px 24px' }} />

        <FormControlLabel
          control={
            <Box
              width="100%"
              sx={{ display: 'flex', flexWrap: { xs: 'wrap', lg: 'nowrap', md: 'nowrap' } }}
              gap={2}
            >
              <Tooltip
                title="Enter Phone number here also select the country code"
                arrow
                placement="top"
              >
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
          <RadioGroup sx={{ mb: '0px' }} row value={scheduleType} onChange={handleScheduleChange}>
            <Tooltip
              title="If you want to schedule the broadcast select this"
              arrow
              placement="bottom"
            >
              <FormControlLabel
                value="yes_schedule"
                control={<Radio size="small" />}
                label="Yes (Schedule for Later)"
              />
            </Tooltip>
            <Tooltip
              title="If you want to send the broadcast instantly select this"
              arrow
              placement="bottom"
            >
              <FormControlLabel
                value="no_schedule"
                control={<Radio size="small" />}
                label="No (Send Instantly)"
              />
            </Tooltip>
          </RadioGroup>
          {scheduleType === 'yes_schedule' && (
            <Tooltip
              title="Select Date and Time for schedulling the broadcast"
              arrow
              placement="top"
            >
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
      </Form>
    </FormProvider>
  );
}
