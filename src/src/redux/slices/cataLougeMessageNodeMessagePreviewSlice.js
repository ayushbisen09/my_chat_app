// src/redux/slices/listNodeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  body: '', // New field for body
  footer: '', // New field for footer
};

const catalougeMessageNodeSlice = createSlice({
  name: 'catalougeMessageNode',
  initialState,
  reducers: {
    updateBody(state, action) {
      state.body = action.payload;
    },

    updateFooter(state, action) {
      state.footer = action.payload;
    },
  },
});

export const { updateBody, updateFooter } = catalougeMessageNodeSlice.actions;
export default catalougeMessageNodeSlice.reducer;
