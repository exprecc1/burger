import React, { FunctionComponent } from 'react';
import { FeedOrder } from '../components/feed/order-feed/order-feed';
import { AllOrder } from '../components/feed/order-all/order-all';
import { WS__ALL_FEED_URL } from '../utils/request';
import { useDispatch } from '../services/store';
import { wsConnect, wsDisconnect } from '../services/slices/order-feed/action';

export const FeedPage: React.FC = () => {
  const dispatch = useDispatch();

  // Подключение к WebSocket серверу при монтировании компонента и отключение при размонтировании
  React.useEffect(() => {
    dispatch(wsConnect(WS__ALL_FEED_URL));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <div className="container">
      <div>
        <div className="title">
          <p className="text text_type_main-large">Лента заказов</p>
        </div>
        <section className="order__page">
          <FeedOrder />
          <AllOrder />
        </section>
      </div>
    </div>
  );
};
