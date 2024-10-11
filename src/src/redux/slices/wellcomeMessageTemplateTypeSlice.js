import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wellComeTemplateType: "", // This will hold the fields entered in TextTemplateTypeDialog
  wellComeTemplateFields: [], // This will hold the fields entered in TextTemplateTypeDialog
  wellComeFileTemplateFields: [], // This will hold the fields entered in FileTemplateTypeDialog
  wellComeUploadedFile: null, // This will hold the uploaded file for file template
  wellComeAudioUrl: null, // This will hold the uploaded audio file URL
  wellComeAudioBodyFields: [], // This will hold the fields entered in AudioTemplateTypeDialog
  wellComeAudioFileName: '', // This will store the name of the audio file
  wellComeVideoUrl: null, // This will hold the video file URL
  wellComeVideoBodyFields: [], // This will hold the fields entered in VideoTemplateTypeDialog
  wellComeVideoFileName: '', // This will store the name of the video file
  wellComeImageUrl: null, // Image URL for image template
  wellComeImageBodyFields: [], // Image template fields
  wellComeImageFileName: '', // Image file name
  wellComeChosen:'',
  imageUrl:''
};

const wellComeMessageTemplateTypeSlice = createSlice({
  name: 'wellComeMessageTemplateType',
  initialState,
  reducers: {
    wellComeSetTemplateType: (state, action) => {
      state.wellComeTemplateType = action.payload;
    },
    wellComeSetTemplateFields: (state, action) => {
      state.wellComeTemplateFields = action.payload;
    },
    wellComeClearTemplateFields: (state) => {
      state.wellComeTemplateFields = [];
    },
    // File template related actions
    wellComeSetFileTemplateFields: (state, action) => {
      state.wellComeFileTemplateFields = action.payload;
    },
    wellComeClearFileTemplateFields: (state) => {
      state.wellComeFileTemplateFields = [];
    },
    wellComeSetUploadedFile: (state, action) => {
      state.wellComeUploadedFile = action.payload;
    },
    wellComeClearUploadedFile: (state) => {
      state.wellComeUploadedFile = null;
    },
    // Audio template related actions
    wellComeSetAudioData: (state, action) => {
      state.wellComeAudioUrl = action.payload.audioUrl;
      state.wellComeAudioBodyFields = action.payload.bodyFields;
      state.wellComeAudioFileName = action.payload.fileName;
    },
    wellComeClearAudioData: (state) => {
      state.wellComeAudioUrl = null;
      state.wellComeAudioBodyFields = [];
      state.wellComeAudioFileName = '';
    },
    // Video template related actions
    wellComeSetVideoData: (state, action) => {
      state.wellComeVideoUrl = action.payload.videoUrl;
      state.wellComeVideoBodyFields = action.payload.bodyFields;
      state.wellComeVideoFileName = action.payload.fileName;
    },
    wellComeClearVideoData: (state) => {
      state.wellComeVideoUrl = null;
      state.wellComeVideoBodyFields = [];
      state.wellComeVideoFileName = '';
    },
    // Image template related actions
    wellComeSetImageData: (state, action) => {
      state.wellComeImageUrl = action.payload.imageUrl;
      state.wellComeImageBodyFields = action.payload.bodyFields;
      state.wellComeImageFileName = action.payload.fileName;
    },
    wellComeClearImageData: (state) => {
      state.wellComeImageUrl = null;
      state.wellComeImageBodyFields = [];
      state.wellComeImageFileName = '';
    },
    wellComeSetChosen :(state,action)=>{
      state.wellComeChosen=action.payload;
    },
    // setImageUrl:(state,action)=>{
    //   if()
    //   state.imageUrl=
    // }
  },
});

export const {
  wellComeSetTemplateFields,
  wellComeClearTemplateFields,
  wellComeSetFileTemplateFields,
  wellComeClearFileTemplateFields,
  wellComeSetUploadedFile,
  wellComeClearUploadedFile,
  wellComeSetAudioData,
  wellComeSetVideoData,
  wellComeClearVideoData,
  wellComeSetImageData,
  wellComeClearImageData,
  wellComeSetTemplateType,
  wellComeSetChosen
} = wellComeMessageTemplateTypeSlice.actions;

export default wellComeMessageTemplateTypeSlice.reducer;

