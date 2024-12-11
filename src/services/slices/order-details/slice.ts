import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../../../utils/request';
import { Ingredient } from '../../../utils/types';

type IngredientIds = string[];

interface IOrderResponse {
  order: {
    number: number;
  };
  success: boolean;
  error: string | null;
}

interface OrderState {
  orderNumber: number | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
}

export const submitOrder = createAsyncThunk<IOrderResponse, IngredientIds>(
  'order/fetchOrderSubmitted',
  async (ingredients) => {
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
  },
);

export const initialState: OrderState = {
  orderNumber: null,
  status: 'idle',
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitOrder.fulfilled, (state, action: PayloadAction<IOrderResponse>) => {
        state.status = 'success';
        state.orderNumber = action.payload.order.number;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error';
      });
  },
});

export default orderSlice.reducer;
