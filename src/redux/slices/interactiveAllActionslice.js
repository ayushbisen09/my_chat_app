import { createSlice } from '@reduxjs/toolkit';

const interactiveAllActionslice = createSlice({
  name: 'interactiveAllActions',
  initialState: { 
    code: '', 
    limitedTimeText: '' ,// Adding limitedTimeText to the initial state
    isOfferExpiring: false
  },
  reducers: {
    setCouponCode: (state, action) => {
      state.code = action.payload;
    },
    setLimitedTimeText: (state, action) => {  // Adding the reducer for Limited Time Offer Text
      state.limitedTimeText = action.payload;
    },
    setOfferExpiring: (state, action) => {  // New reducer for switch state
      state.isOfferExpiring = action.payload;
    },
  },
});

export const { setCouponCode, setLimitedTimeText, setOfferExpiring  } = interactiveAllActionslice.actions;
export default interactiveAllActionslice.reducer;
