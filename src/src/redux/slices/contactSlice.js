
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

const includedArraySlice = createSlice({
  name: 'includedArray',
  initialState: {
    includedArray: [
      'Pabbly Connect List',
      'Pabbly Subscription Billing List',
      'Pabbly Support',
    ],
    excludedArray: [
        'Pabbly Email Marketing List', 'Pabbly Form Builder List'
      ],
  },
  reducers: {
    setIncludedArray(state, action) {
      state.includedArray.push(action.payload);
    },
    setExcludedArray(state, action) {
        state.excludedArray.push(action.payload);
      },
    removeLastElement(state) {
        state.includedArray.pop();
      },
  },
});

export const { setIncludedArray,removeLastElement,setExcludedArray} = includedArraySlice.actions;
export default includedArraySlice.reducer;
