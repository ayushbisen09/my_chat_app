import IconButton from '@mui/material/IconButton';
import { Box, Divider, CardMedia, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function FilePreviewTemplateChatBox({
  text,
  coverSrc,
  showImage,
  showLinks,
  showCall,
  showCoupon,
  showVisit,
  file,
  handleDownloadAndOpen
}) {
  const isImage = file && file.type.startsWith('image/');
  const imageSrc = isImage ? URL.createObjectURL(file) : coverSrc; // Use file URL or default image URL

  return (
    <Box
      sx={{
        p: 2,
        pt: '16px',
        backgroundColor: '#CCF4FE',
        borderRadius: '8px',
        position: 'relative'
      }}
    >
      {showImage && (
        <CardMedia
          component="img"
          image={imageSrc}
          alt="Preview"
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            marginBottom: 2,
            borderRadius: '8px',
          }}
        />
      )}
      {!showImage && (
        <Box
          sx={{
            width: '320px',
            backgroundColor: '#CCF4FE',
            padding: 1.5,
            borderRadius: '8px',
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              position: 'absolute',
              right: '305px',
              top: '100%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              border: '1px solid #E6E6E6',
              borderRadius: '20px',
              backgroundColor: '#FFFFFF',
              p: 0.1,
            }}
          >
            🙏
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography>{file ? file.name : 'Default File Name'}</Typography>
              <Typography variant="body2" color="textSecondary">
                {file ? file.type : 'Default File Type'}
              </Typography>
            </Box>
            <IconButton onClick={handleDownloadAndOpen}>
              <Iconify width={24} icon="ic:round-download" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Box>
        </Box>
      )}
      <Typography variant="body2" sx={{ px: 0, py: 0, color: 'primary' }}>
        {text}
      </Typography>
      {showLinks && (
        <Box sx={{ mt: 3 }}>
          {showCall && (
            <Box>
              <Divider sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton size="small" sx={{ color: '#007BFF' }}>
                  <Iconify width={20} icon="material-symbols:call" />
                </IconButton>
                <Typography sx={{ color: '#007BFF', fontSize: '14px', fontWeight: '400' }}>
                  Call Now
                </Typography>
              </Box>
            </Box>
          )}
          {showCoupon && (
            <Box>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton size="small" sx={{ color: '#007BFF' }}>
                  <Iconify width={20} icon="solar:copy-bold" />
                </IconButton>
                <Typography sx={{ color: '#007BFF', fontSize: '14px', fontWeight: '400' }}>
                  Coupon Code
                </Typography>
              </Box>
            </Box>
          )}
          {showVisit && (
            <Box>
              <Divider sx={{ mb: 1, mt: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IconButton size="small" sx={{ color: '#007BFF' }}>
                  <Iconify width={20} icon="icon-park-outline:share" />
                </IconButton>
                <Typography sx={{ color: '#007BFF', fontSize: '14px', fontWeight: '400' }}>
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
