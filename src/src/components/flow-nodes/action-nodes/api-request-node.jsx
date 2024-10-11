import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import {
  Box,
  Card,
  Stack,
  Button,
  TextField,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

import { APIRequestDialog } from './hooks/dialogs/api-request-dialog';

export default function APIRequestNode({
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
        title={<Typography variant="h6">API Request</Typography>}
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
        <FormControl fullWidth size="large" sx={{ mb: 3 }}>
          <TextField
            onClick={dialog.onTrue}
            label="Webhook URL"
            variant="outlined"
            fullWidth
            helperText="API Request URL"
          />
        </FormControl>
        <FormControl fullWidth size="large" sx={{ mb: 3 }}>
          <TextField
            helperText="JSON data to send."
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            defaultValue={`{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}`}
            InputProps={{
              readOnly: true,
            }}
          />
        </FormControl>

        <FormControl fullWidth>
          <Stack spacing={3}>
            {fields.map((item, index) => (
              <Stack spacing={0} key={item.id}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <FormControl fullWidth>
                    <Stack spacing={3} sx={{ mb: 0 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Button variant="outlined" color="primary" size="medium" fullWidth>
                          Status Fallback
                        </Button>
                      </Box>
                    </Stack>
                  </FormControl>
                  <IconButton
                    size="small"
                    onClick={() => handleRemove(index)}
                    disabled={fields.length === 1}
                    sx={{ color: 'grey.600' }}
                  >
                    <Iconify width={24} icon="solar:trash-bin-trash-bold" />
                    <Iconify width={24} icon="octicon:dot-16" sx={{ color: '#078DEE' }} />
                  </IconButton>
                </Stack>
                {/* <FormHelperText>Select tag.</FormHelperText> */}
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
            Custom Status Code
          </Button>

          <APIRequestDialog open={dialog.value} onClose={dialog.onFalse} />
        </FormControl>
      </Card>
    </Card>
  );
}
