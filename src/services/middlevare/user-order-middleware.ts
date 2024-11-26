import { Middleware } from 'redux';
import { RootState } from '../store';
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit';

export type WSUserActions<R> = {
  userConnect: ActionCreatorWithPayload<string>;
  userDisconnect?: ActionCreatorWithoutPayload;
  wsUserConnecting: ActionCreatorWithoutPayload;
  wsUserOnline?: ActionCreatorWithoutPayload;
  wsUserError: ActionCreatorWithPayload<string>;
  wsUserMessage: ActionCreatorWithPayload<R>;
};

export const socketUserMiddleware = <R>(
  WSUserActions: WSUserActions<R>,
): Middleware<NonNullable<unknown>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      userConnect,
      userDisconnect,
      wsUserConnecting,
      wsUserOnline,
      wsUserError,
      wsUserMessage,
    } = WSUserActions;
    return (next) => (action) => {
      const { dispatch } = store;
      if (userConnect.match(action)) {
        const accessToken = localStorage.getItem('accessToken');
        const token = accessToken ? accessToken.replace(/^Bearer\s+/i, '') : null;
        const url = `${action.payload}?token=${token}`;
        socket = new WebSocket(url);
        wsUserConnecting && dispatch(wsUserConnecting());

        socket.onopen = () => {
          wsUserOnline && dispatch(wsUserOnline());
        };

        socket.onerror = () => {
          wsUserError && dispatch(wsUserError('Error'));
        };

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);
            if (parsedData.message === 'Invalid or missing token') {
              dispatch(wsUserError('Invalid or missing token'));
              socket?.close();
              socket = null;
            } else {
              dispatch(wsUserMessage(parsedData));
            }
          } catch (err) {
            dispatch(wsUserError((err as Error).message));
          }
        };

        socket.onclose = () => {
          userDisconnect && dispatch(userDisconnect());
        };
      }
      next(action);
    };
  };
};

// if (!token) {
//   dispatch(wsUserError('Missing access token'));
//   return next(action);
// }
//   const url = `${action.payload}?token=${token}`;
//   socket = new WebSocket(url);
//   wsUserConnecting && dispatch(wsUserConnecting());

//   socket.onopen = () => {
//     wsUserOnline && dispatch(wsUserOnline());
//   };

//   // socket.onopen = () => {
//   //   if (socket && token) {
//   //     socket.send(JSON.stringify({ token }));
//   //   }
//   // };

//   socket.onerror = () => {
//     dispatch(wsUserError('Error'));
//   };

//   socket.onmessage = (event) => {
//     const { data } = event;
//     // let parsedData;
//     try {
//       const parsedData = JSON.parse(data);
//       dispatch(wsUserMessage(parsedData));
//     } catch (err) {
//       dispatch(wsUserError((err as Error).message));
//       return;
//     }
//     // if (parsedData.message === 'Invalid or missing token') {
//     //   dispatch(wsUserError('Invalid or missing token'));
//     //   socket?.close();
//     //   socket = null;
//     //   return;
//     // }
//   };

//   socket.onclose = () => {
//     disconnect && dispatch(disconnect());
//   };
// }

// if (socket && wsUserMessage?.match(action)) {
//   try {
//     socket.send(JSON.stringify({ token }));
//   } catch (err) {
//     dispatch(wsUserError((err as Error).message));
//   }
// }

// if (socket && disconnect?.match(action)) {
//   socket.close();
//   socket = null;
// }
