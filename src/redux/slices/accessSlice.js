// src/store/accessSlice.js
import { createSlice } from '@reduxjs/toolkit';

const accessSlice = createSlice({
  name: 'access',
  initialState: {
    showAccessBox: false,
    selectedTeammemberName: 'Ayush Bisen',
    selectedTeammemberEmail: 'ayush.bisen@pabbly.com',
    teammembersPageDisabled: false, // Add this property
  },
  reducers: {
    showAccessBox(state, action) {
      state.showAccessBox = true;
      state.selectedTeammemberName = action.payload;
      state.selectedTeammemberEmail = action.payload.email;
      state.teammembersPageDisabled = true; // Disable the page on access
    },
    hideAccessBox(state) {
      state.showAccessBox = false;
      state.selectedTeammemberName = '';
      state.selectedTeammemberEmail = ''
      state.teammembersPageDisabled = false; // Reset the page access on exit
    },
  },
});     

export const { showAccessBox, hideAccessBox } = accessSlice.actions;
export default accessSlice.reducer;
