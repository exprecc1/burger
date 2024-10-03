import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
  ingredientCounts: {},
};

const constructorListSlice = createSlice({
  name: 'constructorList',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const { type } = action.payload;
      if (type === 'bun') {
        // Удаляем старую булку, если она есть
        state.ingredients = state.ingredients.filter((item) => item.type !== 'bun');
        // Добавляем новую булку
        state.ingredients.push(action.payload);
      } else {
        // Добавляем ингредиент в список
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action) => {
      const { _id } = action.payload;
      const index = state.ingredients.findIndex((ingredient) => ingredient._id === _id);
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    clearIngredients: (state) => {
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearIngredients } = constructorListSlice.actions;
export default constructorListSlice.reducer;
