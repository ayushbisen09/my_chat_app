import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Divider, Typography, IconButton } from '@mui/material';

import {
  setIsVisible,
  setReplyText,
  setImageUrlInReply,
  setOriginalReplyText,
  setImageVisibilityInReply,
  setOriginalImageVisibility,
} from 'src/redux/slices/messageReply';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import VideoPlayer from 'src/components/chat-messages/video/video-message';
import AudioPlayer from 'src/components/chat-messages/audio/audio-message';
import FileMessage from 'src/components/chat-messages/file-message/file-message';
import MessageReply from 'src/components/chat-messages/reply-message/message-reply';
import { ImageModal } from 'src/components/chat-messages/image-modal/lightbox-modal';
import { ImageMessage } from 'src/components/chat-messages/image-message/image-message';
import LocationCard from 'src/components/chat-messages/location-meesage/location-message';
import ShareContact from 'src/components/chat-messages/contact-share/contact-share-message';
import UnsupportedMessageType from 'src/components/chat-messages/unsupported-message/unsupported-message-type';

import { ChatMessageItem } from './chat-message-item';
import { useMessagesScroll } from './hooks/use-messages-scroll';
import audio from '../../../public/assets/audios/new-instrumental.mp3';
import vide from '../../../public/assets/videos/chat-videos/advertisement.mp4';

// Updated HoverActions component with a 'position' prop

const HoverActions = ({ position = 'left', type }) => {
  // const replyText=useSelector(state=>state.MessageReply.replyText);
  const dispatch = useDispatch();
  const toggleVisibility = () => {
    if (type !== 'Image') dispatch(setImageVisibilityInReply(false));
    dispatch(setIsVisible(true));
    dispatch(setOriginalReplyText());
    dispatch(setOriginalImageVisibility());
  };

  return (
    <Stack
      className="message-actions"
      sx={{
        [position]: 0,
        mt: '4px',
        mb: '8px',
        opacity: 0,
        transition: (theme) =>
          theme.transitions.create(['opacity'], { duration: theme.transitions.duration.shorter }),
      }}
      justifyContent="center"
    >
      <IconButton size="small" onClick={toggleVisibility}>
        <Iconify icon="basil:reply-solid" width={24} />
      </IconButton>
    </Stack>
  );
};

// Updated CustomMessage component
const CustomMessage = ({ text1, text2, text3, src }) => {
  const dispatch = useDispatch();

  return (
    <div
      onMouseEnter={() => {
        dispatch(setReplyText(text1 + text2));
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          my: 2,
          position: 'relative',
          '&:hover .message-actions': { opacity: 1 },
        }}
      >
        <HoverActions />

        <Box
          sx={{
            bgcolor: '#ccf4fe',
            borderRadius: 1,
            width: 320,
            overflow: 'hidden',
            p: 1.5,
          }}
        >
          {src && (
            <Box
              component="img"
              src={src}
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          )}
          <Typography
            variant="body2"
            sx={{
              px: 2,
              py: 1,
              color: 'primary',
              mb: 3,
            }}
          >
            {text1}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              px: 2,
              py: 1,
              color: 'primary',
              mb: 1,
            }}
          >
            {text2}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              px: 2,
              py: 1,
              color: 'primary',
              mb: 3,
            }}
          >
            {text3}
          </Typography>
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
      </Box>
    </div>
  );
};

export function ChatMessageList({ messages = [], participants, loading }) {
  const { messagesEndRef } = useMessagesScroll(messages);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.messageReply.isVisible);

  console.log('chat message list k andar vala message ', messages);

  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  const handleOpenModal = (src) => {
    setModalImage(src);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImage('');
  };

  if (loading) {
    return (
      <Stack sx={{ flex: '1 1 auto', position: 'relative' }}>
        <LinearProgress
          color="inherit"
          sx={{
            top: 0,
            left: 0,
            width: 1,
            height: 2,
            borderRadius: 0,
            position: 'absolute',
          }}
        />
      </Stack>
    );
  }

  const defaultMessage = {
    id: 'a9174687-9684-4d2b-af4f-7388714f571a',
    body: 'https://api-dev-minimal-v6.vercel.app/assets/images/cover/cover-9.webp',
    contentType: 'image',
    attachments: [],
    createdAt: '2024-09-17T05:01:23+00:00',
    senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
  };

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, pt: 5, pb: 3, flex: '1 1 auto' }}>
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            participants={participants}
            onOpenLightbox={() => handleOpenModal(message.body)}
          />
        ))}

        <CustomMessage
          text1="Hi {{1}}! 🎧🛒"
          text2="Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌"
          text3={`Order Details: 
            Product: {{2}}
            Quantity: {{3}}
            Order ID: {{4}}
            Delivery Address: {{5}}
            Estimated Delivery Date: {{6}}`}
          src="/assets/images/chatImage/imagechat.png"
        />

        <div
          onMouseEnter={() => {
            dispatch(setReplyText('video'));
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',

              mt: 5,
              position: 'relative',
              '&:hover .message-actions': { opacity: 1 },
            }}
          >
            <VideoPlayer videoSrc={vide} />

            <HoverActions />
          </Box>
        </div>

        <div
          onMouseEnter={() => {
            dispatch(setReplyText('audio'));
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',

              mt: 5,
              position: 'relative',
              '&:hover .message-actions': { opacity: 1 },
            }}
          >
            <AudioPlayer audioSrc={audio} />
            <HoverActions />
          </Box>
        </div>

        <div
          onMouseEnter={() => {
            dispatch(setReplyText('File'));
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center', // Center the items vertically
              mt: 5,
              width: '100%',
              position: 'relative',
              '&:hover .message-actions': { opacity: 1 },
            }}
          >
            <FileMessage onButtonClick={() => alert('Button clicked!')} />
            <Box
              className="message-actions" // Ensure the class name matches your CSS or style
              sx={{
                position: 'absolute', // Use absolute positioning
                top: '20%', // Center vertically
                right: '40%', // Center horizontally
                // transform: 'translate(50%, -50%)', // Adjust position to truly center
                justifyContent: 'center',
              }}
            >
              <HoverActions position="right" />
            </Box>
          </Box>
        </div>

        <div
          onMouseEnter={() => {
            dispatch(
              setReplyText(
                'I am good too. I just finished working on a new project at work. It’s been quite a challenge, but I’m excited about it'
              )
            );
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',

              mt: 5,
              position: 'relative',
              '&:hover .message-actions': { opacity: 1 },
            }}
          >
            <HoverActions />
            <MessageReply />
          </Box>
        </div>

        <div
          onMouseEnter={() => {
            dispatch(setReplyText('Location'));
          }}
        >
          <Box
            sx={{
              display: 'flex',
              mt: 5,
              position: 'relative',
              '&:hover .message-actions': { opacity: 1 },
            }}
          >
            <LocationCard
              location="New York City, NY"
              image="https://example.com/image.jpg" // Replace with your image URL
            />
            <HoverActions position="left" />
          </Box>
        </div>

        <div
          onMouseEnter={() => {
            dispatch(setReplyText('contact'));
          }}
          //  onMouseLeave={() => dispatch(setIsVisible((false)}
        >
          <Box
            sx={{
              display: 'flex',
              mt: 5,
              position: 'relative',
              '&:hover .message-actions': { opacity: 1 },
            }}
          >
            <ShareContact />
            <HoverActions />
          </Box>
        </div>

        <div
          onMouseEnter={() => {
            dispatch(setReplyText('Image'));
            dispatch(setImageVisibilityInReply(true));
            dispatch(setImageUrlInReply(messages[5].body || defaultMessage.body));
            // dispatch(setImage)
          }}
          //  onMouseLeave={() => dispatch(setIsVisible((false)}
        >
          <Box
            sx={{
              display: 'flex',
              mt: 5,
              position: 'relative',
              '&:hover .message-actions': { opacity: 1 },
            }}
          >
            <ImageMessage
              // key={messages[5].id}
              message={messages[5] || defaultMessage}
              participants={participants}
              onOpenLightbox={() => handleOpenModal(messages[5].body || defaultMessage.body)}
            />

            <HoverActions position="left" type="Image" />
          </Box>
        </div>
        <Box
          sx={{
            mt: 5,
            display: 'flex',
            justifyContent: 'center', // Centers horizontally
            alignItems: 'center', // Centers vertically
          }}
        >
          <UnsupportedMessageType />
        </Box>
      </Scrollbar>

      <ImageModal open={modalOpen} onClose={handleCloseModal} src={modalImage} />
    </>
  );
}
