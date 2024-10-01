import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
};

const constructorListSlice = createSlice({
  name: 'constructorList',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const { type } = action.payload;
      if (type === 'bun') {
        state.ingredients = state.ingredients.filter((item) => item.type !== 'bun');
      }
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload,
      );
    },
  },
});

export const { addIngredient, removeIngredient } = constructorListSlice.actions;
export default constructorListSlice.reducer;
