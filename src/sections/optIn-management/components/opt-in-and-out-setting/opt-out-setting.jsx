import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Card,
  Chip,
  Stack,
  Avatar,
  Button,
  Switch,
  Divider,
  Tooltip,
  TextField,
  CardHeader,
  Typography,
  FormControlLabel,
} from '@mui/material';

import { setChosen } from 'src/redux/slices/optInMessageTemplateTypeSlice';

import PreviewTemplateChatBox from 'src/sections/preview-template/chat-box';
import AudioTemplateChatBox from 'src/sections/preview-template/audio-chatbox';
import VideoTemplateChatBox from 'src/sections/preview-template/video-chatbox';
import { OptOutDrawer } from 'src/sections/optIn-management/hook/opt-out-drawer';
import FilePreviewTemplateChatBox from 'src/sections/preview-template/file-chatbox';
import ImagePreviewTemplateChatBox from 'src/sections/preview-template/image-chatbox';

import FileType from '../../hook/messages-type/file';
import VideoType from '../../hook/messages-type/video';
import AudioType from '../../hook/messages-type/audio';
import video from '../../../../../public/assets/images/chatImage/video.png';
import FileImage from '../../../../../public/assets/images/chatImage/imagechat.png';

// ----------------------------------------------------------------------

export default function OptOutSetting() {
  const { messageType, messageContent, chatBoxImage } = useSelector((state) => state.optOutMessage);
  const optOutTemplateType = useSelector((state) => state.optOutMessageTemplateType.optOutTemplateType); // Access the saved template fields
  const optOutTemplateFields = useSelector((state) => state.optOutMessageTemplateType.optOutTemplateFields); // Access the saved template fields
  const optOutFileTemplateFields = useSelector((state) => state.optOutMessageTemplateType.optOutFileTemplateFields); // New file template fields
  const optOutUploadedFile = useSelector((state) => state.optOutMessageTemplateType.optOutUploadedFile); // New uploaded file
  const { optOutAudioUrl, optOutAudioBodyFields } = useSelector((state) => state.optOutMessageTemplateType); // Access audio data from the template slice
  const { optOutVideoUrl, optOutVideoBodyFields } = useSelector((state) => state.optOutMessageTemplateType); // Access video data from Redux
  const { optOutImageUrl, optOutImageBodyFields } = useSelector((state) => state.optOutMessageTemplateType); // Access video data from Redux

  // const optOutImageTemplateData = useSelector((state) => state.optOutMessageTemplateType.optOutImageUrl);
  // const optOutImageBodyFields = useSelector((state) => state.optOutMessageTemplateType.optOutImageBodyFields);

  const [optOutDrawer, setOptOutDrawer] = useState(false);
  const [optOutMessageType, setOptOutMessageType] = useState('pre');
  const [tags, setTags] = useState(['Purchase', 'Pabbly Connect', 'Pabbly Subscription Billing']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const replacePlaceholders = (template, fields) =>
    template.replace(/\{\{(\d+)\}\}/g, (match, number) => fields[number - 1] || match);

  console.log(optOutTemplateType);
  const dispatch = useDispatch();
  return (
    <Box>
      <Card>
        <CardHeader title="Opt-Out Settings" sx={{ mb: 3 }} />
        <Divider />
        <Stack sx={{ padding: '32px 24px' }}>
          <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
            Opt-Out Keywords:
          </Typography>
          <Tooltip title="Opt-Out keywords" arrow placement="top">
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={tags}
              onChange={(event, newValue) => setTags(newValue)}
              inputValue={tagInput}
              onInputChange={(event, newInputValue) => setTagInput(newInputValue)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && tagInput.trim()) {
                  handleAddTag();
                  event.preventDefault();
                }
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={index}
                    variant="soft"
                    color="info"
                    size="small"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="large"
                  helperText="Enter opt-out keywords"
                  placeholder="+ Add a tag"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <InputAdornment position="Start" />,
                  }}
                  sx={{
                    '& .MuiAutocomplete-inputRoot': {
                      minHeight: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                    },
                  }}
                />
              )}
            />
          </Tooltip>
        </Stack>
        <Divider sx={{ mx: 3, borderStyle: 'dashed' }} />
        <CardHeader
          title={
            <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600' }}>
              Opt-Out Response
            </Typography>
          }
        />
        <Box sx={{ px: 3, py: 2 }}>
          <Tooltip
            title="Click here to Enable/Disable Setup a response message for opt-out user keywords"
            arrow
            placement="top"
          >
            <FormControlLabel
              control={<Switch />}
              label="Setup a response message for opt-out user keywords"
            />
          </Tooltip>
        </Box>

        <Box sx={{ px: 3 }}>
          <Box sx={{ width: '380px' }}>
            <Tooltip title="Opt-Out response preview" arrow placement="top">
              <Box sx={{ width: '380px' }}>
                {optOutMessageType === 'regular' && (
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
                {optOutTemplateType === 'text' &&
                  optOutMessageType === 'pre' &&
                  optOutTemplateFields.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <PreviewTemplateChatBox
                        coverSrc="/assets/images/templateImage/template-image1.jpg"
                        text={
                          <>
                            <span style={{ fontWeight: '600' }}>
                              {replacePlaceholders(` Hi {{1}}! 🎧🛒`, optOutTemplateFields)}
                            </span>
                            <br /> <br />
                            {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                            <br /> <br />
                            {` Order Details:`}
                            <br />
                            {replacePlaceholders(` Product: {{2}}`, optOutTemplateFields)}
                            <br />
                            {replacePlaceholders(`Quantity: {{3}}`, optOutTemplateFields)}
                            <br />
                            {replacePlaceholders(`Order ID: {{4}}`, optOutTemplateFields)}
                            <br />
                            {replacePlaceholders(`Delivery Address: {{5}}`, optOutTemplateFields)}
                            <br />
                            {replacePlaceholders(`Estimated Delivery Date: {{6}}`, optOutTemplateFields)}
                          </>
                        }
                        showLinks
                        showVisit
                        showCall
                      />
                    </Box>
                  )}

                {optOutTemplateType === 'file' &&
                  optOutMessageType === 'pre' &&
                  optOutFileTemplateFields.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <FilePreviewTemplateChatBox
                        coverSrc={optOutUploadedFile || FileImage} // Show the uploaded file or a default image
                        showImage
                        text={
                          <>
                            <span style={{ fontWeight: '600' }}>
                              {replacePlaceholders(` Hi {{1}}! 🎧🛒`, optOutFileTemplateFields)}
                            </span>
                            <br /> <br />
                            {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                            <br /> <br />
                            {` Order Details:`}
                            <br />
                            {replacePlaceholders(` Product: {{2}}`, optOutFileTemplateFields)}
                            <br />
                            {replacePlaceholders(`Quantity: {{3}}`, optOutFileTemplateFields)}
                            <br />
                            {replacePlaceholders(`Order ID: {{4}}`, optOutFileTemplateFields)}
                            <br />
                            {replacePlaceholders(`Delivery Address: {{5}}`, optOutFileTemplateFields)}
                            <br />
                            {replacePlaceholders(
                              `Estimated Delivery Date: {{6}}`,
                              optOutFileTemplateFields
                            )}
                          </>
                        }
                        showLinks
                        showVisit
                        showCall
                      />
                    </Box>
                  )}

                {optOutTemplateType === 'audio' &&
                  optOutMessageType === 'pre' &&
                  optOutAudioBodyFields.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <AudioTemplateChatBox
                        audioSrc={optOutAudioUrl}
                        text={
                          <>
                            <span style={{ fontWeight: '600' }}>
                              {`Hi ${optOutAudioBodyFields[0]}! 🎧🛒`}
                            </span>
                            <br /> <br />
                            {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                            <br /> <br />
                            {` Order Details:`}
                            <br />
                            {`Product: ${optOutAudioBodyFields[1]}`}
                            <br />
                            {`Quantity: ${optOutAudioBodyFields[2]}`}
                            <br />
                            {`Order ID: ${optOutAudioBodyFields[3]}`}
                            <br />
                            {`Delivery Address: ${optOutAudioBodyFields[4]}`}
                            <br />
                            {`Estimated Delivery Date: ${optOutAudioBodyFields[5]}`}
                          </>
                        }
                        showLinks
                        showVisit
                        showCall
                      />
                    </Box>
                  )}

                {optOutTemplateType === 'video' &&
                  optOutMessageType === 'pre' &&
                  optOutVideoBodyFields.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <VideoTemplateChatBox
                        coverSrc={video}
                        showImage={!optOutVideoUrl}
                        videoSrc={optOutVideoUrl} // Pass the video URL from Redux state
                        text={
                          <>
                            <span style={{ fontWeight: '600' }}>
                              {replacePlaceholders(` Hi {{1}}! 🎧🛒`, optOutVideoBodyFields)}
                            </span>
                            <br /> <br />
                            {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                            <br /> <br />
                            {` Order Details:`}
                            <br />
                            {replacePlaceholders(` Product: {{2}}`, optOutVideoBodyFields)}
                            <br />
                            {replacePlaceholders(`Quantity: {{3}}`, optOutVideoBodyFields)}
                            <br />
                            {replacePlaceholders(`Order ID: {{4}}`, optOutVideoBodyFields)}
                            <br />
                            {replacePlaceholders(`Delivery Address: {{5}}`, optOutVideoBodyFields)}
                            <br />
                            {replacePlaceholders(`Estimated Delivery Date: {{6}}`, optOutVideoBodyFields)}
                          </>
                        }
                        showLinks
                        showVisit
                        showCall
                      />
                    </Box>
                  )}

                {optOutTemplateType === 'image' && optOutMessageType === 'pre' && optOutImageBodyFields && (
                  <ImagePreviewTemplateChatBox
                  showImage={FileImage}
                  coverSrc={optOutImageUrl ||FileImage } // Pass the video URL from Redux state
                    text={
                      <>
                        <span style={{ fontWeight: '600' }}>
                          {replacePlaceholders(` Hi {{1}}! 🎧🛒`, optOutImageBodyFields)}
                        </span>
                        <br /> <br />
                        {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                        <br /> <br />
                        {` Order Details:`}
                        <br />
                        {replacePlaceholders(` Product: {{2}}`, optOutImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Quantity: {{3}}`, optOutImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Order ID: {{4}}`, optOutImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Delivery Address: {{5}}`, optOutImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Estimated Delivery Date: {{6}}`, optOutImageBodyFields)}
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
                dispatch(setChosen('optOut'));
                setOptOutDrawer(true);
              }}
            >
              Configure
            </Button>
          </Tooltip>
        </Box>

        <OptOutDrawer
          open={optOutDrawer}
          onClose={() => setOptOutDrawer(false)}
          setMessageType={setOptOutMessageType}
          messageType={optOutMessageType}
        />
      </Card>
    </Box>
  );
}
