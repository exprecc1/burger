import { Ingredient } from './../../../utils/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../../utils/request';

export interface IngredientState {
  items: Ingredient[];
  status: 'loading' | 'success' | 'failed';
  error: string | null;
}

const initialState: IngredientState = {
  items: [],
  status: 'loading',
  error: null,
};

export const fetchAllIngredients = createAsyncThunk<Ingredient[], void, {}>(
  'ingredients/fetchAllIngredients',
  async () => {
    const data = await request('/ingredients');
    return data.data;
  },
);

export const ingredientsAllSlice = createSlice({
  name: 'ingredientsAll',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllIngredients.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchAllIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export const { setIngredients } = ingredientsAllSlice.actions;
export default ingredientsAllSlice.reducer;
