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
      const { type, uuid } = action.payload;
      if (type === 'bun') {
        // Удаляем старую булку, если она есть
        state.ingredients = state.ingredients.filter((item) => item.type !== 'bun');
        // Добавляем новую булку в начало списка
        state.ingredients.unshift({ ...action.payload, uuid });
      } else {
        // Добавляем ингредиент в список
        state.ingredients.push({ ...action.payload, uuid });
      }
    },
    removeIngredient: (state, action) => {
      const { uuid } = action.payload;
      const index = state.ingredients.findIndex((ingredient) => ingredient.uuid === uuid);
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    clearIngredients: (state) => {
      state.ingredients = [];
    },
    updateIngredientsOrder: (state, action) => {
      state.ingredients = action.payload;
    },
  },
});

export const { addIngredient, removeIngredient, clearIngredients, updateIngredientsOrder } =
  constructorListSlice.actions;
export default constructorListSlice.reducer;
