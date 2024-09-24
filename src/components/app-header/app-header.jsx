import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';
export const AppHeader = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <section className={style.head}>
          <div className={style.toggle}>
            <div className={style.builder}>
              <a href="#">
                <BurgerIcon type="primary" />
                <span>Конструктор</span>
              </a>
            </div>
            <div className={style.tape}>
              <a href="#">
                <ListIcon type="secondary" />
                <span>Лента заказов</span>
              </a>
            </div>
          </div>
          <div className={style.header_logo}>
            <Logo />
          </div>
          <div className={style.user}>
            <a href="#">
              <ProfileIcon type="secondary" />
              <span>Личный кабинет</span>
            </a>
          </div>
        </section>
      </div>
    </header>
  );
};
