import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm, useFieldArray } from 'react-hook-form';

import Button from '@mui/material/Button';
import { Box, Stack, Tooltip, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function AttributesSection() {
  const theme = useTheme();

  const [attributes, setAttributes] = useState(['']);
  const [attributeConditions, setAttributeConditions] = useState(['']);
  const [attributeValues, setAttributeValues] = useState(['']);

  const handleAttributeChange = (index, event) => {
    const newAttributes = [...attributes];
    newAttributes[index] = event.target.value;
    setAttributes(newAttributes);

    // Reset condition and value when attribute changes
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

  const getFilteredConditions = (attribute) => {
    switch (attribute) {
      case 'name':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value !== 'has' && condition.value !== 'has_not'
        );
      case 'mobile_number':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value !== 'has' && condition.value !== 'has_not'
        );
      case 'text':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value === 'has' || condition.value === 'has_not'
        );
      case 'source':
      case 'first_message':
        return ATTRIBUTESCONDITIONS.filter(
          (condition) => condition.value !== 'has' && condition.value !== 'has_not'
        );
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

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });

  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { control } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleAdd = () => {
    append({
      title: '',
      description: '',
    });
    setAttributes([...attributes, '']);
    setAttributeConditions([...attributeConditions, '']);
    setAttributeValues([...attributeValues, '']);
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
        ]; // Replace with actual campaign names
      case 'closed':
      case 'requested':
        return ['Yes', 'No'];
      default:
        return [];
    }
  };

  return (
    <Box>
      <Box sx={{ mr: 6 }}>
        {!isTabletOrMobile && (
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ mb: { xs: 2, sm: 0 }, width: '50%' }}>
              <Typography fontSize="14px" sx={{ fontWeight: 700, mb: 2 }}>
                Attributes
              </Typography>
            </Box>
          </Box>
        )}
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
                id="select-currency-label-x"
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
                id="select-currency-label-x"
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
                  id="select-currency-label-x"
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
                  id="select-currency-label-x"
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
                    onClick={() => handleRemove(index)}
                    disabled={fields.length === 1}
                  >
                    <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                  </Button>
                </Tooltip>
              )}
            </Stack>
            {isTabletOrMobile && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  justifyItems: 'center',
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
      <Tooltip title="click here to add more attribute" arrow placement="top">
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ mt: 3, alignSelf: 'flex-start' }}
        >
          Add More Attribute
        </Button>
      </Tooltip>
    </Box>
  );
}
