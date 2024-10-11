import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  optOutTemplateType: "", // This will hold the fields entered in TextTemplateTypeDialog
  optOutTemplateFields: [], // This will hold the fields entered in TextTemplateTypeDialog
  optOutFileTemplateFields: [], // This will hold the fields entered in FileTemplateTypeDialog
  optOutUploadedFile: null, // This will hold the uploaded file for file template
  optOutAudioUrl: null, // This will hold the uploaded audio file URL
  optOutAudioBodyFields: [], // This will hold the fields entered in AudioTemplateTypeDialog
  optOutAudioFileName: '', // This will store the name of the audio file
  optOutVideoUrl: null, // This will hold the video file URL
  optOutVideoBodyFields: [], // This will hold the fields entered in VideoTemplateTypeDialog
  optOutVideoFileName: '', // This will store the name of the video file
  optOutImageUrl: null, // Image URL for image template
  optOutImageBodyFields: [], // Image template fields
  optOutImageFileName: '', // Image file name
};

const optOutMessageTemplateType = createSlice({
  name: 'optOutMessageTemplateType',
  initialState,
  reducers: {
    optOutSetTemplateType: (state, action) => {
      state.optOutTemplateType = action.payload;
    },
    optOutSetTemplateFields: (state, action) => {
      state.optOutTemplateFields = action.payload;
    },
    optOutClearTemplateFields: (state) => {
      state.optOutTemplateFields = [];
    },
    // File template related actions
    optOutSetFileTemplateFields: (state, action) => {
      state.optOutFileTemplateFields = action.payload;
    },
    optOutClearFileTemplateFields: (state) => {
      state.optOutFileTemplateFields = [];
    },
    optOutSetUploadedFile: (state, action) => {
      state.optOutUploadedFile = action.payload;
    },
    optOutClearUploadedFile: (state) => {
      state.optOutUploadedFile = null;
    },
    // Audio template related actions
    optOutSetAudioData: (state, action) => {
      state.optOutAudioUrl = action.payload.audioUrl;
      state.optOutAudioBodyFields = action.payload.bodyFields;
      state.optOutAudioFileName = action.payload.fileName;
    },
    optOutClearAudioData: (state) => {
      state.optOutAudioUrl = null;
      state.optOutAudioBodyFields = [];
      state.optOutAudioFileName = '';
    },
    // Video template related actions
    optOutSetVideoData: (state, action) => {
      state.optOutVideoUrl = action.payload.videoUrl;
      state.optOutVideoBodyFields = action.payload.bodyFields;
      state.optOutVideoFileName = action.payload.fileName;
    },
    optOutClearVideoData: (state) => {
      state.optOutVideoUrl = null;
      state.optOutVideoBodyFields = [];
      state.optOutVideoFileName = '';
    },
    // Image template related actions
    optOutSetImageData: (state, action) => {
      state.optOutImageUrl = action.payload.imageUrl;
      state.optOutImageBodyFields = action.payload.bodyFields;
      state.imageFileName = action.payload.fileName;
    },
    optOutClearImageData: (state) => {
      state.optOutImageUrl = null;
      state.optOutImageBodyFields = [];
      state.imageFileName = '';
    },
  },
});

export const {
  optOutSetTemplateFields,
  optOutClearTemplateFields,
  optOutSetFileTemplateFields,
  optOutClearFileTemplateFields,
  optOutSetUploadedFile,
  optOutClearUploadedFile,
  optOutSetAudioData,
  optOutSetVideoData,
  optOutClearVideoData,
  optOutSetImageData,
  optOutClearImageData,
  optOutSetTemplateType
} = optOutMessageTemplateType.actions;

export default optOutMessageTemplateType.reducer;

