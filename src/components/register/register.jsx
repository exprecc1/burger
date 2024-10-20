import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import style from './register.module.css';

export const RegisterPage = () => {
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
      <h3>Регистрация</h3>
      <div className={style.input__container}>
        <Input
          type={'email'}
          placeholder={'Имя'}
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
        Зарегистрироваться
      </Button>
      <div className={style.conteiner__footer}>
        <p>
          Уже зарегистрированы?
          <Link to="/login"> Войти</Link>
        </p>
      </div>
    </div>
  );
};
