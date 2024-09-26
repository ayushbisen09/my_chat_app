import IconButton from '@mui/material/IconButton';
import { Box, Card, Avatar, Divider, CardMedia, CardHeader, Typography } from '@mui/material';

import { Iconify } from '../iconify';

export default function ChatBox({
  text,
  coverSrc,
  showImage,
  showLinks,
  showCall,
  showCoupon,
  showVisit,
  title,
  showOnline = true, // Default to true, can be overridden
  showAvatar = true, // Default to true, can be overridden
  showTimestamp = true, // Default to true, can be overridden
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
        avatar={
          showAvatar && ( // Conditionally render avatar
            <Avatar aria-label="profile picture">MC</Avatar>
          )
        }
        title={
          <Typography variant="h7" sx={{ fontSize: 14, fontWeight: '700' }}>
            {title || 'Mireya Conner'} {/* Use title prop if available */}
          </Typography>
        }
        subheader={
          showOnline && ( // Conditionally render online status
            <Typography variant="subtitle2" sx={{ fontSize: 12, fontWeight: '400' }}>
              Online
            </Typography>
          )
        }
      />
      <Divider />
      {showTimestamp && ( // Conditionally render timestamp
        <Typography
          variant="caption"
          sx={{
            pr: 2,
            pt: 3,
            display: 'flex',
            color: '#919EAB',
            justifyContent: 'end',
          }}
        >
          4:02 PM
        </Typography>
      )}
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
    </Card>
  );
}
