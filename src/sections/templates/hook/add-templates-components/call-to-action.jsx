import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';

import {
  Box,
  Radio,
  Stack,
  Button,
  Tooltip,
  TextField,
  RadioGroup,
  Typography,
  useMediaQuery,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

// eslint-disable-next-line func-names
export default function () {
  const theme = useTheme();

  const [actionType, setaActionType] = useState('none');

  // const [fields, setFields] = useState([]);

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

  const { append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  
  const handleRemove = (index) => {
    setFields(fields.filter((_, i) => i !== index));
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

  const [fields, setFields] = useState([{ id: 1 }]); // Example initial state

  const handleAdd = () => {
    setFields([...fields, { id: fields.length + 1 }]); // Add new attribute field
  };

  const handleConfirmRemove = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const saveAttributes = () => {
    // Save logic here
  };

  const handleChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit}>
        {/* Display dynamically added fields */}

        <Box sx={{ width: '100%' }}>
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
                        value={item.value}
                        onChange={(e) => handleChange(index, e)}
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
      </Form>
    </FormProvider>
  );
}
