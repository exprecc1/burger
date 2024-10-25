import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../../utils/request';

const initialState = {
  currentIngredient: null,
  loading: false,
  error: null,
};

export const fetchIngredientById = createAsyncThunk(
  'currentIngredient/fetchIngredientById',
  async (id) => {
    const data = await request(`/ingredients/` + id);
    return data.data;
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentIngredient = action.payload;
      })
      .addCase(fetchIngredientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { viewIngredient, removeViewIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
