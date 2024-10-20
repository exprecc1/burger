import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import style from './forgot-password.module.css';
export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const emailRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Отправка запроса на восстановление пароля
    navigate('/forgot-password/reset-password');
  };

  return (
    <div className={style.container_box}>
      <h3>Восстановление пароля</h3>
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
      <Button htmlType="button" type="primary" size="medium" onClick={handleSubmit}>
        Восстановить
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
