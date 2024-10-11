import IconButton from '@mui/material/IconButton';
import { Box, Card, Divider, CardMedia, CardHeader, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function ChatBox({
  text,
  coverSrc,
  showImage,
  showLinks,
  showCall,
  showCoupon,
  showVisit,
}) {
  return (
    <Card
      sx={{
        border: '1px solid #919EAB33',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <CardHeader
        sx={{ mb: 2 }}
       
        title={
          <Typography variant="h6" sx={{ fontSize: 14, fontWeight: '700' }}>
            Mireya Conner
          </Typography>
        }
        
      />
      <Divider />
      
      <Box
        sx={{
          p: 2,
          pt: '16px',
          backgroundColor: '#CCF4FE',
          borderRadius: '8px',
          m: 2,
        }}
      >
        {showImage && (
          <CardMedia
            component="img"
            image={coverSrc}
            alt="Chat image"
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              marginBottom: 2, // Add some space between the image and the text
              borderRadius: '8px', // Optional: add rounded corners to the image
            }}
          />
        )}
        <Typography
          variant="body2" sx={{ fontSize: 14, fontWeight: 500 }}
        >
          {text}
        </Typography>
        {showLinks && (
          <Box sx={{ mt: 3 }}>
            {showCall && (
              <Box>
                <Divider
                  sx={{
                    mb: 1,
                  }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      color: '#007BFF', // Change color of the icon button
                    }}
                  >
                    <Iconify width={20} icon="material-symbols:call" />
                  </IconButton>
                  <Typography
                    sx={{
                      color: '#007BFF', // Change color of the text
                      fontSize: '14px', // Set font size to 12
                      fontWeight: '400', // Set font weight to medium
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
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      color: '#007BFF', // Change color of the icon button
                    }}
                  >
                    <Iconify width={20} icon="solar:copy-bold" />
                  </IconButton>
                  <Typography
                    sx={{
                      color: '#007BFF', // Change color of the text
                      fontSize: '14px', // Set font size to 12
                      fontWeight: '400', // Set font weight to medium
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
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{
                      color: '#007BFF', // Change color of the icon button
                    }}
                  >
                    <Iconify width={20} icon="icon-park-outline:share" />
                  </IconButton>
                  <Typography
                    sx={{
                      color: '#007BFF', // Change color of the text
                      fontSize: '14px', // Set font size to 12
                      fontWeight: '400', // Set font weight to medium
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
    </Card>
  );
}
