import { useState } from 'react';
import { useTheme } from '@emotion/react';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box, Card,Alert, Button,  Divider, Snackbar, } from '@mui/material';



// ----------------------------------------------------------------------

export function JwtConfirm() {
  const theme = useTheme();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  const renderHead = (
    <Stack spacing={1.5} sx={{ mb: 0,mt:26}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Confirm Email Box */}
        <Card
          sx={{
            padding: '2rem',
            textAlign: 'center',
            maxWidth: '650px',
            backgroundColor: '#fff',
            borderRadius: '16px',
            width: '100%',
            '@media (max-width: 1024px)': {
              maxWidth: '90%', // Responsive width for laptops with 1024px screen
              padding: '1.5rem', // Adjust padding for smaller screens
            },
          }}
        >
          <Box sx={{ mb: 2 }}>
            {/* Email Icon */}
            <svg height="35" viewBox="0 0 512 512" width="35" xmlns="http://www.w3.org/2000/svg">
              <path d="m176 451.988281c-5.519531 0-10 4.480469-10 10 0 5.523438 4.480469 10 10 10s10-4.476562 10-10c0-5.519531-4.480469-10-10-10zm0 0" />
              <path d="m499.359375 155.863281c-.046875-.035156-.097656-.066406-.144531-.101562l-83.214844-57.039063v-28.734375c0-5.519531-4.476562-10-10-10h-48.050781l-73.050781-50.796875c-17.285157-12.246094-40.511719-12.246094-57.726563-.050781l-73.132813 50.847656h-48.039062c-5.523438 0-10 4.480469-10 10v28.734375l-83.214844 57.039063c-.046875.03125-.097656.066406-.144531.101562-8.046875 5.726563-12.640625 15.007813-12.640625 24.464844v301.660156c0 16.230469 13.125 30 30 30h452c16.886719 0 30-13.78125 30-30v-301.660156c0-9.851563-4.917969-18.96875-12.640625-24.464844zm-7.359375 324.945313-166.800781-139.90625 166.800781-148.960938zm-472-288.867188 166.800781 148.960938-166.800781 139.90625zm181.875 162.421875 20.347656 18.171875c9.246094 8.46875 21.238282 13.128906 33.777344 13.128906s24.53125-4.660156 33.777344-13.128906l20.347656-18.171875 164.085938 137.625h-436.421876zm283.828125-183.613281-69.703125 62.25v-110.03125zm-247.042969-145.238281c10.371094-7.347657 24.308594-7.351563 34.75.046875l49.507813 34.429687h-133.84375zm157.339844 54.476562v170.871094l-119.589844 106.800781c-.035156.03125-.070312.0625-.105468.09375-11.574219 10.632813-29.035157 10.632813-40.609376 0-.035156-.03125-.066406-.0625-.101562-.09375l-119.59375-106.800781c0-39.320313 0-134.394531 0-170.871094zm-300 153.011719-69.703125-62.25 69.703125-47.78125zm0 0" />
              <path d="m336 451.988281h-120c-5.523438 0-10 4.480469-10 10 0 5.523438 4.476562 10 10 10h120c5.523438 0 10-4.476562 10-10 0-5.519531-4.476562-10-10-10zm0 0" />
              <path d="m256 299.988281c5.523438 0 10-4.476562 10-10 0-5.519531-4.476562-10-10-10-38.597656 0-70-31.398437-70-70 0-38.597656 31.402344-70 70-70s70 31.402344 70 70v20c0 5.515625-4.484375 10-10 10s-10-4.484375-10-10v-20c0-27.566406-22.429688-50-50-50s-50 22.433594-50 50c0 27.570313 22.429688 50 50 50 13.441406 0 25.648438-5.339843 34.644531-13.996093 5.320313 8.402343 14.695313 13.996093 25.355469 13.996093 16.542969 0 30-13.457031 30-30v-20c0-49.625-40.375-90-90-90s-90 40.375-90 90c0 49.628907 40.375 90 90 90zm0-60c-16.542969 0-30-13.457031-30-30 0-16.539062 13.457031-30 30-30s30 13.460938 30 30c0 16.542969-13.457031 30-30 30zm0 0" />
            </svg>
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Confirm Your Email Address!
          </Typography>

          <Divider sx={{ mt:2 }} />

          <Typography sx={{ mt:2 }}>
           We have sent a verification email to {' '}
            <Link href="numeral-whale-32@inboxkitten.com." sx={{ fontWeight: 'bold', color: '#078dee' }}>
            numeral-whale-32@inboxkitten.com
            </Link>
            . Please check your inbox and verify your email address.
          </Typography>

          <Typography sx={{ mt:2 }}>
           If you don&apos;t receive the email within 15 minutes, kindly check your spam or junk mail folder. If the email is there, please mark it as &ldquo;Not Junk&ldquo; to ensure future messages are delivered to your inbox.
          </Typography>

          <Typography sx={{ mt:2 }}>
          If you any questions, or need help with anything, please contact us at support@pabbly.com.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            // component={RouterLink} href={paths.auth.jwt.signIn}
            onClick={handleOpenSnackbar}
          >
           
            Resend Verification Email
          </Button>

      

           <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{mt:6}}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            
            width: {xs:'100%',sm:'60%',md:'60%'},
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
            color: theme.palette.text.primary,
            textAlign:"left"
          }}
        >
          If your email is in our database, you&apos;ll receive a password recovery link
          shortly.
        </Alert>
      </Snackbar>
        </Card>

      </Box>
    </Stack>
  );

  return (
    <>
      {renderHead}
    </>
  );
}
