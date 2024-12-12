import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../../../utils/types';
import { WebSocketStatus } from '../../../../utils/types';

interface UserOrderFeedState {
  orders: Order[];
  total: number;
  totalToday: number;
  status: WebSocketStatus;
  error: string | null;
}

export const initialState: UserOrderFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: WebSocketStatus.OFFLINE,
  error: null,
};

export const UserOrderFeedSlice = createSlice({
  name: 'userOrderFeed',
  initialState,
  reducers: {
    wsUserConnecting: (state) => {
      state.status = WebSocketStatus.CONNECTED;
    },
    wsUserOnline: (state) => {
      state.status = WebSocketStatus.ONLINE;
    },
    wsUserDisconnecting: (state) => {
      state.status = WebSocketStatus.OFFLINE;
    },
    wsUserError: (state, action) => {
      state.status = WebSocketStatus.ERROR;
      state.error = action.payload;
    },
    wsUserMessage: (state, action: PayloadAction<UserOrderFeedState>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
  selectors: {
    getUserStatus: (state) => state.status,
    getUserError: (state) => state.error,
    getUserOrders: (state) => state.orders,
  },
});

export const { wsUserConnecting, wsUserDisconnecting, wsUserOnline, wsUserError, wsUserMessage } =
  UserOrderFeedSlice.actions;

export const { getUserStatus, getUserError, getUserOrders } = UserOrderFeedSlice.selectors;
