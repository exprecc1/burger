import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../../utils/request';

const initialState = {
  items: [],
  status: 'loading',
  error: null,
};

export const fetchAllIngredients = createAsyncThunk('ingredients/fetchAllIngredients', async () => {
  const data = await request('/ingredients');
  return data.data;
});

const ingredientsAllSlice = createSlice({
  name: 'ingredientsAll',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllIngredients.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchAllIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setIngredients } = ingredientsAllSlice.actions;
export default ingredientsAllSlice.reducer;
