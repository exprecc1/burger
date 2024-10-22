import React from 'react';
import style from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
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
    <div className={style.container_box}>
      <h3>Вход</h3>
      <div className={style.input__container}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          icon={'CurrencyIcon'}
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
      <Button htmlType="button" type="primary" size="medium">
        Войти
      </Button>
      <div className={style.conteiner__footer}>
        <p>
          Вы — новый пользователь?
          <Link to="/forgot-password"> Зарегистрироваться</Link>
        </p>
        <p>
          Забыли пароль?
          <Link to="/register"> Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
};
