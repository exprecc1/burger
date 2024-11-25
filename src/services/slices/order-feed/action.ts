import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'order-feed/connect'>('order-feed/connect');
export const wsDisconnect = createAction('order-feed/disconnect');
