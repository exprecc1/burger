import { configureStore } from '@reduxjs/toolkit';
import allIngredientsReducer from './slices/all-ingredients/slice';
import сonstructorListReducer from './slices/constructor-list/slice';
import currentIngredientReducer from './slices/current-ingredient/slice';

export const store = configureStore({
  reducer: {
    ingredientsAll: allIngredientsReducer,
    constructorList: сonstructorListReducer,
    currentIngredient: currentIngredientReducer,
  },
});
