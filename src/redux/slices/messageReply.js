// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

const messageReplySlice = createSlice({
  name: 'messageReply',
  initialState: {
    isVisible:false,
    replyText:'',
    originalReplyText:'',
    imageVisibilityInReply:false,
    originalImageVisibilty:false,
    imageUrlInReply:''
  },
  reducers: {
    setIsVisible (state,action){
     state.isVisible=action.payload
    },
    setReplyText  (state,action){
      state.replyText=action.payload
    },
    setOriginalReplyText (state,action){
      state.originalReplyText=state.replyText
    },
    setImageVisibilityInReply (state,action){
      state.imageVisibilityInReply=action.payload
    },
    setOriginalImageVisibility (state,action){
      state.originalImageVisibilty=state.imageVisibilityInReply
    },
    setImageUrlInReply (state,action){
      state.imageUrlInReply=action.payload
    }
  },
});

export const {setIsVisible,setReplyText,setOriginalReplyText,setImageVisibilityInReply,setImageUrlInReply,setOriginalImageVisibility} = messageReplySlice.actions;
export default messageReplySlice.reducer;
