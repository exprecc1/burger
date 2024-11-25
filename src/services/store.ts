import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsAllSlice } from './slices/all-ingredients/slice';
import { constructorListSlice } from './slices/constructor-list/slice';
import { currentIngredientSlice } from './slices/current-ingredient/slice';
import { orderSlice } from './slices/order-details/slice';
import { userSlice } from './slices/user/user';
import { OrderFeedSlice } from './slices/order-feed/slice';
import { socketMiddleware } from './middlevare/socket-middlevare';
import { wsConnect, wsDisconnect } from './slices/order-feed/action';
import { wsConnecting, wsOnline, wsError, wsMessage } from './slices/order-feed/slice';
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

const liveFeedOrderMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  wsConnecting: wsConnecting,
  wsOnline: wsOnline,
  wsError: wsError,
  wsMessage: wsMessage,
});

const rootReducer = combineSlices(
  ingredientsAllSlice,
  constructorListSlice,
  currentIngredientSlice,
  orderSlice,
  userSlice,
  OrderFeedSlice,
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveFeedOrderMiddleware);
  },
});

// Типизация rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Типизация для AppDispatch и useSelector
export type AppDispatch = typeof store.dispatch;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
