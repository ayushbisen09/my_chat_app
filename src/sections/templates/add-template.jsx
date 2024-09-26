import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';

import {
  Box,
  Card,
  Radio,
  Stack,
  Button,
  Select,
  Switch,
  Divider,
  Tooltip,
  MenuItem,
  TextField,
  CardHeader,
  RadioGroup,
  Typography,
  InputLabel,
  IconButton,
  FormControl,
  useMediaQuery,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import FileUpload from 'src/components/upload/upload';
import ChatBox from 'src/components/chat-box/chat-box';
import PageHeader from 'src/components/page-header/page-header';

import { CarouselAlign } from './hook/carousel-align';
import Image1 from '../../assets/images/chatImage/imagechat.png';
import { TEMPLATE_LANGUAGES } from '../../assets/data/template-languages';

export default function AddTemplate() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [carouselMediaType, setCarouselMediaType] = useState('');
  const [headerType, setHeaderType] = useState('');
  const [categorylist, setCategorytList] = useState('Marketing');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [anchorEl, setAnchorEl] = useState(null);
  const [templateType, setTemplateType] = useState('text');
  const [actionType, setaActionType] = useState('none');
  const [chatBoxImage, setChatBoxImage] = useState(Image1); // Initial image
  const [chatBoxes, setChatBoxes] = useState([
    {
      id: 1,
      text: (
        <>
          <span style={{ fontWeight: '600' }}>{`Hi {{1}}! 🎧🛒`}</span> <br /> <br />
          `Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`
          <br /> <br />
          `Order Details:`
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
        </>
      ),
      image: '/path/to/image.png',
    },
  ]);
  useEffect(() => {
    setInputText(''); // Reset the input text
    setFields([]); // Clear the dynamically rendered fields
  }, [templateType]);

  const [inputText, setInputText] = useState('');
  const [fields, setFields] = useState([]);
  const [sampleValues, setSampleValues] = useState({});

  const replacePlaceholders = (text, values) =>
    text.replace(/\{\{(\d+)\}\}/g, (match, number) => values[`{{${number}}}`] || match);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputText(value);

    // Regex to match {{Any text}} but only add new fields if not already present
    const regex = /\{\{.*?\}\}/g;
    const matchedFields = value.match(regex);

    if (matchedFields) {
      const newFields = matchedFields.filter(
        (match) => !fields.includes(match) // Only add fields that don't already exist
      );
      if (newFields.length > 0) {
        setFields([...fields, ...newFields]);

        // Set corresponding sample values, initially empty
        const newSampleValues = newFields.reduce((acc, field, index) => {
          acc[field] = ''; // Empty value for sample fields
          return acc;
        }, {});
        setSampleValues({ ...sampleValues, ...newSampleValues });
      }
    }
  };

  const handleSampleValueChange = (e, field) => {
    const updatedValues = {
      ...sampleValues,
      [field]: e.target.value,
    };
    setSampleValues(updatedValues);

    // Update chatBox content with replaced values
    setChatBoxes((prevChatBoxes) =>
      prevChatBoxes.map((box) => ({
        ...box,
        text: replacePlaceholders(
          `Hi {{1}}! 🎧🛒\n\nCongratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌\n\nOrder Details:\nProduct: {{2}}\nQuantity: {{3}}\nOrder ID: {{4}}\nDelivery Address: {{5}}\nEstimated Delivery Date: {{6}}`,
          updatedValues
        ),
      }))
    );
  };

  // Removed key handling for Enter and ',' as per the request
  const handleKeyPress = (e) => {
    // Optional: you can handle some other key-specific behavior if required
  };

  const handleChangeCategoryList = useCallback((event) => {
    setCategorytList(event.target.value);
  }, []);

  const CATEGORYLISTS = [
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Utility', label: 'Utility' },
    { value: 'Authentication', label: 'Authentication' },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = useCallback((event) => {
    setSelectedLanguage(event.target.value);
  }, []);

  const handleTemplateTypeChange = (event) => {
    const selectedType = event.target.value;
    setTemplateType(selectedType);

    // Change ChatBox image based on selected template type
    switch (selectedType) {
      case 'video':
        setChatBoxImage('../../assets/images/chatImage/video.png');
        break;
      case 'document':
        setChatBoxImage('../../assets/images/chatImage/document.png');
        break;
      case 'location':
        setChatBoxImage('../../assets/images/chatImage/location.png');
        break;
      case 'limited_time_offer':
        setChatBoxImage('../../assets/images/chatImage/limitedtimeoffer.png');
        break;
      case 'text':
        setChatBoxImage('');
        break;
      default:
        setChatBoxImage(Image1);
    }
  };

  const handleActionTypeChange = (event) => {
    setaActionType(event.target.value);
  };

  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
      callToAction1Urls: [{ label: '', url: '' }],
      callToAction2PhoneNumbers: [{ label: '', phoneNumber: '' }],
      couponCodes: [{ code: '', description: '' }],
    },
  });

  const { control } = methods;

  const {
    fields: formFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({
      title: '',
      description: '',
    });
  };

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const {
    fields: callToAction1Fields,
    append: appendCallToAction1,
    remove: removeCallToAction1,
  } = useFieldArray({
    control,
    name: 'callToAction1Urls',
  });

  const handleAddCallToAction1 = () => {
    appendCallToAction1({
      label: '',
      url: '',
    });
  };

  const handleRemoveCallToAction1 = (index) => {
    if (callToAction1Fields.length > 1) {
      removeCallToAction1(index);
    }
  };

  const {
    fields: callToAction2Fields,
    append: appendCallToAction2,
    remove: removeCallToAction2,
  } = useFieldArray({
    control,
    name: 'callToAction2PhoneNumbers',
  });

  const handleAddCallToAction2 = () => {
    appendCallToAction2({
      label: '',
      phoneNumber: '',
    });
  };

  const handleRemoveCallToAction2 = (index) => {
    if (callToAction2Fields.length > 1) {
      removeCallToAction2(index);
    }
  };

  const {
    fields: couponCodeFields,
    append: appendCouponCode,
    remove: removeCouponCode,
  } = useFieldArray({
    control,
    name: 'couponCodes',
  });

  const handleAddCouponCode = () => {
    appendCouponCode({
      code: '',
      description: '',
    });
  };

  const handleRemoveCouponCode = (index) => {
    if (couponCodeFields.length > 1) {
      removeCouponCode(index);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/app/template');
  };

  const showToast = () => {
    toast.success('Template Submitted Successfully!');
  };

  const addTemplate = () => {
    showToast();
    navigate('/app/template');
  };

  const handleCarouselMediaTypeChange = (event) => {
    setCarouselMediaType(event.target.value);
  };

  const handleHeaderTypeChange = (event) => {
    setHeaderType(event.target.value);
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
          title="New Template"
          Subheading="Create new template as per your needs."
          link_added="#"
        />
      </Box>
      <Box
        sx={{ mt: '24px', flexWrap: { xs: 'wrap', sm: 'nowrap', md: 'nowrap' } }}
        gap={3}
        display="flex"
      >
        <Card sx={{ width: { md: '90%', xs: '100%', sm: '90%' } }}>
          <CardHeader title="Add New Template" sx={{ mb: 3 }} />
          <Divider />
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit}>
              <FormControlLabel
                control={
                  <TextField
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="Template Name"
                    helperText="Enter the name of the template."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Enter the name of the template."
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px',
                            }}
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
                sx={{ width: '100%', padding: '24px 24px 24px 24px', mr: 0, ml: 0 }}
              />
              <FormControlLabel
                control={
                  <TextField
                    sx={{ width: '100%' }}
                    id="select-currency-label-x"
                    variant="outlined"
                    select
                    fullWidth
                    label="Select Template Category"
                    value={categorylist}
                    onChange={handleChangeCategoryList}
                    helperText="Select template category."
                    InputLabelProps={{ htmlFor: 'outlined-select-currency-label' }}
                    inputProps={{ id: 'outlined-select-currency-label' }}
                  >
                    {CATEGORYLISTS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                }
                sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
              />
              <FormControlLabel
                control={
                  <TextField
                    sx={{ width: '100%' }}
                    id="select-language-label"
                    variant="outlined"
                    select
                    fullWidth
                    label="Select Language (Required)"
                    value={selectedLanguage}
                    onChange={handleChangeLanguage}
                    onClick={handleClick}
                    helperText="Select the language for the template."
                    InputLabelProps={{ htmlFor: 'outlined-select-language-label' }}
                    inputProps={{ id: 'outlined-select-language-label' }}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 400,
                            width: '20ch',
                          },
                        },
                      },
                    }}
                  >
                    {TEMPLATE_LANGUAGES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                }
                sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}
              />
              <Box sx={{ width: '100%', padding: '0px 24px 24px 24px', mr: 0, ml: 0 }}>
                <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Template Type
                </Typography>
                <RadioGroup
                  sx={{ mt: '24px' }}
                  row
                  value={templateType}
                  onChange={handleTemplateTypeChange}
                >
                  <FormControlLabel value="text" control={<Radio size="small" />} label="Text" />
                  <FormControlLabel value="image" control={<Radio size="small" />} label="Image" />
                  <FormControlLabel value="video" control={<Radio size="small" />} label="Video" />
                  <FormControlLabel
                    value="document"
                    control={<Radio size="small" />}
                    label="Document"
                  />
                  <FormControlLabel
                    value="location"
                    control={<Radio size="small" />}
                    label="Location"
                  />
                  <FormControlLabel
                    value="carousel"
                    control={<Radio size="small" />}
                    label="Carousel"
                  />
                  <FormControlLabel
                    value="limited_time_offer"
                    control={<Radio size="small" />}
                    label="Limited Time Offer"
                  />
                </RadioGroup>
                {/* Template-specific fields */}
                {templateType === 'text' && (
                  <FormControlLabel
                    control={
                      <TextField
                        fullWidth
                        type="text"
                        margin="dense"
                        variant="outlined"
                        label="Template Header (optional)"
                        helperText="You're allowed a maximum of 60 characters."
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="You're allowed a maximum of 60 characters."
                                arrow
                                placement="top"
                                sx={{
                                  fontSize: '16px',
                                }}
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
                    sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                  />
                )}
                {templateType === 'image' && (
                  <>
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                    <TextField
                      sx={{ mt: '24px' }}
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Template Header File URL"
                      helperText="Size < 5MB, Accepted formats : .png or .jpeg"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Enter header URL"
                              arrow
                              placement="top"
                              sx={{
                                fontSize: '16px',
                              }}
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
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        width: '100%',
                        padding: '24px 0px 24px 0px',
                        mr: 0,
                        ml: 0,
                      }}
                    >
                      OR
                    </Typography>
                    <FileUpload />
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                  </>
                )}
                {templateType === 'video' && (
                  <>
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                    <TextField
                      sx={{ mt: '24px' }}
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Template Header File URL"
                      helperText="Size < 5MB, Accepted formats : .mp4 or .mkv"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Enter header URL"
                              arrow
                              placement="top"
                              sx={{
                                fontSize: '16px',
                              }}
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
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        width: '100%',
                        padding: '24px 0px 24px 0px',
                        mr: 0,
                        ml: 0,
                      }}
                    >
                      OR
                    </Typography>
                    <FileUpload />
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                  </>
                )}
                {templateType === 'document' && (
                  <>
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                    <TextField
                      sx={{ mt: '24px' }}
                      fullWidth
                      type="text"
                      margin="dense"
                      variant="outlined"
                      label="Template Header File URL"
                      helperText="Size < 5MB"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Enter header URL"
                              arrow
                              placement="top"
                              sx={{
                                fontSize: '16px',
                              }}
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
                    <Typography
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        width: '100%',
                        padding: '24px 0px 24px 0px',
                        mr: 0,
                        ml: 0,
                      }}
                    >
                      OR
                    </Typography>
                    <FileUpload />
                    <Divider sx={{ borderStyle: 'dashed', mt: '24px' }} />
                  </>
                )}
                {templateType === 'location' && (
                  <FormControlLabel
                    control={
                      <TextField
                        fullWidth
                        type="text"
                        margin="dense"
                        variant="outlined"
                        label="Location URL"
                        helperText="You're allowed a maximum of 60 characters."
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="You're allowed a maximum of 60 characters."
                                arrow
                                placement="top"
                                sx={{
                                  fontSize: '16px',
                                }}
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
                    sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                  />
                )}
                {templateType === 'carousel' && (
                  <>
                    <FormControlLabel
                      control={
                        <TextField
                          fullWidth
                          type="text"
                          margin="dense"
                          variant="outlined"
                          label="Card 1 Body"
                          helperText="You're allowed a maximum of 160 characters."
                        />
                      }
                      sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel id="carousel-select-label">Carousel Media Type</InputLabel>
                      <Select
                        labelId="carousel-select-label"
                        id="carousel-select"
                        value={carouselMediaType}
                        label="Carousel Media Type"
                        onChange={handleCarouselMediaTypeChange}
                      >
                        <MenuItem value="type1">Image</MenuItem>
                        <MenuItem value="type2">Video</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}
                {templateType === 'limited_time_offer' && (
                  <>
                    <FormControlLabel
                      control={
                        <TextField
                          fullWidth
                          type="text"
                          margin="dense"
                          variant="outlined"
                          label="Limited Time Offer Text"
                          helperText="You're allowed a maximum of 16 characters."
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip
                                  title="You're allowed a maximum of 16 characters."
                                  arrow
                                  placement="top"
                                  sx={{
                                    fontSize: '16px',
                                  }}
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
                      sx={{ width: '100%', padding: '24px 0px 0px 0px', mr: 0, ml: 0 }}
                    />

                    <Box display="flex" alignItems="center" sx={{ padding: '16px 0px 0px 0px' }}>
                      <FormControlLabel
                        control={<Switch />}
                        label="Offer Expires"
                        sx={{ marginRight: '0px' }}
                      />
                      <Tooltip
                        title="Turn on the toggle to make this an expiring offer. You can choose the expiration date when sending it to the user."
                        arrow
                        placement="top"
                        sx={{
                          fontSize: '16px',
                        }}
                      >
                        <IconButton>
                          <Iconify
                            icon="material-symbols:info-outline"
                            style={{ width: 20, height: 20 }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel id="carousel-select-label">Header Type</InputLabel>
                      <Select
                        labelId="header-select-label"
                        id="header-select"
                        value={headerType}
                        label="Header Type"
                        onChange={handleHeaderTypeChange}
                      >
                        <MenuItem value="type1">Image</MenuItem>
                        <MenuItem value="type2">Video</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}
              </Box>
              <FormControlLabel
                control={
                  <TextField
                    fullWidth
                    type="text"
                    margin="dense"
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Template Format"
                    helperText="Use text formatting - *bold*, _italic_, ~strikethrough~. For example - Hello {{1}}, your code will expire in {{2}} mins. You're allowed a maximum of 1024 characters."
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="Use text formatting - *bold* , _italic_ & ~strikethrough~. For example -  Hello {{1}}, your code will expire in {{2}} mins.. You're allowed a maximum of 1024 characters."
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px',
                            }}
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
              {/* Display dynamically added fields */}
              <Box sx={{ width: '100%', px: 3, mr: 0, ml: 0 }}>
                {fields.map((field, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      label={`Field ${index + 1}`}
                      helperText="Specify the parameter to be replaced. These values can be changed at the time of sending"
                      value={field}
                      InputProps={{
                        readOnly: true, // Make the field read-only
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Specify the parameter to be replaced. These values can be changed at the time of sending "
                              arrow
                              placement="top"
                              sx={{
                                fontSize: '16px',
                              }}
                            >
                              <Iconify
                                icon="material-symbols:info-outline"
                                style={{ width: 20, height: 20 }}
                              />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        marginBottom: '8px',
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      label={`Sample Value ${index + 1}`}
                      helperText="Enter a sample value for this parameter."
                      value={sampleValues[field] || ''}
                      onChange={(e) => handleSampleValueChange(e, field)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Enter sample value for this field paramerter."
                              arrow
                              placement="top"
                              sx={{
                                fontSize: '16px',
                              }}
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
                ))}
              </Box>

              <FormControlLabel
                control={
                  <TextField
                    fullWidth
                    type="text"
                    margin="dense"
                    variant="outlined"
                    label="Template Footer"
                    helperText="You're allowed a maximum of 60 characters."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title="You're allowed a maximum of 60 characters."
                            arrow
                            placement="top"
                            sx={{
                              fontSize: '16px',
                            }}
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
              <Box sx={{ width: '100%', padding: '0px 24px 24px 24px' }}>
                <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
                  Interactive Actions
                </Typography>
                <RadioGroup
                  sx={{ mt: '24px', ml: '-10px' }}
                  row
                  value={actionType}
                  onChange={handleActionTypeChange}
                >
                  {[
                    { value: 'none', label: 'None' },
                    { value: 'call_to_actions', label: 'Call To Actions' },
                    { value: 'quick_replies', label: 'Quick Replies' },
                    { value: 'all', label: 'All' },
                  ].map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio size="small" />}
                      label={option.label}
                      sx={{
                        m: 0,
                        '& .MuiFormControlLabel-label': {
                          fontSize: '14px',
                        },
                      }}
                    />
                  ))}
                </RadioGroup>

                {actionType === 'none' && <Box mt={2}>No Action</Box>}
                {actionType === 'call_to_actions' && (
                  <Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Call To Action 1 (URL)
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {callToAction1Fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter URL"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Title"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction1(index)}
                                  disabled={callToAction1Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction1(index)}
                                  disabled={callToAction1Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCallToAction1}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        URL
                      </Button>
                    </Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Call To Action 2 (Phone Number)
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {callToAction2Fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Phone Number"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Code"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction2(index)}
                                  disabled={callToAction2Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction2(index)}
                                  disabled={callToAction2Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCallToAction2}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        Phone Number
                      </Button>
                    </Box>
                  </Box>
                )}
                {actionType === 'quick_replies' && (
                  <Box mt={3}>
                    <Box sx={{ mr: 0 }}>
                      <Box sx={{ display: 'flex', mb: 3 }}>
                        <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                          Quick Replies
                        </Typography>
                      </Box>
                    </Box>
                    <Stack spacing={3}>
                      {fields.map((item, index) => (
                        <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                          <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={2}
                            sx={{ width: 1 }}
                            alignItems="center"
                          >
                            <TextField
                              variant="outlined"
                              fullWidth
                              label="Enter Quick Reply"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Tooltip
                                      title="You're allowed a maximum of 60 characters."
                                      arrow
                                      placement="top"
                                      sx={{
                                        fontSize: '16px',
                                      }}
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

                            {!isTabletOrMobile && (
                              <Button
                                size="small"
                                sx={{ color: 'grey.600', minWidth: 'auto' }}
                                onClick={() => handleRemove(index)}
                                disabled={fields.length === 1}
                              >
                                <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                              </Button>
                            )}
                          </Stack>
                          {isTabletOrMobile && (
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                width: '100%',
                              }}
                            >
                              <Button
                                size="small"
                                sx={{ color: 'grey.600', minWidth: 'auto' }}
                                onClick={() => handleRemove(index)}
                                disabled={fields.length === 1}
                              >
                                <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                              </Button>
                            </Box>
                          )}
                        </Stack>
                      ))}
                    </Stack>

                    <Button
                      size="medium"
                      variant="outlined"
                      color="primary"
                      startIcon={<Iconify icon="mingcute:add-line" />}
                      onClick={handleAdd}
                      sx={{ mt: 3, alignSelf: 'flex-start' }}
                    >
                      Add Quick Replies
                    </Button>
                  </Box>
                )}
                {actionType === 'all' && (
                  <Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Quick Replies
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField variant="outlined" fullWidth label="Enter Quick Reply" />

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemove(index)}
                                  disabled={fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemove(index)}
                                  disabled={fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>

                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAdd}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        Add Quick Replies
                      </Button>
                    </Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Call To Action 1 (URL)
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {callToAction1Fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter URL"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Title"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction1Urls.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction1(index)}
                                  disabled={callToAction1Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction1(index)}
                                  disabled={callToAction1Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCallToAction1}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        URL
                      </Button>
                    </Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Call To Action 2 (Phone Number)
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {callToAction2Fields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Phone Number"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Code"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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
                              <TextField
                                {...methods.register(`callToAction2PhoneNumbers.${index}.label`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Button Value"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction2(index)}
                                  disabled={callToAction2Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCallToAction2(index)}
                                  disabled={callToAction2Fields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCallToAction2}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        Phone Number
                      </Button>
                    </Box>
                    <Box mt={3}>
                      <Box sx={{ mr: 0 }}>
                        <Box sx={{ display: 'flex', mb: 3 }}>
                          <Typography sx={{ mb: 0, fontWeight: 600, fontSize: '14px' }}>
                            Coupon Code
                          </Typography>
                        </Box>
                      </Box>
                      <Stack spacing={3}>
                        {couponCodeFields.map((item, index) => (
                          <Stack key={item.id} spacing={isTabletOrMobile ? 1 : 0}>
                            <Stack
                              direction={{ xs: 'column', md: 'row' }}
                              spacing={2}
                              sx={{ width: 1 }}
                              alignItems="center"
                            >
                              <TextField
                                {...methods.register(`couponCodes.${index}.code`)}
                                variant="outlined"
                                fullWidth
                                label="Enter Coupon Code"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Tooltip
                                        title="You're allowed a maximum of 60 characters."
                                        arrow
                                        placement="top"
                                        sx={{
                                          fontSize: '16px',
                                        }}
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

                              {!isTabletOrMobile && (
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCouponCode(index)}
                                  disabled={couponCodeFields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              )}
                            </Stack>
                            {isTabletOrMobile && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                  width: '100%',
                                }}
                              >
                                <Button
                                  size="small"
                                  sx={{ color: 'grey.600', minWidth: 'auto' }}
                                  onClick={() => handleRemoveCouponCode(index)}
                                  disabled={couponCodeFields.length === 1}
                                >
                                  <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                                </Button>
                              </Box>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        size="medium"
                        variant="outlined"
                        color="primary"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleAddCouponCode}
                        sx={{ mt: 3, alignSelf: 'flex-start' }}
                      >
                        Add Coupon Code
                      </Button>
                    </Box>
                  </Box>
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
                <Button onClick={addTemplate} variant="contained" size="large" color="inherit">
                  Submit
                </Button>
                <Button onClick={handleCancel} variant="outlined" size="large" color="inherit">
                  Cancel
                </Button>
              </Box>
            </Form>
          </FormProvider>
        </Card>
        {/* Conditionally render ChatBox or CarouselAlign based on templateType */}
        {templateType === 'carousel' ? (
          <Box>
            <CarouselAlign />
          </Box>
        ) : (
          <Box>
            <ChatBox
              coverSrc={templateType !== 'text' ? chatBoxImage : undefined}
              showImage={templateType !== 'text'}
              text={
                <>
                  <span style={{ fontWeight: '600' }}>
                    {replacePlaceholders(`Hi {{1}}! 🎧🛒`, sampleValues)}
                  </span>
                  <br /> <br />
                  {replacePlaceholders(
                    `Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`,
                    sampleValues
                  )}
                  <br /> <br />
                  {replacePlaceholders(`Order Details:`, sampleValues)} <br />
                  {replacePlaceholders(`Product: {{2}}`, sampleValues)} <br />
                  {replacePlaceholders(`Quantity: {{3}}`, sampleValues)} <br />
                  {replacePlaceholders(`Order ID: {{4}}`, sampleValues)} <br />
                  {replacePlaceholders(`Delivery Address: {{5}}`, sampleValues)} <br />
                  {replacePlaceholders(`Estimated Delivery Date: {{6}}`, sampleValues)}
                </>
              }
              showLinks
              showVisit
            />
          </Box>
        )}
      </Box>
    </DashboardContent>
  );
}
