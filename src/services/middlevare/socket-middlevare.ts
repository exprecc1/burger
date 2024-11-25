import { Middleware } from 'redux';
import { RootState } from '../store';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

export type WSActions<R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect?: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOnline?: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<R>;
};

export const socketMiddleware = <R>(
  wsActions: WSActions<R>,
): Middleware<NonNullable<unknown>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const { connect, wsConnecting, disconnect, wsOnline, wsError, wsMessage } = wsActions;
    return (next) => (action) => {
      const { dispatch } = store;
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        wsConnecting && dispatch(wsConnecting());

        socket.onopen = () => {
          wsOnline && dispatch(wsOnline());
        };

        socket.onerror = () => {
          dispatch(wsError('Error'));
        };
        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);
            dispatch(wsMessage(parsedData));
          } catch (err) {
            dispatch(wsError((err as Error).message));
          }
        };

        socket.onclose = () => {
          disconnect && dispatch(disconnect());
        };
      }

      if (socket && wsMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (err) {
          dispatch(wsError((err as Error).message));
        }
      }

      if (socket && disconnect?.match(action)) {
        socket.close();
        socket = null;
      }
      next(action);
    };
  };
};
