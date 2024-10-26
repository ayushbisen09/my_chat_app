import IconButton from '@mui/material/IconButton';
import { Box, Divider, CardMedia, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function AuthenticationTemplate({
  text,
  coverSrc,
  showImage,
  showLinks,
  showCall,
  showCoupon,
  showVisit,
  title, // Default to true, can be overridden
}) {
  return (
    
      <Box
        sx={{
          p: 2,
          pt: '16px',
          backgroundColor: '#CCF4FE',
          borderRadius: '8px',
          width: 335
        
        }}
      >
        {showImage && (
          <CardMedia
            component="img"
            image={coverSrc}
            alt="Chat image"
            sx={{
              width: '100%',
              height: '172px',
              objectFit: 'cover',
              marginBottom: 2,
              borderRadius: '8px',
            }}
          />
        )}
        <Typography
          variant="body2"
          sx={{
            px: 0,
            py: 0,
            color: 'primary',
          }}
        >
          {text}
        </Typography>
        {showLinks && (
          <Box sx={{ mt: 3 }}>
            {showCall && (
              <Box>
                <Divider sx={{ mb: 1 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      color: '#007BFF',
                    }}
                  >
                    <Iconify width={20} icon="material-symbols:call" />
                  </IconButton>
                  <Typography
                    sx={{
                      color: '#007BFF',
                      fontSize: '14px',
                      fontWeight: '400',
                    }}
                  >
                    Call Now
                  </Typography>
                </Box>
              </Box>
            )}
            {showCoupon && (
              <Box>
                <Divider sx={{ mt: 1, mb: 1 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      color: '#007BFF',
                    }}
                  >
                    <Iconify width={20} icon="solar:copy-bold" />
                  </IconButton>
                  <Typography
                    sx={{
                      color: '#007BFF',
                      fontSize: '14px',
                      fontWeight: '400',
                    }}
                  >
                    Coupon Code
                  </Typography>
                </Box>
              </Box>
            )}
            {showVisit && (
              <Box>
                <Divider sx={{ mb: 1, mt: 1 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      color: '#007BFF',
                    }}
                  >
                    <Iconify width={20} icon="icon-park-outline:share" />
                  </IconButton>
                  <Typography
                    sx={{
                      color: '#007BFF',
                      fontSize: '14px',
                      fontWeight: '400',
                    }}
                  >
                    Visit Now
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
   
  );
}
