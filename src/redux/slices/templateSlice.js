// templateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTemplate: null,
};

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    saveTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
  },
});

export const { saveTemplate } = templateSlice.actions;

export default templateSlice.reducer;
