import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient, WebSocketStatus } from '../../../utils/types';
import { Order } from '../../../utils/types';

type OrderFeedState = {
  orders: Order[];
  total: number;
  totalToday: number;
  status: WebSocketStatus;
  error: string | null;
};

const initialState: OrderFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: WebSocketStatus.OFFLINE,
  error: null,
};

export const OrderFeedSlice = createSlice({
  name: 'OrderFeed',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebSocketStatus.CONNECTED;
    },
    wsOnline: (state) => {
      state.status = WebSocketStatus.ONLINE;
    },
    wsDisconnecting: (state) => {
      state.status = WebSocketStatus.OFFLINE;
    },
    wsError: (state, action) => {
      state.status = WebSocketStatus.ERROR;
      state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<OrderFeedState>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
  selectors: {
    getStatus: (state) => state.status,
    getError: (state) => state.error,
    getOrders: (state) => state.orders,
  },
});

export const { wsConnecting, wsDisconnecting, wsOnline, wsError, wsMessage } =
  OrderFeedSlice.actions;

export const { getStatus, getError, getOrders } = OrderFeedSlice.selectors;

export default OrderFeedSlice.reducer;
