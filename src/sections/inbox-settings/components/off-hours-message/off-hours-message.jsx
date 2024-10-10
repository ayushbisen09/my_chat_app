import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Box,
  Card,
  Avatar,
  Button,
  Switch,
  Divider,
  Tooltip,
  CardHeader,
  Typography,
  FormControlLabel,
} from '@mui/material';

import { wellComeSetChosen } from 'src/redux/slices/wellcomeMessageTemplateTypeSlice';

import PreviewTemplateChatBox from 'src/sections/preview-template/chat-box';
import FileType from 'src/sections/optIn-management/hook/messages-type/file';
import AudioTemplateChatBox from 'src/sections/preview-template/audio-chatbox';
import VideoTemplateChatBox from 'src/sections/preview-template/video-chatbox';
import VideoType from 'src/sections/optIn-management/hook/messages-type/video';
import AudioType from 'src/sections/optIn-management/hook/messages-type/audio';
import FilePreviewTemplateChatBox from 'src/sections/preview-template/file-chatbox';
import ImagePreviewTemplateChatBox from 'src/sections/preview-template/image-chatbox';

import { OffHourMessageDrawer } from '../../hook/off-hours-messages-drawer';
import video from '../../../../../public/assets/images/chatImage/video.png';
import FileImage from '../../../../../public/assets/images/chatImage/imagechat.png';

// ----------------------------------------------------------------------

export default function OffHourMessage() {
  const { messageType, messageContent, chatBoxImage } = useSelector((state) => state.offHourRegularMessage);
  const offHourTemplateType = useSelector(
    (state) => state.offHourMessageTemplateType.offHourTemplateType
  ); // Access the saved template fields
  const offHourTemplateFields = useSelector(
    (state) => state.offHourMessageTemplateType.offHourTemplateFields
  ); // Access the saved template fields
  const offHourFileTemplateFields = useSelector(
    (state) => state.offHourMessageTemplateType.offHourFileTemplateFields
  ); // New file template fields
  const offHourUploadedFile = useSelector(
    (state) => state.offHourMessageTemplateType.offHourUploadedFile
  ); // New uploaded file
  const { offHourAudioUrl, offHourAudioBodyFields } = useSelector(
    (state) => state.offHourMessageTemplateType
  ); // Access audio data from the template slice
  const { offHourVideoUrl, offHourVideoBodyFields } = useSelector(
    (state) => state.offHourMessageTemplateType
  ); // Access video data from Redux
  const { offHourImageUrl, offHourImageBodyFields } = useSelector(
    (state) => state.offHourMessageTemplateType
  ); // Access video data from Redux

  

  const [offHourMessageDrawer, setOffHourMessageDrawer] = useState(false);
  const [offHourMessageType, setOffHourMessageType] = useState('pre');

  ;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const replacePlaceholders = (template, fields) =>
    template.replace(/\{\{(\d+)\}\}/g, (match, number) => fields[number - 1] || match);

  console.log(offHourTemplateType);
  const dispatch = useDispatch();
  return (
    <Box>
      <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />
      <CardHeader
        title={
          <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
            Off Hours Message
          </Typography>
        }
      />
      <Box sx={{ px: 3, py: 2 }}>
        <Tooltip
          title="Click here to Configure automated reply for user's first query during off hours."
          arrow
          placement="top"
        >
          <FormControlLabel
            control={<Switch id="toggle-taxes" />}
            label="Configure automated reply for user's first query during off hours."
          />
        </Tooltip>
      </Box>

      <Box sx={{ px: 3 }}>
        <Box sx={{ width: '380px' }}>
          <Tooltip title="Opt-Out response preview" arrow placement="top">
            <Box sx={{ width: '380px' }}>
              {offHourMessageType === 'regular' && (
                <Card sx={{ border: '1px solid #919EAB33', width: '100%', maxWidth: '500px' }}>
                  <CardHeader
                    avatar={<Avatar aria-label="profile picture">MC</Avatar>}
                    title="Mireya Conner"
                    subheader="Online"
                  />
                  <Divider />
                  <Typography
                    variant="caption"
                    sx={{ pr: 2, pt: 3, display: 'flex', justifyContent: 'end' }}
                  >
                    4:02 PM
                  </Typography>
                  <Box sx={{ p: 2, backgroundColor: '#CCF4FE', borderRadius: '8px', m: 2 }}>
                    {messageType === 'video' && (
                      <VideoType videoSrc="../../../public/assets/videos/chat-videos/advertisement.mp4" />
                    )}
                    {messageType === 'audio' && (
                      <AudioType audioSrc="../../../public/assets/audios/new-instrumental.mp3" />
                    )}
                    {messageType === 'file' && <FileType />}

                    <Box sx={{ mb: 2 }}>
                      {chatBoxImage && (
                        <img
                          src={chatBoxImage}
                          alt="Chat Preview"
                          style={{ width: '100%', borderRadius: '8px' }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ fontSize: 14, fontWeight: '500' }}
                    >
                      {messageContent}
                    </Typography>
                  </Box>
                </Card>
              )}
              {offHourTemplateType === 'text' &&
                offHourMessageType === 'pre' &&
                offHourTemplateFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <PreviewTemplateChatBox
                      coverSrc="/assets/images/templateImage/template-image1.jpg"
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(` Hi {{1}}! 🎧🛒`, offHourTemplateFields)}
                          </span>
                          <br /> <br />
                          {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(` Product: {{2}}`, offHourTemplateFields)}
                          <br />
                          {replacePlaceholders(`Quantity: {{3}}`, offHourTemplateFields)}
                          <br />
                          {replacePlaceholders(`Order ID: {{4}}`, offHourTemplateFields)}
                          <br />
                          {replacePlaceholders(`Delivery Address: {{5}}`, offHourTemplateFields)}
                          <br />
                          {replacePlaceholders(
                            `Estimated Delivery Date: {{6}}`,
                            offHourTemplateFields
                          )}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {offHourTemplateType === 'file' &&
                offHourMessageType === 'pre' &&
                offHourFileTemplateFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <FilePreviewTemplateChatBox
                      coverSrc={offHourUploadedFile || FileImage} // Show the uploaded file or a default image
                      showImage
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(` Hi {{1}}! 🎧🛒`, offHourFileTemplateFields)}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(` Product: {{2}}`, offHourFileTemplateFields)}
                          <br />
                          {replacePlaceholders(`Quantity: {{3}}`, offHourFileTemplateFields)}
                          <br />
                          {replacePlaceholders(`Order ID: {{4}}`, offHourFileTemplateFields)}
                          <br />
                          {replacePlaceholders(`Delivery Address: {{5}}`, offHourFileTemplateFields)}
                          <br />
                          {replacePlaceholders(
                            `Estimated Delivery Date: {{6}}`,
                            offHourFileTemplateFields
                          )}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {offHourTemplateType === 'audio' &&
                offHourMessageType === 'pre' &&
                offHourAudioBodyFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <AudioTemplateChatBox
                      audioSrc={offHourAudioUrl}
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {`Hi ${offHourAudioBodyFields[0]}! 🎧🛒`}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {`Product: ${offHourAudioBodyFields[1]}`}
                          <br />
                          {`Quantity: ${offHourAudioBodyFields[2]}`}
                          <br />
                          {`Order ID: ${offHourAudioBodyFields[3]}`}
                          <br />
                          {`Delivery Address: ${offHourAudioBodyFields[4]}`}
                          <br />
                          {`Estimated Delivery Date: ${offHourAudioBodyFields[5]}`}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {offHourTemplateType === 'video' &&
                offHourMessageType === 'pre' &&
                offHourVideoBodyFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <VideoTemplateChatBox
                      coverSrc={video}
                      showImage={!offHourVideoUrl}
                      videoSrc={offHourVideoUrl} // Pass the video URL from Redux state
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(` Hi {{1}}! 🎧🛒`, offHourVideoBodyFields)}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(` Product: {{2}}`, offHourVideoBodyFields)}
                          <br />
                          {replacePlaceholders(`Quantity: {{3}}`, offHourVideoBodyFields)}
                          <br />
                          {replacePlaceholders(`Order ID: {{4}}`, offHourVideoBodyFields)}
                          <br />
                          {replacePlaceholders(`Delivery Address: {{5}}`, offHourVideoBodyFields)}
                          <br />
                          {replacePlaceholders(
                            `Estimated Delivery Date: {{6}}`,
                            offHourVideoBodyFields
                          )}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {offHourTemplateType === 'image' &&
                offHourMessageType === 'pre' &&
                offHourImageBodyFields && (
                  <ImagePreviewTemplateChatBox
                    showImage={FileImage}
                    coverSrc={offHourImageUrl || FileImage} // Pass the video URL from Redux state
                    text={
                      <>
                        <span style={{ fontWeight: '600' }}>
                          {replacePlaceholders(` Hi {{1}}! 🎧🛒`, offHourImageBodyFields)}
                        </span>
                        <br /> <br />
                        {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                        <br /> <br />
                        {` Order Details:`}
                        <br />
                        {replacePlaceholders(` Product: {{2}}`, offHourImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Quantity: {{3}}`, offHourImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Order ID: {{4}}`, offHourImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Delivery Address: {{5}}`, offHourImageBodyFields)}
                        <br />
                        {replacePlaceholders(
                          `Estimated Delivery Date: {{6}}`,
                          offHourImageBodyFields
                        )}
                      </>
                    }
                    showLinks
                    showVisit
                    showCall
                  />
                )}
            </Box>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ px: 3, pb: 3 }}>
        <Tooltip title="Configure Opt-Out response" arrow placement="top">
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => {
              dispatch(wellComeSetChosen('offHour'));
              setOffHourMessageDrawer(true);
            }}
          >
            Configure
          </Button>
        </Tooltip>
      </Box>

      <OffHourMessageDrawer
        open={offHourMessageDrawer}
        onClose={() => setOffHourMessageDrawer(false)}
        setMessageType={setOffHourMessageType}
        messageType={setOffHourMessageType}
      />
    </Box>
  );
}
