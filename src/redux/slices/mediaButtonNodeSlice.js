// src/redux/slices/mediaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploadedFile: null,
  fileUrl: '',
  caption: '',
  fileType: '', 
  buttons: [
    { id: 1, text: 'Button' },  // Initial button
  ],
};

const mediaButtonNodeSlice = createSlice({
  name: 'mediaButtonNode',
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.uploadedFile = action.payload.file;
      state.fileUrl = action.payload.url;
      state.fileType = action.payload.fileType;
    },
    clearFile: (state) => {
      state.uploadedFile = null;
      state.fileUrl = '';
      state.fileType = '';
    },
    setCaption: (state, action) => {
      state.caption = action.payload;
    },
    addButtonText: (state, action) => {
      state.buttonTexts.push(action.payload);  // Adds new button text
    },
    removeButtonText: (state, action) => {
      state.buttonTexts = state.buttonTexts.filter((_, index) => index !== action.payload);  // Removes button text by index
    },
    updateButtonText(state, action) {
      const { id, text } = action.payload;
      const foundButton = state.buttons.find((button) => button.id === id); // Renamed to foundButton
      if (foundButton) {
        foundButton.text = text;
      }
    },
    addButton(state) {
      state.buttons.push({ id: state.buttons.length + 1, text: 'Button' });
    },


    deleteButton: (state, action) => {
        state.buttons = state.buttons.filter(button => button.id !== action.payload);
      },
  },
});

export const { setFile, clearFile, setCaption, updateButtonText, addButton , deleteButton } = mediaButtonNodeSlice.actions;

export const selectUploadedFile = (state) => state.mediaButtonNode.uploadedFile;
export const selectFileUrl = (state) => state.mediaButtonNode.fileUrl;
export const selectCaption = (state) => state.mediaButtonNode.caption;
export const selectFileType = (state) => state.mediaButtonNode.fileType; 
export const selectButtonTexts = (state) => state.mediaButtonNode.buttonTexts;

export default mediaButtonNodeSlice.reducer;
