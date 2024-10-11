import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import {
  Box,
  Card,
  Chip,
  Stack,
  Alert,
  Drawer,
  Select,
  Button,
  Divider,
  Tooltip,
  MenuItem,
  Snackbar,
  TextField,
  CardHeader,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  Autocomplete,
  useMediaQuery,
  InputAdornment,
  Backdrop as MuiBackdrop,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

// Custom backdrop component
const CustomBackdrop = (props) => (
  <MuiBackdrop
    {...props}
    sx={{ backgroundColor: 'transparent' }} // Make the backdrop transparent
  />
);

const AddContactsListDrawer = ({ open, onClose }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleAddClick = () => {
    // Perform the Add action logic here

    // Show the Snackbar
    setOpenSnackbar(true);
    onClose();
  };

  const handleCancelClick = () => {
    // Perform the Add action logic here

    // Show the Snackbar
    
    onClose();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleBackdropClick = (event) => {
    // Prevent clicks inside the drawer from closing it
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');
  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleOptStatusChange = (event) => {
    setOptStatus(event.target.value);
  };

  const handleIncomingStatusChange = (event) => {
    setIncomingStatus(event.target.value);
  };

  const [optstatus, setOptStatus] = useState('Opt In'); // Default to "Opt Out"
  const [incomingStatus, setIncomingStatus] = useState('Allowed'); // Default to "Blocked"

  const [attributes, setAttributes] = useState(['']);
  const [attributeConditions, setAttributeConditions] = useState(['']);
  const [attributeValues, setAttributeValues] = useState(['']);

  const ATTRIBUTES = [
    { value: 'name', label: 'Name' },
    { value: 'mobile_number', label: 'Mobile Number' },
    { value: 'text', label: 'Tags' },
    { value: 'source', label: 'Source' },
    { value: 'first_message', label: 'First Message' },
    { value: 'campaign', label: 'Campaign' },
    { value: 'closed', label: 'Closed' },
    { value: 'requested', label: 'Requested' },
    { value: 'email', label: 'Email' },
  ];

  const ATTRIBUTESCONDITIONS = [
    { value: 'is', label: 'Is' },
    { value: 'is_not', label: 'Is Not' },
    { value: 'contains', label: 'Not_Contains' },
    { value: 'has', label: 'Has' },
    { value: 'has_not', label: 'Has Not' },
  ];
  const getFilteredConditions = (attribute) => {
    switch (attribute) {
      case 'name':
      case 'mobile_number':
      case 'source':
      case 'first_message':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value !== 'has' && condition.value !== 'has_not'
        );
      case 'text':
      case 'campaign':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value === 'has' || condition.value === 'has_not'
        );
      case 'closed':
      case 'requested':
        return ATTRIBUTESCONDITIONS.filter((condition) => condition.value === 'is');
      default:
        return ATTRIBUTESCONDITIONS;
    }
  };

  const shouldEnableSelectForAttributeValue = (attribute) => {
    const selectableAttributes = ['text', 'first_message', 'campaign', 'closed', 'requested'];
    return selectableAttributes.includes(attribute);
  };

  const getAttributeValueOptions = (attribute) => {
    switch (attribute) {
      case 'text':
        return ['Vip', 'Stream', 'Random Values'];
      case 'first_message':
        return ['Set', 'Not Set', 'Something'];
      case 'campaign':
        return [
          'Boost Your Brand 2024',
          'Summer Sales Surge',
          'Holiday Cheer Deals',
          'New Year, New Deals',
          'Spring Refresh Campaign',
          'Back-to-School Bonanza',
        ];
      case 'closed':
      case 'requested':
        return ['Yes', 'No'];
      default:
        return [];
    }
  };
  const handleAttributeChange = (index, event) => {
    const newAttributes = [...attributes];
    newAttributes[index] = event.target.value;
    setAttributes(newAttributes);
    const newAttributeConditions = [...attributeConditions];
    const newAttributeValues = [...attributeValues];
    newAttributeConditions[index] = '';
    newAttributeValues[index] = '';
    setAttributeConditions(newAttributeConditions);
    setAttributeValues(newAttributeValues);
  };

  const handleAttributeConditionChange = (index, event) => {
    const newAttributeConditions = [...attributeConditions];
    newAttributeConditions[index] = event.target.value;
    setAttributeConditions(newAttributeConditions);
  };

  const handleAttributeValueChange = (index, event) => {
    const newAttributeValues = [...attributeValues];
    newAttributeValues[index] = event.target.value;
    setAttributeValues(newAttributeValues);
  };

  const handleAddAttribute = () => {
    setAttributes([...attributes, '']);
    setAttributeConditions([...attributeConditions, '']);
    setAttributeValues([...attributeValues, '']);
  };

  const handleRemoveAttribute = (index) => {
    if (attributes.length > 1) {
      const newAttributes = [...attributes];
      newAttributes.splice(index, 1);
      setAttributes(newAttributes);

      const newAttributeConditions = [...attributeConditions];
      newAttributeConditions.splice(index, 1);
      setAttributeConditions(newAttributeConditions);

      const newAttributeValues = [...attributeValues];
      newAttributeValues.splice(index, 1);
      setAttributeValues(newAttributeValues);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: {
              xs: '100%',
              md: 'auto',
              lg: '1110px',
            }, // Adjust width as needed
          },
        }}
        ModalProps={{
          BackdropComponent: CustomBackdrop, // Use the custom backdrop
        }}
      >
        <Box
          onClick={handleBackdropClick} // Handle clicks outside the drawer
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h6">Add Contact List</Typography>
          <IconButton onClick={onClose} sx={{ top: 12, left: 12, zIndex: 9, position: 'unset' }}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardHeader
              subheader="Enter a descriptive name for your contact list. This will help you quickly identify and manage different lists"
              title="Add Contact List"
              sx={{ mb: 3 }}
            />

            <Divider />
            <Box sx={{ p: 3 }}>
              <TextField
                autoFocus
                fullWidth
                type="text"
                margin="dense"
                variant="outlined"
                label="Contact List Name"
                helperText={
                  <span>
                    Enter your contact list name.{' '}
                    <Link href="#" style={{ color: '#078DEE' }} underline="always">
                      Learn more
                    </Link>
                  </span>
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip
                        title="Enter contact list name here."
                        arrow
                        placement="top"
                        sx={{
                          fontSize: '16px', // Adjust the font size as needed
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
                sx={{ mb: 3 }}
              />

              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={tags}
                onChange={(event, newValue) => setTags(newValue)}
                inputValue={tagInput}
                onInputChange={(event, newInputValue) => setTagInput(newInputValue)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && tagInput.trim()) {
                    handleAddTag();
                    event.preventDefault();
                  }
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={index}
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
                    {...params}
                    variant="outlined"
                    size="large"
                    helperText="Enter opt-in keywords"
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
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth size="medium" sx={{ mb: 3 }}>
                <InputLabel id="chat-owner-select-label">Opted Status</InputLabel>
                <Select
                  labelId="Opt-status-select-label"
                  id="Opt-status-select"
                  value={optstatus}
                  label="Opt Status"
                  onChange={handleOptStatusChange}
                >
                  <MenuItem value="Opt In">Opt In</MenuItem>
                  <MenuItem value="Opt Out">Opt Out</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="medium">
                <InputLabel id="status-select-label">Incoming Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={incomingStatus}
                  label="Incoming Status"
                  onChange={handleIncomingStatusChange}
                >
                  <MenuItem value="Allowed">Allowed</MenuItem>
                  <MenuItem value="Bloked">Blocked</MenuItem>
                  <MenuItem value="Both">Both</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mt: 4 }}>
                <Typography fontSize="14px" sx={{ fontWeight: 700, mb: 2 }}>
                  Attributes
                </Typography>
                <Stack spacing={3}>
                  {attributes.map((attribute, index) => (
                    <Stack key={index} spacing={isTabletOrMobile ? 1 : 0}>
                      <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={2}
                        sx={{ width: 1 }}
                        alignItems="center"
                      >
                        <TextField
                          variant="outlined"
                          select
                          fullWidth
                          label="Attributes"
                          value={attributes[index] || ''}
                          onChange={(event) => handleAttributeChange(index, event)}
                          helperText="Click here to select Attributes"
                        >
                          {ATTRIBUTES.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          variant="outlined"
                          select
                          fullWidth
                          label="Attributes Condition"
                          value={attributeConditions[index] || ''}
                          onChange={(event) => handleAttributeConditionChange(index, event)}
                          helperText="Click here to select condition"
                        >
                          {getFilteredConditions(attributes[index]).map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        {shouldEnableSelectForAttributeValue(attributes[index]) ? (
                          <TextField
                            variant="outlined"
                            select
                            fullWidth
                            label="Attributes Value"
                            value={attributeValues[index] || ''}
                            onChange={(event) => handleAttributeValueChange(index, event)}
                            helperText="Select Attribute value"
                          >
                            {getAttributeValueOptions(attributes[index]).map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : (
                          <TextField
                            variant="outlined"
                            fullWidth
                            label="Attributes Value"
                            value={attributeValues[index] || ''}
                            onChange={(event) => handleAttributeValueChange(index, event)}
                            helperText="Enter Attribute value here"
                          />
                        )}

                        {!isTabletOrMobile && (
                          <Tooltip title="Click here to delete attribute" arrow placement="top">
                            <Button
                              size="small"
                              sx={{ color: 'grey.600', minWidth: 'auto' }}
                              onClick={() => handleRemoveAttribute(index)}
                              disabled={attributes.length === 1}
                            >
                              <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                            </Button>
                          </Tooltip>
                        )}
                      </Stack>
                      {isTabletOrMobile && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                          <Button
                            size="small"
                            sx={{ color: 'grey.600', minWidth: 'auto' }}
                            onClick={() => handleRemoveAttribute(index)}
                            disabled={attributes.length === 1}
                          >
                            <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                          </Button>
                        </Box>
                      )}
                    </Stack>
                  ))}
                </Stack>
                <Tooltip title="click here to add more attribute" arrow placement="top">
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={handleAddAttribute}
                    sx={{ mt: 3, alignSelf: 'flex-start' }}
                  >
                    Add More Attribute
                  </Button>
                </Tooltip>
              </Box>
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box sx={{ p: 3 }}>
              <Button variant="contained" size="medium" sx={{ mr: 1.5 }} onClick={handleAddClick}>
                Add
              </Button>
              <Button variant="outlined" size="medium" onClick={handleCancelClick}>
                Cancel
              </Button>

              <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{
                  boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
                }}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity="success"
                  sx={{
                    width: '100%',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                >
                  Contact list Added Successfully!
                </Alert>
              </Snackbar>
            </Box>
          </Card>
        </Box>
      </Drawer>

      {open && <CustomBackdrop open={open} onClick={handleBackdropClick} />}
    </>
  );
};

export { AddContactsListDrawer };
