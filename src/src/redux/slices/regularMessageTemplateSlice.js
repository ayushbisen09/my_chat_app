// src/store/slices/optInMessageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messageType: 'text',
  messageContent: 'Thank you for opting-in. In future if you ever want to connect again just send "Hello".',
  chatBoxImage: '',
};

export const optInMessageSlice = createSlice({
  name: 'optInMessage',
  initialState,
  reducers: {
    setMessageData: (state, action) => {
      state.messageType = action.payload.messageType;
      state.messageContent = action.payload.messageContent;
      state.chatBoxImage = action.payload.chatBoxImage;
    },
    resetMessageData: (state) => {
      state.messageType = 'text';
      state.messageContent = '';
      state.chatBoxImage = '';
    },
  },
});

export const { setMessageData, resetMessageData } = optInMessageSlice.actions;

export default optInMessageSlice.reducer;
