import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'loading',
  error: null,
};

export const fetchAllIngredients = createAsyncThunk('ingredients/fetchAllIngredients', async () => {
  const response = await fetch('https://norma.nomoreparties.space/api/ingredients');

  if (!response.ok) {
    throw new Error('Ошибка сети ', response.status);
  }

  const data = await response.json();
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
