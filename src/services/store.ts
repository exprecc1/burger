import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsAllSlice } from './slices/all-ingredients/slice';
import { constructorListSlice } from './slices/constructor-list/slice';
import { currentIngredientSlice } from './slices/current-ingredient/slice';
import { orderSlice } from './slices/order-details/slice';
import { userSlice } from './slices/user/user';
import { UserOrderFeedSlice } from './slices/user/user-order-feed/slice';
import { OrderFeedSlice } from './slices/order-feed/slice';
import { socketMiddleware } from './middlevare/all-order-middleware';
import { socketUserMiddleware } from './middlevare/user-order-middleware';
import { wsConnect, wsDisconnect } from './slices/order-feed/action';
import { wsUserConnect, wsUserDisconnect } from './slices/user/user-order-feed/action';
import { wsConnecting, wsOnline, wsError, wsMessage } from './slices/order-feed/slice';
import {
  wsUserConnecting,
  wsUserOnline,
  wsUserError,
  wsUserMessage,
} from './slices/user/user-order-feed/slice';
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

//для общей ленты заказов
const liveAllFeedOrderMiddleware = socketMiddleware({
  connect: wsConnect,
  disconnect: wsDisconnect,
  wsConnecting: wsConnecting,
  wsOnline: wsOnline,
  wsError: wsError,
  wsMessage: wsMessage,
});

//Для пользователя
const liveUserOrderMiddleware = socketUserMiddleware({
  userConnect: wsUserConnect,
  userDisconnect: wsUserDisconnect,
  wsUserConnecting: wsUserConnecting,
  wsUserOnline: wsUserOnline,
  wsUserError: wsUserError,
  wsUserMessage: wsUserMessage,
});

const rootReducer = combineSlices(
  ingredientsAllSlice,
  constructorListSlice,
  currentIngredientSlice,
  orderSlice,
  userSlice,
  OrderFeedSlice,
  UserOrderFeedSlice,
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveAllFeedOrderMiddleware, liveUserOrderMiddleware);
  },
});

// Типизация rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Типизация для AppDispatch и useSelector
export type AppDispatch = typeof store.dispatch;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
