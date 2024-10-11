// src/redux/slices/listNodeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listNodeMessage: '',
  listNodeButtons: [{ id: 1, text: 'Button' }],
  header: '', // New field for header
  body: '', // New field for body
  footer: '', // New field for footer
  listPlaceholder: 'List', // New field for List Placeholder TextField
  sectionsTitle: {}, // Object to store section titles by card ID
  itemTitle: '', // New field for title
  itemDescription: '', // New field for description
};

const listNodeSlice = createSlice({
  name: 'listNode',
  initialState,
  reducers: {
    updateHeader(state, action) {
      state.header = action.payload;
    },
    updateBody(state, action) {
      state.body = action.payload;
    },

    updateFooter(state, action) {
      state.footer = action.payload;
    },
    updateListPlaceholder(state, action) {
      // New action
      state.listPlaceholder = action.payload;
    },

    updateSectionTitle(state, action) {
      const { cardId, title } = action.payload;
      state.sectionsTitle[cardId] = title; // Update title for the specified card ID
    },

    updateItemTitle(state, action) { // Action to update title
      state.itemTitle = action.payload;
    },
    updateItemDescription(state, action) { // Action to update description
      state.itemDescription = action.payload;
    },

    updateListNodeButtonText(state, action) {
      const { id, text } = action.payload;
      const foundButton = state.listNodeButtons.find((button) => button.id === id);
      if (foundButton) {
        foundButton.text = text;
      }
    },
    addListNodeButton(state) {
      state.listNodeButtons.push({ id: state.listNodeButtons.length + 1, text: 'Button' });
    },

    deleteListNodeButton: (state, action) => {
      state.listNodeButtons = state.listNodeButtons.filter(
        (button) => button.id !== action.payload
      );
    },
  },
});

export const {
  updateHeader,
  updateBody,
  updateFooter,
  updateListNodeButtonText,
  addListNodeButton,
  deleteListNodeButton,
  updateListPlaceholder,
  updateSectionTitle,
  updateItemTitle,
  updateItemDescription
} = listNodeSlice.actions;
export default listNodeSlice.reducer;
