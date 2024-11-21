import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { getUser, getIsAuthChecked } from '../../services/slices/user/user';

import style from './app-header.module.css';

export const AppHeader: FunctionComponent = () => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <section className={style.head}>
          <div className={style.toggle}>
            <div className={style.builder}>
              <Link to="/">
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
              <ProfileIcon type="secondary" />
              {isAuthChecked && user ? <span>{user.email}</span> : <span>Личный кабинет</span>}
            </Link>
          </div>
        </section>
      </div>
    </header>
  );
};
