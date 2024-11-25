import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../../utils/types';

interface constructorListState {
  ingredients: Ingredient[];
  ingredientCounts: Record<string, number>;
}

const initialState: constructorListState = {
  ingredients: [],
  ingredientCounts: {},
};

export const constructorListSlice = createSlice({
  name: 'constructorList',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
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
    removeIngredient: (state, action: PayloadAction<Ingredient>) => {
      const { uuid } = action.payload;
      const index = state.ingredients.findIndex((ingredient) => ingredient.uuid === uuid);
      if (index !== -1) {
        state.ingredients.splice(index, 1);
      }
    },
    clearIngredients: (state) => {
      state.ingredients = [];
    },
    updateIngredientsOrder: (state, action: PayloadAction<Ingredient[]>) => {
      state.ingredients = action.payload;
    },
  },
});

export const { addIngredient, removeIngredient, clearIngredients, updateIngredientsOrder } =
  constructorListSlice.actions;
