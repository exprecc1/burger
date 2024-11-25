import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../../utils/request';
import { Ingredient } from '../../../utils/types';

interface IcurrentIngredientState {
  currentIngredient: Ingredient | null;
  loading: boolean;
  error: string | null;
}

const initialState: IcurrentIngredientState = {
  currentIngredient: null,
  loading: false,
  error: null,
};

export const fetchIngredientById = createAsyncThunk<Ingredient, string>(
  'currentIngredient/fetchIngredientById',
  async (id) => {
    const data = await request(`/ingredients/` + id);
    return data.data;
  },
);

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    viewIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.currentIngredient = action.payload;
    },
    removeViewIngredient: (state) => {
      state.currentIngredient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientById.fulfilled, (state, action: PayloadAction<Ingredient>) => {
        state.loading = false;
        state.currentIngredient = action.payload;
      })
      .addCase(fetchIngredientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка';
      });
  },
});

export const { viewIngredient, removeViewIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
