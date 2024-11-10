import React, { FunctionComponent } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import style from './reset-password.module.css';

export const ResetPasswordPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [tokenEmail, setTokenEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }, 0);
  };

  const onResetPassword = async () => {
    try {
      await api.resetPassword(password, tokenEmail);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
  };

  if (!token) {
    <div>Loading.....</div>;
  }
  console.log(token);

  return (
    <div className={style.container_box}>
      <h3>Восстановление пароля</h3>
      <form onSubmit={onResetPassword}>
        <div className={style.input__container}>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={'Введите новый пароль'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenEmail(e.target.value)}
            value={tokenEmail}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className={style.conteiner__footer}>
        <p>
          Вспомнили пароль?
          <Link to="/login"> Войти</Link>
        </p>
      </div>
    </div>
  );
};
