import { useSelector } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import { Box, Divider, Tooltip, CardMedia, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function LimitedTimeOfferTemplatePreview({
  text,
  coverSrc,
  showImage,
  showLinks,
  showCall,
  showCoupon,
  showVisit,
  uploadedFileURL,
  displaybuttons = false,
}) {
  // Select coupon code from Redux state
  const code = useSelector((state) => state.interactiveAllActions.code);
  const limitedTimeText = useSelector((state) => state.interactiveAllActions.limitedTimeText);
  const isOfferExpiring = useSelector((state) => state.interactiveAllActions.isOfferExpiring);

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
          image={uploadedFileURL || coverSrc}
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

      <Box display="flex" alignItems="center" mb="8px">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(120deg, rgba(142, 51, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%)`,
          }}
        >
          <Iconify width={24} icon="mdi:gift" style={{ color: '#7D6ADB' }} />
        </Box>
        <Box>
          <Box>
            <Typography>{limitedTimeText}</Typography>
          </Box>

          <Box>
            <Typography>Code: {code}</Typography>
          </Box>
          <Box>
            <Typography sx={{ m: 0 }} fontSize="12px" color="text.secondry">
              {isOfferExpiring && 'This Code expires on 23 Apr'}
            </Typography>
          </Box>
        </Box>
      </Box>

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

      {code && (
        <Box>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Tooltip title={code} arrow placement="top">
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
                Copy Code
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      )}

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

      {displaybuttons && (
        <>
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
        </>
      )}
    </Box>
  );
}
