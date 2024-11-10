import React, { FunctionComponent } from 'react';
import style from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation, Location } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/slices/user/action';

interface ILocation {
  from?: string;
}

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location: Location<ILocation> = useLocation();

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }, 0);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //@ts-ignore
      await dispatch(login({ email, password }));
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={style.container_box}>
      <h3>Вход</h3>
      <form onSubmit={handleLogin}>
        <div className={style.input__container}>
          <Input
            type={'text'}
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
            icon={'ShowIcon'}
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
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div className={style.conteiner__footer}>
        <p>
          Вы — новый пользователь?
          <Link to="/register"> Зарегистрироваться</Link>
        </p>
        <p>
          Забыли пароль?
          <Link to="/forgot-password"> Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
};
