import React, { FunctionComponent } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { IPasswordResetResponse } from '../../utils/api';
import style from './forgot-password.module.css';

interface IForgotPasswordResponse extends IPasswordResetResponse {
  success?: boolean;
}

export const ForgotPasswordPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState<string>('');
  const emailRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: IForgotPasswordResponse = await api.forgotPassword(email);
      if (response.success) {
        const token = localStorage.getItem('accessToken');
        navigate(`/reset-password/${token}`);
      }
    } catch (error) {
      console.error('Ошибка отправки сброса по почте:', error);
    }
  };

  return (
    <div className={style.container_box}>
      <h3>Восстановление пароля</h3>
      <form onSubmit={handleSubmit}>
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
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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
