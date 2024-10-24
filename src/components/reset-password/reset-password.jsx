import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import style from './reset-password.module.css';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [tokenEmail, setTokenEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const passwordRef = React.useRef(null);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    setTimeout(() => passwordRef.current.focus(), 0);
  };

  const onResetPassword = async () => {
    try {
      await api.resetPassword(password, tokenEmail);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
    console.log(token);
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
          onChange={(e) => setTokenEmail(e.target.value)}
          value={tokenEmail}
          name={'name'}
          error={false}
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
