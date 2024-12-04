import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const wsUserConnect = createAction<string, 'order-user-feed/connect'>(
  'order-user-feed/connect',
);
export const wsUserDisconnect = createAction('order-user-feed/disconnect');
