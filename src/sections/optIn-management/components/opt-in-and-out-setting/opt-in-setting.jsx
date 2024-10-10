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
import { OptInDrawer } from 'src/sections/optIn-management/hook/opt-in-drawer';
import AudioTemplateChatBox from 'src/sections/preview-template/audio-chatbox';
import VideoTemplateChatBox from 'src/sections/preview-template/video-chatbox';
import FilePreviewTemplateChatBox from 'src/sections/preview-template/file-chatbox';
import ImagePreviewTemplateChatBox from 'src/sections/preview-template/image-chatbox';

import FileType from '../../hook/messages-type/file';
import VideoType from '../../hook/messages-type/video';
import AudioType from '../../hook/messages-type/audio';
import video from '../../../../../public/assets/images/chatImage/video.png';
import FileImage from '../../../../../public/assets/images/chatImage/imagechat.png';

// ----------------------------------------------------------------------

export default function OptInSetting() {
  const { messageType, messageContent, chatBoxImage } = useSelector((state) => state.optInMessage);
  const optInTemplateType = useSelector((state) => state.optInMessageTemplateType.optInTemplateType); // Access the saved template fields
  const optInTemplateFields = useSelector((state) => state.optInMessageTemplateType.optInTemplateFields); // Access the saved template fields
  const optInFileTemplateFields = useSelector((state) => state.optInMessageTemplateType.optInFileTemplateFields); // New file template fields
  const optInUploadedFile = useSelector((state) => state.optInMessageTemplateType.optInUploadedFile); // New uploaded file
  const { optInAudioUrl, optInAudioBodyFields } = useSelector((state) => state.optInMessageTemplateType); // Access audio data from the template slice
  const { optInVideoUrl, optInVideoBodyFields } = useSelector((state) => state.optInMessageTemplateType); // Access video data from Redux
  const { optInImageUrl, optInImageBodyFields } = useSelector((state) => state.optInMessageTemplateType); // Access video data from Redux
  


  // const optInImageTemplateData = useSelector((state) => state.optInMessageTemplateType.optInImageUrl);
  // const optInImageBodyFields = useSelector((state) => state.optInMessageTemplateType.optInImageBodyFields);

  const [optInDrawer, setOptInDrawer] = useState(false);
  const [optInMessageType, setOptInMessageType] = useState('pre');
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

  console.log(optInTemplateType);
  const dispatch=useDispatch();
  return (
    <Box>
      <Card>
        <CardHeader title="Opt-In Settings" sx={{ mb: 3 }} />
        <Divider />
        <Stack sx={{ padding: '32px 24px' }}>
          <Typography variant="h7" sx={{ fontSize: '14px', fontWeight: '600', mb: '10px' }}>
            Opt-In Keywords:
          </Typography>
          <Tooltip title="Opt-In keywords" arrow placement="top">
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
                  helperText="Enter opt-in keywords"
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
              Opt-In Response
            </Typography>
          }
        />
        <Box sx={{ px: 3, py: 2 }}>
          <Tooltip
            title="Click here to Enable/Disable Setup a response message for opt-in user keywords"
            arrow
            placement="top"
          >
            <FormControlLabel
              control={<Switch />}
              label="Setup a response message for opt-in user keywords"
            />
          </Tooltip>
        </Box>

        <Box sx={{ px: 3 }}>
          <Box sx={{ width: '380px' }}>
            <Tooltip title="Opt-Out response preview" arrow placement="top">
              <Box sx={{ width: '380px' }}>
                {optInMessageType === 'regular' && (
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
                {optInTemplateType === 'text' &&
                  optInMessageType === 'pre' &&
                  optInTemplateFields.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <PreviewTemplateChatBox
                        coverSrc="/assets/images/templateImage/template-image1.jpg"
                        text={
                          <>
                            <span style={{ fontWeight: '600' }}>
                              {replacePlaceholders(` Hi {{1}}! 🎧🛒`, optInTemplateFields)}
                            </span>
                            <br /> <br />
                            {`  Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                            <br /> <br />
                            {` Order Details:`}
                            <br />
                            {replacePlaceholders(` Product: {{2}}`, optInTemplateFields)}
                            <br />
                            {replacePlaceholders(`Quantity: {{3}}`, optInTemplateFields)}
                            <br />
                            {replacePlaceholders(`Order ID: {{4}}`, optInTemplateFields)}
                            <br />
                            {replacePlaceholders(`Delivery Address: {{5}}`, optInTemplateFields)}
                            <br />
                            {replacePlaceholders(`Estimated Delivery Date: {{6}}`, optInTemplateFields)}
                          </>
                        }
                        showLinks
                        showVisit
                        showCall
                      />
                    </Box>
                  )}

                {optInTemplateType === 'file' &&
                  optInMessageType === 'pre' &&
                  optInFileTemplateFields.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <FilePreviewTemplateChatBox
                        coverSrc={optInUploadedFile || FileImage} // Show the uploaded file or a default image
                        showImage
                        text={
                          <>
                            <span style={{ fontWeight: '600' }}>
                              {replacePlaceholders(` Hi {{1}}! 🎧🛒`, optInFileTemplateFields)}
                            </span>
                            <br /> <br />
                            {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                            <br /> <br />
                            {` Order Details:`}
                            <br />
                            {replacePlaceholders(` Product: {{2}}`, optInFileTemplateFields)}
                            <br />
                            {replacePlaceholders(`Quantity: {{3}}`, optInFileTemplateFields)}
                            <br />
                            {replacePlaceholders(`Order ID: {{4}}`, optInFileTemplateFields)}
                            <br />
                            {replacePlaceholders(`Delivery Address: {{5}}`, optInFileTemplateFields)}
                            <br />
                            {replacePlaceholders(
                              `Estimated Delivery Date: {{6}}`,
                              optInFileTemplateFields
                            )}
                          </>
                        }
                        showLinks
                        showVisit
                        showCall
                      />
                    </Box>
                  )}

                {optInTemplateType === 'audio' &&
                  optInMessageType === 'pre' &&
                  optInAudioBodyFields.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <AudioTemplateChatBox
                        audioSrc={optInAudioUrl}
                        text={
                          <>
                            <span style={{ fontWeight: '600' }}>
                              {`Hi ${optInAudioBodyFields[0]}! 🎧🛒`}
                            </span>
                            <br /> <br />
                            {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                            <br /> <br />
                            {` Order Details:`}
                            <br />
                            {`Product: ${optInAudioBodyFields[1]}`}
                            <br />
                            {`Quantity: ${optInAudioBodyFields[2]}`}
                            <br />
                            {`Order ID: ${optInAudioBodyFields[3]}`}
                            <br />
                            {`Delivery Address: ${optInAudioBodyFields[4]}`}
                            <br />
                            {`Estimated Delivery Date: ${optInAudioBodyFields[5]}`}
                          </>
                        }
                        showLinks
                        showVisit
                        showCall
                      />
                    </Box>
                  )}

                {optInTemplateType === 'video' &&
                  optInMessageType === 'pre' &&
                  optInVideoBodyFields.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <VideoTemplateChatBox
                        coverSrc={video}
                        showImage={!optInVideoUrl}
                        videoSrc={optInVideoUrl} // Pass the video URL from Redux state
                        text={
                          <>
                            <span style={{ fontWeight: '600' }}>
                              {replacePlaceholders(` Hi {{1}}! 🎧🛒`, optInVideoBodyFields)}
                            </span>
                            <br /> <br />
                            {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                            <br /> <br />
                            {` Order Details:`}
                            <br />
                            {replacePlaceholders(` Product: {{2}}`, optInVideoBodyFields)}
                            <br />
                            {replacePlaceholders(`Quantity: {{3}}`, optInVideoBodyFields)}
                            <br />
                            {replacePlaceholders(`Order ID: {{4}}`, optInVideoBodyFields)}
                            <br />
                            {replacePlaceholders(`Delivery Address: {{5}}`, optInVideoBodyFields)}
                            <br />
                            {replacePlaceholders(`Estimated Delivery Date: {{6}}`, optInVideoBodyFields)}
                          </>
                        }
                        showLinks
                        showVisit
                        showCall
                      />
                    </Box>
                  )}

                {optInTemplateType === 'image' && optInMessageType === 'pre' && optInImageBodyFields && (
                  <ImagePreviewTemplateChatBox
                    // coverSrc={isFileUploaded ? URL.createObjectURL(file) : Image}
                    showImage={FileImage}
                    coverSrc={optInImageUrl ||FileImage } // Pass the video URL from Redux state
                    text={
                      <>
                        <span style={{ fontWeight: '600' }}>
                          {replacePlaceholders(` Hi {{1}}! 🎧🛒`, optInImageBodyFields)}
                        </span>
                        <br /> <br />
                        {` Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌`}
                        <br /> <br />
                        {` Order Details:`}
                        <br />
                        {replacePlaceholders(` Product: {{2}}`, optInImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Quantity: {{3}}`,  optInImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Order ID: {{4}}`,  optInImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Delivery Address: {{5}}`,  optInImageBodyFields)}
                        <br />
                        {replacePlaceholders(`Estimated Delivery Date: {{6}}`,  optInImageBodyFields)}
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
          <Tooltip title="Configure Opt-In response" arrow placement="top">
            <Button
              sx={{ mt: 3 }}
              variant="contained"
              onClick={() => {
                dispatch(setChosen('optIn'));
                setOptInDrawer(true);
              }}
            >
              Configure
            </Button>
          </Tooltip>
        </Box>

        <OptInDrawer
          open={optInDrawer}
          onClose={() => setOptInDrawer(false)}
          setMessageType={setOptInMessageType}
          messageType={optInMessageType}
        />
      </Card>
    </Box>
  );
}
