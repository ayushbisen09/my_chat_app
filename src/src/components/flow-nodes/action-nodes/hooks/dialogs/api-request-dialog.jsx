import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useForm, useFieldArray } from 'react-hook-form';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  Tab,
  Tabs,
  Stack,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  ListItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  ListItemText,
  Autocomplete,
  useMediaQuery,
  InputAdornment,
  FormHelperText,
} from '@mui/material';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

const ParamsTabs = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({ title: '', description: '' });
  };

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };
  const [selectedFlow, setSelectedFlow] = useState('');

  const handleFlowChange = (event) => {
    setSelectedFlow(event.target.value);
  };

  const attributes = [
    { title: 'Attribute 1'},
    { title: 'Attribute 2' },
    // Add more films...
  ];

  // Styled ListItem to customize appearance
  const CustomListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }));
  return (
    <>
      <Stack spacing={3} mt={2}>
        {fields.map((item, index) => (
          <Stack key={item.id} direction="row" spacing={2} alignItems="center">
            <TextField variant="outlined" fullWidth label="Key" />
            <FormControl fullWidth>
              <Autocomplete
                fullWidth
                freeSolo
                disableClearable
                options={attributes.map((option) => option.title)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Attribute or Type Value"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
                renderOption={(props, option) => {
                  // Find the film object corresponding to the title
                  const filmData = attributes.find((film) => film.title === option);

                  return (
                    <CustomListItem {...props} key={option}>
                      <ListItemText primary={filmData.title} />
                    </CustomListItem>
                  );
                }}
              />
            </FormControl>
            <Button size="small" onClick={() => handleRemove(index)} disabled={fields.length === 1}>
              <Iconify width={24} icon="solar:trash-bin-trash-bold" />
            </Button>
          </Stack>
        ))}
      </Stack>
      <Box>
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
        >
          Add More Fields
        </Button>
      </Box>
    </>
  );
};

const HeaderTabs = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({ title: '', description: '' });
  };

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };
  const [selectedFlow, setSelectedFlow] = useState('');

  const handleFlowChange = (event) => {
    setSelectedFlow(event.target.value);
  };

  const attributes = [
    { title: 'Attribute 1'},
    { title: 'Attribute 2' },
    // Add more films...
  ];

  // Styled ListItem to customize appearance
  const CustomListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }));
  return (
    <>
      <Stack spacing={3} mt={2}>
        {fields.map((item, index) => (
          <Stack key={item.id} direction="row" spacing={2} alignItems="center">
            <TextField variant="outlined" fullWidth label="Key" />
            <FormControl fullWidth>
              <Autocomplete
                fullWidth
                freeSolo
                disableClearable
                options={attributes.map((option) => option.title)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Attribute or Type Value"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
                renderOption={(props, option) => {
                  // Find the film object corresponding to the title
                  const filmData = attributes.find((film) => film.title === option);

                  return (
                    <CustomListItem {...props} key={option}>
                      <ListItemText primary={filmData.title} />
                    </CustomListItem>
                  );
                }}
              />
            </FormControl>
            <Button size="small" onClick={() => handleRemove(index)} disabled={fields.length === 1}>
              <Iconify width={24} icon="solar:trash-bin-trash-bold" />
            </Button>
          </Stack>
        ))}
      </Stack>
      <Box>
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
        >
          Add More Fields
        </Button>
      </Box>
    </>
  );
};

const BodyTabs = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });


 
  // Styled ListItem to customize appearance

  return (
    
      <TextField
        sx={{mb:'24px'}}
          fullWidth
          multiline
          rows={3}
          type="text"
          margin="dense"
          variant="outlined"
          label="Body"
          defaultValue={`{
	"name":"$firstname"
}`}
          InputLabelProps={{ shrink: true }}
        />
    
  );
};

const CaptureAttribute = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({ title: '', description: '' });
  };

  const handleRemove = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };
  const [selectedFlow, setSelectedFlow] = useState('');

  const handleFlowChange = (event) => {
    setSelectedFlow(event.target.value);
  };


  // Styled ListItem to customize appearance

  return (
    <>
      <Stack spacing={3} mt={2}>
        {fields.map((item, index) => (
          <Stack key={item.id} direction="row" spacing={2} alignItems="center">
            <FormControl fullWidth>
                    <InputLabel id="Select Attribute">Select Attribute</InputLabel>
                    <Select
                      labelId="condition-select-label"
                      id="condition-select-label"
                      value={selectedFlow}
                      label="Select Attribute"
                      onChange={handleFlowChange}
                    >
                      <MenuItem value="Equal">Tag 1</MenuItem>
                      <MenuItem value="Exists">Tag 2</MenuItem>
                      <MenuItem value="Time In">Tag 3</MenuItem>
                    </Select>
                  </FormControl>
          
            <FormControl fullWidth>
                    <InputLabel id="condition-select-label">Select Attribute</InputLabel>
                    <Select
                      labelId="condition-select-label"
                      id="condition-select"
                      value={selectedFlow}
                      label="Select Attribute"
                      onChange={handleFlowChange}
                    >
                      <MenuItem value="Equal">Tag 1</MenuItem>
                      <MenuItem value="Exists">Tag 2</MenuItem>
                      <MenuItem value="Time In">Tag 3</MenuItem>
                    </Select>
                  </FormControl>
            
            <Button size="small" onClick={() => handleRemove(index)} disabled={fields.length === 1}>
              <Iconify width={24} icon="solar:trash-bin-trash-bold" />
            </Button>
          </Stack>
        ))}
      </Stack>
      <Box>
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
        >
          Add More Fields
        </Button>
      </Box>
    </>
  );
};
// ----------------------------------------------------------------------

export function APIRequestDialog({ title, content, action, open, onClose, ...other }) {
  
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('sm'));
  const dialog = useBoolean();
 ;


  const handleTest = () => {
    // Implement your logic to add WhatsApp number here
    // For example, you might want to validate the inputs first

    // Show the snackbar
    

    // Close the dialog after a short delay
    
  };

  
  const [selectedRequest, setSelectedRequest] = useState('get');

  const handleRequestChange = (event) => {
    setSelectedRequest(event.target.value);
  };

  const basicTabs = useTabs('params');
  const TABS = [
    {
      value: 'params',

      label: 'Params',
      form: <ParamsTabs />,
    },
    {
      value: 'headers',

      label: 'Headers',
      form: <HeaderTabs/>,
    },
    {
      value: 'body',

      label: 'Body',
      form: <BodyTabs/>,
    },
  ];



  

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...other}
      PaperProps={isWeb ? { style: { minWidth: '600px' } } : { style: { minWidth: '330px' } }}
    >
      <DialogTitle
        sx={{ fontWeight: '700', display: 'flex', justifyContent: 'space-between' }}
        onClick={dialog.onFalse}
      >
        Quick Replies{' '}
        <Iconify
          onClick={onClose}
          icon="uil:times"
          style={{ width: 20, height: 20, cursor: 'pointer', color: '#637381' }}
        />
      </DialogTitle>
      <Divider />

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box display="flex" gap={2} sx={{ mt: '24px', mb: '16px' }}>
          <FormControl sx={{ width: '125px' }}>
            <InputLabel id="condition-select-label">Select</InputLabel>
            <Select
              labelId="condition-select-label"
              id="condition-select"
              value={selectedRequest}
              label="Select"
              onChange={handleRequestChange}
            >
              <MenuItem value="get">GET</MenuItem>
              <MenuItem value="post">POST</MenuItem>
              <MenuItem value="put">PUT</MenuItem>
              <MenuItem value="patch">PATCH</MenuItem>
              <MenuItem value="delete">DELETE</MenuItem>
            </Select>
            <FormHelperText>Request</FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              label="Enter or paste URL"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title="Enter or paste URL."
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
            />
          </FormControl>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Tabs value={basicTabs.value} onChange={basicTabs.onChange}>
          {TABS.slice(0, 4).map((tab) => (
            <Tab
              key={tab.value}
              icon={tab.icon}
              label={tab.label}
              value={tab.value}
              disabled={tab.disabled}
            />
          ))}
        </Tabs>
        {TABS.find((tab) => tab.value === basicTabs.value)?.form}
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box display="flex" justifyContent="end" gap={1} mt={1}>
          <Button onClick={handleTest} variant="contained">
            Test
          </Button>
          <Button onClick={onClose} variant="outlined" color="inherit">
            Save
          </Button>
        </Box>
        <Typography>Response</Typography>
        <Typography fontSize={14} mb={0}>Capture response in Attribute</Typography>
        <CaptureAttribute/>
        
        <TextField
        sx={{mb:'24px'}}
          fullWidth
          multiline
          rows={3}
          type="text"
          margin="dense"
          variant="outlined"
          label="Message Type"
          defaultValue='{ }'
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
    </Dialog>
  );
}
