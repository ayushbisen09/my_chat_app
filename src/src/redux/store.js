// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import messageReplyReducer from './slices/messageReply';
import includedArrayReducer from './slices/contactSlice'; // Import the new reducer
import listNodeReducer from './slices/listNodeMessagePreviewSlice';
import mediaButtonNodeReducer from './slices/mediaButtonNodeSlice';
import optOutMessageReducer from './slices/optOutRegularMessageSlice';
import optInMessageReducer from './slices/regularMessageTemplateSlice';
import optInTemplateTypeReducer from './slices/optInMessageTemplateTypeSlice';
import textButtonNodeReducer from './slices/textButtonNodeMessagePreviewSlice';
import optOutTemplateTypeReducer from './slices/optOutMessageTemplateTypeSlice'; 
import wellComeMessageReducer from './slices/wellComeMessageRegularTemplateSlice';
import offHourMessageTemplateTypeReducer from './slices/offHourMessageTemplateTypeSlice';
import catalougeMessageNodeReducer from './slices/cataLougeMessageNodeMessagePreviewSlice'
import wellComeMessageTemplateTypeReducer from './slices/wellcomeMessageTemplateTypeSlice';
import offHourMessageRegularMessageReducer from './slices/offHoursMessageRegularTemplateSlice';

const store = configureStore({
  reducer: {
    includedArray: includedArrayReducer,
    messageReply: messageReplyReducer, // Add the messageReply slice reducer to the store
    optInMessage: optInMessageReducer,
    optOutMessage: optOutMessageReducer,
    optInMessageTemplateType: optInTemplateTypeReducer,
    optOutMessageTemplateType: optOutTemplateTypeReducer,
    wellComeMessageRegularMessage: wellComeMessageReducer,
    offHourRegularMessage: offHourMessageRegularMessageReducer,
    wellComeMessageTemplateType: wellComeMessageTemplateTypeReducer,
    offHourMessageTemplateType: offHourMessageTemplateTypeReducer,
    textButtonNode: textButtonNodeReducer,
    listNode: listNodeReducer,
    mediaButtonNode: mediaButtonNodeReducer,
    catalougeMessageNode: catalougeMessageNodeReducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
