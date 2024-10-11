import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  offHourTemplateType: '', // This will hold the fields entered in TextTemplateTypeDialog
  offHourTemplateFields: [], // This will hold the fields entered in TextTemplateTypeDialog
  offHourFileTemplateFields: [], // This will hold the fields entered in FileTemplateTypeDialog
  offHourUploadedFile: null, // This will hold the uploaded file for file template
  offHourAudioUrl: null, // This will hold the uploaded audio file URL
  offHourAudioBodyFields: [], // This will hold the fields entered in AudioTemplateTypeDialog
  offHourAudioFileName: '', // This will store the name of the audio file
  offHourVideoUrl: null, // This will hold the video file URL
  offHourVideoBodyFields: [], // This will hold the fields entered in VideoTemplateTypeDialog
  offHourVideoFileName: '', // This will store the name of the video file
  offHourImageUrl: null, // Image URL for image template
  offHourImageBodyFields: [], // Image template fields
  offHourImageFileName: '', // Image file name
  chosen: '',
  imageUrl: '',
};

const offHourTemplateTypeSlice = createSlice({
  name: 'offHourMessageTemplateType',
  initialState,
  reducers: {
    offHourSetTemplateType: (state, action) => {
      state.offHourTemplateType = action.payload;
    },
    offHourSetTemplateFields: (state, action) => {
      state.offHourTemplateFields = action.payload;
    },
    offHourClearTemplateFields: (state) => {
      state.offHourTemplateFields = [];
    },
    // File template related actions
    offHourSetFileTemplateFields: (state, action) => {
      state.offHourFileTemplateFields = action.payload;
    },
    offHourClearFileTemplateFields: (state) => {
      state.offHourFileTemplateFields = [];
    },
    offHourSetUploadedFile: (state, action) => {
      state.offHourUploadedFile = action.payload;
    },
    offHourClearUploadedFile: (state) => {
      state.offHourUploadedFile = null;
    },
    // Audio template related actions
    offHourSetAudioData: (state, action) => {
      state.offHourAudioUrl = action.payload.audioUrl;
      state.offHourAudioBodyFields = action.payload.bodyFields;
      state.offHourAudioFileName = action.payload.fileName;
    },
    offHourClearAudioData: (state) => {
      state.offHourAudioUrl = null;
      state.offHourAudioBodyFields = [];
      state.offHourAudioFileName = '';
    },
    // Video template related actions
    offHourSetVideoData: (state, action) => {
      state.offHourVideoUrl = action.payload.videoUrl;
      state.offHourVideoBodyFields = action.payload.bodyFields;
      state.offHourVideoFileName = action.payload.fileName;
    },
    offHourClearVideoData: (state) => {
      state.offHourVideoUrl = null;
      state.offHourVideoBodyFields = [];
      state.offHourVideoFileName = '';
    },
    // Image template related actions
    offHourSetImageData: (state, action) => {
      state.offHourImageUrl = action.payload.imageUrl;
      state.offHourImageBodyFields = action.payload.bodyFields;
      state.imageFileName = action.payload.fileName;
    },
    offHourClearImageData: (state) => {
      state.offHourImageUrl = null;
      state.offHourImageBodyFields = [];
      state.imageFileName = '';
    },
    offHourSetChosen: (state, action) => {
      state.chosen = action.payload;
    },
    // setImageUrl:(state,action)=>{
    //   if()
    //   state.imageUrl=
    // }
  },
});

export const {
  offHourSetTemplateFields,
  offHourClearTemplateFields,
  offHourSetFileTemplateFields,
  offHourClearFileTemplateFields,
  offHourSetUploadedFile,
  offHourClearUploadedFile,
  offHourSetAudioData,
  offHourSetVideoData,
  offHourClearVideoData,
  offHourSetImageData,
  offHourClearImageData,
  offHourSetTemplateType,
  offHourSetChosen,
} = offHourTemplateTypeSlice.actions;

export default offHourTemplateTypeSlice.reducer;
