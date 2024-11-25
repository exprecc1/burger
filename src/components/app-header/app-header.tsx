import React, { FunctionComponent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../services/store';
import { getUser, getIsAuthChecked } from '../../services/slices/user/user';
import { wsDisconnect } from '../../services/slices/order-feed/action';
import style from './app-header.module.css';
import { wsDisconnecting } from '../../services/slices/order-feed/slice';

export const AppHeader: FunctionComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const disconnect = () => {
    dispatch(wsDisconnect());
    dispatch(wsDisconnecting());
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <section className={style.head}>
          <div className={style.toggle}>
            <div className={style.builder}>
              <Link to="/" onClick={disconnect}>
                <BurgerIcon type="primary" />
                <span>Конструктор</span>
              </Link>
            </div>
            <div className={style.tape}>
              <Link to="/feed">
                <ListIcon type="secondary" />
                <span>Лента заказов</span>
              </Link>
            </div>
          </div>
          <div className={style.header_logo}>
            <Logo />
          </div>
          <div className={style.user}>
            <Link to="/profile">
              <ProfileIcon type="secondary" onClick={disconnect} />
              {isAuthChecked && user ? <span>{user.email}</span> : <span>Личный кабинет</span>}
            </Link>
          </div>
        </section>
      </div>
    </header>
  );
};
