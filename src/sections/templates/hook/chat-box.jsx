import { useState } from 'react';

import {
  Box,
  Card,
  Button,
  Divider,
  Tooltip,
  CardMedia,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material';

import { SubmitAndPreviewTempalteDailog } from 'src/sections/templates/hook/add-templates-components/template-submit-and-preview-dialog';

export default function ExpoloreTemplateChatBox({
  text,
  coverSrc,
  showImage,
  showLinks,
  showCall,
  showCoupon,
  showVisit,
  title,
  icon,
  type,
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Card
      sx={{
        border: '1px solid #919EAB33',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <CardHeader
        sx={{ mb: 2, justifyContent: 'space-between' }}
        title={
          <Tooltip title={` This is the name of template: "${title}" "`} arrow placement="top">
            <Typography
              variant="body2"
              sx={{
                fontSize: 14,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '150px',
              }}
            >
              {title}
            </Typography>
          </Tooltip>
        }
        action={
          <Tooltip
            title={` If you want to use this template : "${title}" for your message click this button"`}
            arrow
            placement="top"
          >
            <Button variant="outlined" color="primary" onClick={handleDialogOpen}>
              Use Template
            </Button>
          </Tooltip>
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
              height: '172px',
              objectFit: 'cover',
              marginBottom: 2,
              borderRadius: '8px',
            }}
          />
        )}
        <Tooltip title={text} arrow placement="top">
          <Typography
            variant="body2"
            sx={{
              px: 0,
              py: 0,
              color: 'primary',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: '66px',
            }}
          >
            {text}
          </Typography>
        </Tooltip>

        <Box>
          <Divider sx={{ mb: 1, mt: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton size="small" sx={{ color: '#007BFF' }}>
              {icon}
            </IconButton>
            <Tooltip title={`Template Type: ${type}`} arrow placement="top">
            <Typography sx={{ color: '#007BFF', fontSize: '14px', fontWeight: '400' }}>
              {type}
            </Typography>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {isDialogOpen && (
        <SubmitAndPreviewTempalteDailog
          open={isDialogOpen}
          onClose={handleDialogClose}
          coverSrc={coverSrc}
          text={text}
          type={type}
          showImage={showImage}
          showLinks={showLinks}
          showCall={showCall}
          showCoupon={showCoupon}
          showVisit={showVisit}
          icon={icon}
          title={title}
        />
      )}
      {/* Pass data to the PreviewTempalteDailog */}
    </Card>
  );
}
