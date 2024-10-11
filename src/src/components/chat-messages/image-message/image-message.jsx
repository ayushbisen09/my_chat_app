/* eslint-disable import/extensions */
import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { useMessage } from 'src/sections/chat/hooks/use-message';

import { useMockedUser } from 'src/auth/hooks';


export function  ImageMessage({ message, participants, onOpenLightbox }) {

  // let defaultMessage = {
  //   id: "a9174687-9684-4d2b-af4f-7388714f571a",
  //   body: "https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-9.webp",
  //   contentType: "image",
  //   attachments: [],
  //   createdAt: "2024-09-17T05:01:23+00:00",
  //   senderId: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
  // };

  const { user } = useMockedUser();
  console.log("image message k andar vala message",message);
  const { me, senderDetails, hasImage } = useMessage({
    message,
    participants,
    currentUserId: `${user?.id}`,
  });

  const { firstName, avatarUrl } = senderDetails;
  const { body, createdAt } = message;

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{ mb: 1, color: 'text.disabled', ...(!me && { mr: 'auto' }) }}
    >
      {!me && `${firstName}, `}
      {fToNow(createdAt)}
    </Typography>
  );

  return (
    <Stack
    sx={{
      p: 1.5,
      minWidth: 48,
      maxWidth: 320,
      borderRadius: 1,
      typography: 'body2',
      bgcolor: 'background.neutral',
      ...(me && { color: 'grey.800', bgcolor: 'primary.lighter' }),
      ...(hasImage && { p: 0, bgcolor: 'transparent' }),
    }}
  >
      <Box
        component="img"
        alt="attachment"
        
        src={body}
        onClick={() => onOpenLightbox(body)}
        sx={{
          width: 400,
          height: 'auto',
          borderRadius: 1.5,
          cursor: 'pointer',
          objectFit: 'cover',
          aspectRatio: '16/11',
          '&:hover': { opacity: 0.9 },
        }}
      />
   
  </Stack>
  );
}
