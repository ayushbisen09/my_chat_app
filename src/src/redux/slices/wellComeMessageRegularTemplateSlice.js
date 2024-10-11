// src/store/slices/optInMessageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wellComeMessageType: 'text',
  wellComeMessageContent: 'Thank you for opting-in. In future if you ever want to connect again just send "Hello".',
  chatBoxImage: '',
};

export const WellComeMessageSlice = createSlice({
  name: 'wellComeMessageRegularMessage',
  initialState,
  reducers: {
    setwellComeMessageData: (state, action) => {
      state.wellComeMessageTypes = action.payload.wellComeMessageType;
      state.wellComeMessageContents = action.payload.wellComeMessageContent;
      state.chatBoxImage = action.payload.chatBoxImage;
    },
    resetwellComeMessageData: (state) => {
      state.wellComeMessageType = 'text';
      state.wellComeMessageContent = '';
      state.chatBoxImage = '';
    },
  },
});

export const { setwellComeMessageData, resetwellComeMessageData } = WellComeMessageSlice.actions;

export default WellComeMessageSlice.reducer;
