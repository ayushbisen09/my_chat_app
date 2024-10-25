// src/redux/slices/templateSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const templateSlice = createSlice({
  name: 'template',
  initialState: {
    templateFormatInputText: '',
  },
  reducers: {
    setTemplateFormatInputText: (state, action) => {
      state.templateFormatInputText = action.payload;
    },
  },
});

export const { setTemplateFormatInputText } = templateSlice.actions;
export default templateSlice.reducer;
