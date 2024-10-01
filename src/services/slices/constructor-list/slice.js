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
      const { type, _id } = action.payload;
      if (type === 'bun') {
        // Сбрасываем счетчик старой булки
        const oldBunId = state.ingredients.find((item) => item.type === 'bun')?._id;
        if (oldBunId) {
          delete state.ingredientCounts[oldBunId];
        }
        // Удаляем все булки из списка ингредиентов
        state.ingredients = state.ingredients.filter((item) => item.type !== 'bun');
        // Добавляем новую булку и устанавливаем её количество в 2
        state.ingredientCounts = { ...state.ingredientCounts, [_id]: 2 };
      } else {
        // Увеличиваем количество ингредиента, если он уже есть в списке
        if (state.ingredientCounts[_id]) {
          state.ingredientCounts[_id] += 1;
        } else {
          // Иначе устанавливаем количество в 1
          state.ingredientCounts[_id] = 1;
        }
      }
      // Добавляем ингредиент в список
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      const { _id } = action.payload;
      const index = state.ingredients.findIndex((ingredient) => ingredient._id === _id);
      if (index !== -1) {
        // Удаляем ингредиент из списка
        state.ingredients.splice(index, 1);
        // Уменьшаем количество ингредиента
        if (state.ingredientCounts[_id]) {
          if (state.ingredientCounts[_id] > 1) {
            state.ingredientCounts[_id] -= 1;
          } else {
            // Если количество равно 1, удаляем запись из ingredientCounts
            delete state.ingredientCounts[_id];
          }
        }
      }
    },
  },
});

export const { addIngredient, removeIngredient } = constructorListSlice.actions;
export default constructorListSlice.reducer;
