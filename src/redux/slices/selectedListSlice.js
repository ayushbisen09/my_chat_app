import { createSlice } from '@reduxjs/toolkit';

const selectedListSlice = createSlice({
  name: 'selectedList',
  initialState: { name: '' },
  reducers: {
    setSelectedListName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setSelectedListName } = selectedListSlice.actions;
export default selectedListSlice.reducer;
