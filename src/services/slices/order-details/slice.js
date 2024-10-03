import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const submitOrder = createAsyncThunk(
  'order/fetchOrderSubmitted',
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error('Что-то пошло не так ', response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  orderNumber: null,
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = 'success';
        state.orderNumber = action.payload.order.number;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
