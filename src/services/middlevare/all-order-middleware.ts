import { Middleware } from 'redux';
import { RootState } from '../store';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

export type WSConfig<R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect?: ActionCreatorWithoutPayload;
  connecting: ActionCreatorWithoutPayload;
  online?: ActionCreatorWithoutPayload;
  error: ActionCreatorWithPayload<string>;
  message: ActionCreatorWithPayload<R>;
};

export const socketMiddleware = <R>(
  config: WSConfig<R>,
): Middleware<NonNullable<unknown>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const { connect, disconnect, connecting, online, error, message } = config;
    return (next) => (action) => {
      const { dispatch } = store;
      if (connect.match(action)) {
        const url = action.payload;
        socket = new WebSocket(url);
        connecting && dispatch(connecting());

        socket.onopen = () => {
          online && dispatch(online());
        };

        socket.onerror = () => {
          error && dispatch(error('Error'));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          try {
            const parsedData = JSON.parse(data);
            dispatch(message(parsedData));
          } catch (err) {
            error && dispatch(error((err as Error).message));
          }
        };

        socket.onclose = () => {
          disconnect && dispatch(disconnect());
          socket = null;
        };
      }

      if (socket && message.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (err) {
          error && dispatch(error((err as Error).message));
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
