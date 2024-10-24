import { Helmet } from 'react-helmet-async';

import { Box,Button,Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { JwtSignUpView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | Jwt - ${CONFIG.site.name}` };

export default function Page() {

  const router = useRouter();

  const redirectToSignup =()=>{  
    router.push(paths.auth.jwt.signIn)
   
  }
  return (
    <>
      <Box
        sx={{
          position: { xs: 'relative', md: 'absolute' }, // Relative for mobile/tablet, absolute for laptop
          top: { xs: -32, md: 16, }, // Top positioning only for laptop
          right: { xs: 'auto', md: 16 }, // Right positioning only for laptop
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Column on mobile/tablet, row on laptop
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' }, // Center for mobile/tablet, left-align for laptop
          padding: { xs: 2, md: 0 }, // Padding for mobile/tablet
          gap: { xs: 2, md: 0 }, // Gap for mobile/tablet
          width: { xs: '100%', md: 'auto' }, // Full width on mobile/tablet
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginRight: { xs: 0, md: 1 }, // Remove margin on mobile/tablet, maintain on laptop
            textAlign: { xs: 'center', md: 'left' }, // Center text for mobile/tablet, left-align for laptop
          }}
        >
          Already have a Pabbly Account?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          // href={paths.auth.jwt.signIn}
          onClick={redirectToSignup}
          sx={{
            // width: { xs: '100%', md: 'auto' }, // Full button width on mobile/tablet, auto on laptop
            maxWidth: { xs: 'auto', md: '100px' }, // Optional max width for laptop view
          }}
        >
          Login
        </Button>
      </Box>
      
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      
        
        <JwtSignUpView />

    
       
     
    </>
  );
}