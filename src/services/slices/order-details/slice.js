import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../../utils/request';

export const submitOrder = createAsyncThunk('order/fetchOrderSubmitted', async (ingredients) => {
  const accessToken = localStorage.getItem('accessToken');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify({ ingredients }),
  };

  const data = await request('/orders', options);
  return data;
});

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
