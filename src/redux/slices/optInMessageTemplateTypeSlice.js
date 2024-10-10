import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  optInTemplateType: "", // This will hold the fields entered in TextTemplateTypeDialog
  optInTemplateFields: [], // This will hold the fields entered in TextTemplateTypeDialog
  optInFileTemplateFields: [], // This will hold the fields entered in FileTemplateTypeDialog
  optInUploadedFile: null, // This will hold the uploaded file for file template
  optInAudioUrl: null, // This will hold the uploaded audio file URL
  optInAudioBodyFields: [], // This will hold the fields entered in AudioTemplateTypeDialog
  optInAudioFileName: '', // This will store the name of the audio file
  optInVideoUrl: null, // This will hold the video file URL
  optInVideoBodyFields: [], // This will hold the fields entered in VideoTemplateTypeDialog
  optInVideoFileName: '', // This will store the name of the video file
  optInImageUrl: null, // Image URL for image template
  optInImageBodyFields: [], // Image template fields
  optInImageFileName: '', // Image file name
  chosen:'',
  imageUrl:''
};

const optInMessageTemplateTypeSlice = createSlice({
  name: 'optInMessageTemplateType',
  initialState,
  reducers: {
    optInSetTemplateType: (state, action) => {
      state.optInTemplateType = action.payload;
    },
    optInSetTemplateFields: (state, action) => {
      state.optInTemplateFields = action.payload;
    },
    optInClearTemplateFields: (state) => {
      state.optInTemplateFields = [];
    },
    // File template related actions
    optInSetFileTemplateFields: (state, action) => {
      state.optInFileTemplateFields = action.payload;
    },
    optInClearFileTemplateFields: (state) => {
      state.optInFileTemplateFields = [];
    },
    optInSetUploadedFile: (state, action) => {
      state.optInUploadedFile = action.payload;
    },
    optInClearUploadedFile: (state) => {
      state.optInUploadedFile = null;
    },
    // Audio template related actions
    optInSetAudioData: (state, action) => {
      state.optInAudioUrl = action.payload.audioUrl;
      state.optInAudioBodyFields = action.payload.bodyFields;
      state.optInAudioFileName = action.payload.fileName;
    },
    optInClearAudioData: (state) => {
      state.optInAudioUrl = null;
      state.optInAudioBodyFields = [];
      state.optInAudioFileName = '';
    },
    // Video template related actions
    optInSetVideoData: (state, action) => {
      state.optInVideoUrl = action.payload.videoUrl;
      state.optInVideoBodyFields = action.payload.bodyFields;
      state.optInVideoFileName = action.payload.fileName;
    },
    optInClearVideoData: (state) => {
      state.optInVideoUrl = null;
      state.optInVideoBodyFields = [];
      state.optInVideoFileName = '';
    },
    // Image template related actions
    optInSetImageData: (state, action) => {
      state.optInImageUrl = action.payload.imageUrl;
      state.optInImageBodyFields = action.payload.bodyFields;
      state.imageFileName = action.payload.fileName;
    },
    optInClearImageData: (state) => {
      state.optInImageUrl = null;
      state.optInImageBodyFields = [];
      state.imageFileName = '';
    },
    setChosen :(state,action)=>{
      state.chosen=action.payload;
    },
    // setImageUrl:(state,action)=>{
    //   if()
    //   state.imageUrl=
    // }
  },
});

export const {
  optInSetTemplateFields,
  optInClearTemplateFields,
  optInSetFileTemplateFields,
  optInClearFileTemplateFields,
  optInSetUploadedFile,
  optInClearUploadedFile,
  optInSetAudioData,
  optInSetVideoData,
  optInClearVideoData,
  optInSetImageData,
  optInClearImageData,
  optInSetTemplateType,
  setChosen
} = optInMessageTemplateTypeSlice.actions;

export default optInMessageTemplateTypeSlice.reducer;

