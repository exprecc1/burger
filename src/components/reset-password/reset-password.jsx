import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import style from './reset-password.module.css';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    setTimeout(() => passwordRef.current.focus(), 0);
  };

  const onResetPassword = () => {
    // Вызов функции обратного вызова для смены пароля
    navigate('/', { replace: true });
  };

  return (
    <div className={style.container_box}>
      <h3>Восстановление пароля</h3>
      <div className={style.input__container}>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'name'}
          error={false}
          ref={passwordRef}
          errorText={'Ошибка'}
          onIconClick={onIconClick}
          size={'default'}
          extraClass="ml-1"
        />
      </div>
      <div className={style.input__container}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
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
      <Button htmlType="button" type="primary" size="medium" onClick={onResetPassword}>
        Сохранить
      </Button>
      <div className={style.conteiner__footer}>
        <p>
          Вспомнили пароль?
          <Link to="/login"> Войти</Link>
        </p>
      </div>
    </div>
  );
};
