import React from 'react';
import style from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/slices/user/action';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    setTimeout(() => passwordRef.current.focus(), 0);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      const from = location.state?.from || '/';
      navigate(from);
    } catch (error) {
      console.error('Login failed:', error);
    }
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
      <Button onClick={handleLogin} htmlType="button" type="primary" size="medium">
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
