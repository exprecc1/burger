import React, { FunctionComponent } from 'react';
import { FeedOrder } from '../components/feed/order-feed/order-feed';
import { AllOrder } from '../components/feed/order-all/order-all';
export const FeedPage: React.FC = () => {
  return (
    <>
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
    </>
  );
};
