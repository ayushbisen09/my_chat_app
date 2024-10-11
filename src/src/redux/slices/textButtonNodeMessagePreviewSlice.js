// src/redux/slices/textButtonNodeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  buttons: [
    { id: 1, text: 'Button' },  // Initial button
  ],
};

const textButtonNodeSlice = createSlice({
  name: 'textButtonNode',
  initialState,
  reducers: {
    updateMessage(state, action) {
      state.message = action.payload;
    },
    updateButtonText(state, action) {
      const { id, text } = action.payload;
      const foundButton = state.buttons.find((button) => button.id === id); // Renamed to foundButton
      if (foundButton) {
        foundButton.text = text;
      }
    },
    addButton(state) {
      state.buttons.push({ id: state.buttons.length + 1, text: 'Button' });
    },


    deleteButton: (state, action) => {
        state.buttons = state.buttons.filter(button => button.id !== action.payload);
      },

  },
});

export const { updateMessage, updateButtonText, addButton , deleteButton } = textButtonNodeSlice.actions;
export default textButtonNodeSlice.reducer;
