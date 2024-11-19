import { Box, Divider, CardMedia, Typography, IconButton } from '@mui/material';

import { formatNames } from 'src/utils/formatString';

export default function ExploareTemplatePreviewChatBox({ text, coverSrc, showImage, icon, type }) {
  const getIconText = () => {
    if (icon.props.icon === 'icon-park-outline:share') return 'Share';
    if (icon.props.icon === 'solar:copy-bold') return 'Copy Coupan Code';
    if (icon.props.icon === 'material-symbols:call') return 'Call Now';
    return ''; // Default fallback
  };
  return (
    <Box
      sx={{
        p: 2,
        pt: '16px',
        backgroundColor: '#CCF4FE',
        borderRadius: '8px',
      }}
    >
      {showImage && type !== 'Text' && (
        <CardMedia
          component="img"
          image={
            type === 'Audio'
              ? '../../../../../public/assets/images/chatImage/audio.png'
              : type === 'Video'
                ? '../../../../../public/assets/images/chatImage/video.png'
                : type === 'File'
                  ? '../../../../../public/assets/images/chatImage/document.png'
                  : coverSrc // Default image
          }
          alt={`${type} image`}
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
          // 24px margin bottom
        }}
      >
        {formatNames(text)}
      </Typography>

      {icon && (
        <Box>
          {' '}
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton size="small" sx={{ color: '#007BFF' }}>
              {icon}
            </IconButton>

            <Typography sx={{ color: '#007BFF', fontSize: '14px', fontWeight: '400' }}>
              {getIconText(icon)}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
