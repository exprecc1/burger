import React from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

import style from './profile.module.css';

export const ProfilePage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    setTimeout(() => passwordRef.current.focus(), 0);
  };
  return (
    <div className={style.container__box}>
      <nav className={style.nav__profile}>
        <div className={style.nav__title}>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? style.active : style.nav__link)}
          >
            Профиль
          </NavLink>
        </div>
        <div className={style.nav__title}>
          <Link to="#" className={style.nav__link}>
            История заказов
          </Link>
        </div>
        <div className={style.nav__title}>
          <Link to="#" className={style.nav__link}>
            Выход
          </Link>
        </div>
        <div className={style.nav__footer}>
          <p>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
      </nav>
      <div className={style.setting__profile}>
        <div className={style.input__container}>
          <Input
            type={'email'}
            placeholder={'Имя'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            icon={'EditIcon'}
            name={'name'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
        <div className={style.input__container}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            icon={'EditIcon'}
            name={'name'}
            error={false}
            ref={emailRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
        <div className={style.input__container}>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={(e) => setPassword(e.target.value)}
            icon={'EditIcon'}
            value={password}
            name={'name'}
            error={false}
            ref={passwordRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
      </div>
    </div>
  );
};
