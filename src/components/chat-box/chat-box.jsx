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
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          border: '1px solid #919EAB33',
          width: '100%',
          maxWidth: '400px',
          height: '500px',
        }}
      >
        <CardHeader
          sx={{ mb: 2, justifyContent: 'space-between' }}
          title={
            <Tooltip
              title={` This is the name of template: "${title}" "`}
              arrow
              placement="top"
            >
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

        {/* Pass data to the PreviewTempalteDailog */}
      </Card>
      <SubmitAndPreviewTempalteDailog
        open={isDialogOpen}
        onClose={handleDialogClose}
        coverSrc={coverSrc}
        text={text}
        showImage={showImage}
        showLinks={showLinks}
        showCall={showCall}
        showCoupon={showCoupon}
        showVisit={showVisit}
      />
    </>
  );
}
