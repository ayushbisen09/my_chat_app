import IconButton from '@mui/material/IconButton';
import { Box, Divider, Tooltip, CardMedia, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function LocationPreviewTemplateChatBox({
  text,
  showImage,
  showLinks,
  showCall,
  showCoupon,
  showVisit,
  footer,
}) {
  return (
    <Box
      sx={{
        p: 2,
        pt: '16px',
        backgroundColor: '#CCF4FE',
        borderRadius: '8px',
        width: 335,
      }}
    >
      {showImage && (
        <CardMedia
          component="img"
          image="../../assets/images/chatImage/location.png"
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
            mb: 2,
            color: 'primary',
            whiteSpace: 'normal', // Allows text to wrap to the next line
            wordWrap: 'break-word', // Breaks words when necessary to fit within the width
            overflow: 'hidden',
          }}
        >
          {text}
        </Typography>
        <Tooltip
        tittle="This is footer which is entered during this template creation"
        arrow
        placement="top"
      >
      <Typography
        fontSize={12}
        fontWeight={500}
        sx={{
          mb: 2,
          color: '#637381',
          // 24px margin bottom
        }}
      >
        {footer}
      </Typography>
      </Tooltip>

      {showLinks && (
        <Box>
          {showCall && (
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
