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

import { WellComeMessageDrawer } from '../../hook/wellcome-message-drawer';
import video from '../../../../../public/assets/images/chatImage/video.png';
import FileImage from '../../../../../public/assets/images/chatImage/imagechat.png';

// ----------------------------------------------------------------------

export default function WellComeMessage() {
  const { messageType, messageContent, chatBoxImage } = useSelector(
    (state) => state.wellComeMessageRegularMessage
  );

  const wellComeTemplateType = useSelector(
    (state) => state.wellComeMessageTemplateType.wellComeTemplateType
  ); // Access the saved template fields

  const wellComeTemplateFields = useSelector(
    (state) => state.wellComeMessageTemplateType.wellComeTemplateFields
  ); // Access the saved template fields

  const wellComeFileTemplateFields = useSelector(
    (state) => state.wellComeMessageTemplateType.wellComeFileTemplateFields
  ); // New file template fields

  const wellComeUploadedFile = useSelector(
    (state) => state.wellComeMessageTemplateType.wellComeUploadedFile
  ); // New uploaded file

  const { wellComeAudioUrl, wellComeAudioBodyFields } = useSelector(
    (state) => state.wellComeMessageTemplateType
  ); // Access audio data from the template slice

  const { wellComeVideoUrl, wellComeVideoBodyFields } = useSelector(
    (state) => state.wellComeMessageTemplateType
  ); // Access video data from Redux

  const { wellComeImageUrl, wellComeImageBodyFields } = useSelector(
    (state) => state.wellComeMessageTemplateType
  ); // Access video data from Redux

  const [wellComeMessageDrawer, setWellComeMessageDrawer] = useState(false);
  const [wellComeMessageType, setWellComeMessageType] = useState('pre');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const replacePlaceholders = (template, fields) =>
    template.replace(/\{\{(\d+)\}\}/g, (match, number) => fields[number - 1] || match);

  console.log(wellComeTemplateType);
  const dispatch = useDispatch();
  return (
    <Box>
      <CardHeader
        title={
          <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
            Welcome Message
          </Typography>
        }
      />
      <Box sx={{ px: 3, py: 2 }}>
        <Tooltip
          title="Click here to Enable/Disabled configure automated reply for user's first query during working hours"
          arrow
          placement="top"
        >
          <FormControlLabel
            control={<Switch id="toggle-taxes" />}
            label="Configure automated reply for user's first query during working hours."
          />
        </Tooltip>
      </Box>

      <Box sx={{ px: 3 }}>
        <Box sx={{ width: '380px' }}>
          <Tooltip title="Opt-Out response preview" arrow placement="top">
            <Box sx={{ width: '380px' }}>
              {wellComeMessageType === 'regular' && (
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
              {wellComeTemplateType === 'text' &&
                wellComeMessageType === 'pre' &&
                wellComeTemplateFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <PreviewTemplateChatBox
                      coverSrc="/assets/images/templateImage/template-image1.jpg"
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(`Hi {{1}}! 🎧🛒`, wellComeTemplateFields)}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(`Product: {{2}}`, wellComeTemplateFields)}
                          <br />
                          {replacePlaceholders(`Quantity: {{3}}`, wellComeTemplateFields)}
                          <br />
                          {replacePlaceholders(`Order ID: {{4}}`, wellComeTemplateFields)}
                          <br />
                          {replacePlaceholders(`Delivery Address: {{5}}`, wellComeTemplateFields)}
                          <br />
                          {replacePlaceholders(
                            `Estimated Delivery Date: {{6}}`,
                            wellComeTemplateFields
                          )}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {wellComeTemplateType === 'file' &&
                wellComeMessageType === 'pre' &&
                wellComeFileTemplateFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <FilePreviewTemplateChatBox
                      coverSrc={wellComeUploadedFile || FileImage} // Show the uploaded file or a default image
                      showImage
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(` Hi {{1}}! 🎧🛒`, wellComeFileTemplateFields)}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(` Product: {{2}}`, wellComeFileTemplateFields)}
                          <br />
                          {replacePlaceholders(`Quantity: {{3}}`, wellComeFileTemplateFields)}
                          <br />
                          {replacePlaceholders(`Order ID: {{4}}`, wellComeFileTemplateFields)}
                          <br />
                          {replacePlaceholders(
                            `Delivery Address: {{5}}`,
                            wellComeFileTemplateFields
                          )}
                          <br />
                          {replacePlaceholders(
                            `Estimated Delivery Date: {{6}}`,
                            wellComeFileTemplateFields
                          )}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {wellComeTemplateType === 'audio' &&
                wellComeMessageType === 'pre' &&
                wellComeAudioBodyFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <AudioTemplateChatBox
                      audioSrc={wellComeAudioUrl}
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {`Hi ${wellComeAudioBodyFields[0]}! 🎧🛒`}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {`Product: ${wellComeAudioBodyFields[1]}`}
                          <br />
                          {`Quantity: ${wellComeAudioBodyFields[2]}`}
                          <br />
                          {`Order ID: ${wellComeAudioBodyFields[3]}`}
                          <br />
                          {`Delivery Address: ${wellComeAudioBodyFields[4]}`}
                          <br />
                          {`Estimated Delivery Date: ${wellComeAudioBodyFields[5]}`}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {wellComeTemplateType === 'video' &&
                wellComeMessageType === 'pre' &&
                wellComeVideoBodyFields.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <VideoTemplateChatBox
                      coverSrc={video}
                      showImage={!wellComeVideoUrl}
                      videoSrc={wellComeVideoUrl} // Pass the video URL from Redux state
                      text={
                        <>
                          <span style={{ fontWeight: '600' }}>
                            {replacePlaceholders(` Hi {{1}}! 🎧🛒`, wellComeVideoBodyFields)}
                          </span>
                          <br /> <br />
                          {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                          <br /> <br />
                          {` Order Details:`}
                          <br />
                          {replacePlaceholders(` Product: {{2}}`, wellComeVideoBodyFields)}
                          <br />
                          {replacePlaceholders(`Quantity: {{3}}`, wellComeVideoBodyFields)}
                          <br />
                          {replacePlaceholders(`Order ID: {{4}}`, wellComeVideoBodyFields)}
                          <br />
                          {replacePlaceholders(`Delivery Address: {{5}}`, wellComeVideoBodyFields)}
                          <br />
                          {replacePlaceholders(
                            `Estimated Delivery Date: {{6}}`,
                            wellComeVideoBodyFields
                          )}
                        </>
                      }
                      showLinks
                      showVisit
                      showCall
                    />
                  </Box>
                )}

              {wellComeTemplateType === 'image' &&
                wellComeMessageType === 'pre' &&
                wellComeImageBodyFields && (
                  <ImagePreviewTemplateChatBox
                    // coverSrc={isFileUploaded ? URL.createObjectURL(file) : Image}
                    showImage={FileImage}
                    coverSrc={wellComeImageUrl || FileImage} // Pass the video URL from Redux state
                    text={
                      <>
                        <span style={{ fontWeight: '600' }}>
                          {replacePlaceholders(` Hi {{1}}! 🎧🛒`, wellComeImageBodyFields)}
                        </span>
                        <br /> <br />
                        {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                        <br /> <br />
                        {` Order Details:`}
                        <br />
                        {replacePlaceholders(` Product: {{2}}`, wellComeImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Quantity: {{3}}`, wellComeImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Order ID: {{4}}`, wellComeImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Delivery Address: {{5}}`, wellComeImageBodyFields)}
                        <br />
                        {replacePlaceholders(
                          `Estimated Delivery Date: {{6}}`,
                          wellComeImageBodyFields
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
        <Tooltip title="Configure wellcome message response" arrow placement="top">
          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => {
              dispatch(wellComeSetChosen('wellCome'));
              setWellComeMessageDrawer(true);
            }}
          >
            Configure
          </Button>
        </Tooltip>
      </Box>

      <WellComeMessageDrawer
        open={wellComeMessageDrawer}
        onClose={() => setWellComeMessageDrawer(false)}
        setMessageType={setWellComeMessageType}
        messageType={wellComeMessageType}
      />
    </Box>
  );
}
