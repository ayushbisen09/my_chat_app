// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import messageReplyReducer from './slices/messageReply';
import includedArrayReducer from './slices/contactSlice'; // Import the new reducer
import templateReducer from './slices/templateSlice';

const store = configureStore({
  reducer: {
    includedArray: includedArrayReducer,
    messageReply: messageReplyReducer, // Add the messageReply slice reducer to the store
    template: templateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;