import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {
  Box,
  Card,
  Stack,
  Select,
  Button,
  MenuItem,
  CardHeader,
  Typography,
  IconButton,
  FormHelperText,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { AddTagDialog } from './hooks/dialogs/tag-dialog';

export default function AddTagNode({
  sx,
  Videotitle,
  cardstats,
  thumbnailimage,
  buttonText,
  videoId,
  ...other
}) {
  const [selectedFlow, setSelectedFlow] = useState('');

  const handleFlowChange = (event) => {
    setSelectedFlow(event.target.value);
  };

  const methods = useForm({
    defaultValues: {
      items: [{ title: '', description: '' }],
    },
  });
  const { control } = methods;
  const { fields, append, remove } = useFieldArray({
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

  const dialog = useBoolean();

  return (
    <Card
      sx={{
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        p: 2,
        // width: '350px',
        backgroundColor: '#F4F6F8',
        border: '1px solid transparent',
        '&:hover': {
          outline: '2px solid #078DEE',
          borderRadius: '16px',
        },
        ...sx,
      }}
      {...other}
    >
      <CardHeader
        title={<Typography variant="h6">Add Tag</Typography>}
        action={
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <Iconify width={24} icon="solar:copy-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
            <IconButton>
              <Iconify
                width={24}
                icon="solar:trash-bin-trash-bold"
                sx={{ color: 'text.secondary' }}
              />
            </IconButton>
            <IconButton>
              <Iconify width={24} icon="octicon:dot-16" sx={{ color: '#078DEE' }} />
            </IconButton>
          </Box>
        }
        sx={{ p: 0, mb: 2 }}
      />
      <Card
        sx={{
          boxShadow: '0px 2px 1px 0px rgba(145, 158, 171, 0.16)',
          px: 1.5,
          pt: 3.5,
          pb: 2.5,
          borderRadius: '12px',
          border: '1px solid transparent',
          '&:hover': {
            border: '1px solid #919EAb',
            borderRadius: '16px',
          },
        }}
        {...other}
      >
        <FormControl fullWidth>
          <Stack spacing={3}>
            {fields.map((item, index) => (
              <Stack spacing={0} key={item.id}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <FormControl fullWidth>
                    <InputLabel id="condition-select-label">Select Tag</InputLabel>
                    <Select
                      labelId="condition-select-label"
                      id="condition-select"
                      value={selectedFlow}
                      label="Select Tag"
                      onChange={handleFlowChange}
                    >
                      <MenuItem value="Equal">Tag 1</MenuItem>
                      <MenuItem value="Exists">Tag 2</MenuItem>
                      <MenuItem value="Time In">Tag 3</MenuItem>
                    </Select>
                  </FormControl>
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(index)}
                    disabled={fields.length === 1}
                    sx={{ color: 'grey.600' }}
                  >
                    <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Stack>
                <FormHelperText>Select tag.</FormHelperText>
              </Stack>
            ))}
          </Stack>

          <Button
            variant="outlined"
            size="medium"
            color="primary"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleAdd}
            sx={{ mt: 3, alignSelf: 'flex-center' }}
          >
            Add Tag
          </Button>
          <Button
            onClick={dialog.onTrue}
            variant="outlined"
            size="medium"
            color="primary"
            // startIcon={<Iconify icon="mingcute:add-line" />}
            // onClick={handleAdd}
            sx={{ mt: 3, alignSelf: 'flex-center' }}
          >
            Create Tag
          </Button>
          <AddTagDialog open={dialog.value} onClose={dialog.onFalse} />
        </FormControl>
      </Card>
    </Card>
  );
}
