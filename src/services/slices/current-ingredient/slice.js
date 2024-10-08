import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIngredient: null,
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    viewIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
    removeViewIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
});

export const { viewIngredient, removeViewIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
