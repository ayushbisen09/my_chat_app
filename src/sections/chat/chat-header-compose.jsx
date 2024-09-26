import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, InputAdornment } from '@mui/material';

import { countries } from 'src/assets/data';

// ----------------------------------------------------------------------

export function ChatHeaderCompose({ contacts }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // Set the default country to India (country code 'IN')
  const defaultCountry = countries.find((country) => country.code === 'IN');
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  const handleCountryChange = (event) => {
    setSelectedCountry(countries.find((country) => country.code === event.target.value));
  };

  const updatedCountries = countries.map((country) => ({
    ...country,
    phone: `+${country.phone}`,
  }));

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: 'text.primary', mr: 2 }}>
        To New Contact:
      </Typography>

      <TextField
        sx={{ width: 320 }}
        placeholder="Enter mobile number"
        size="small"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        inputProps={{ type: 'number', pattern: '[0-9]*', maxLength: 15 }}
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
    </>
  );
}
