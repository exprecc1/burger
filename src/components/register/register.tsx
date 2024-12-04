import React, { FunctionComponent } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/user/action';
import style from './register.module.css';

export const RegisterPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const nameRef = React.useRef<HTMLInputElement | null>(null);
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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //@ts-ignore
      await dispatch(registerUser({ name, email, password }));
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className={style.container_box}>
      <h3>Регистрация</h3>
      <form onSubmit={handleRegister}>
        <div className={style.input__container}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            value={name}
            name={'name'}
            error={false}
            ref={nameRef}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
        <div className={style.input__container}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            value={email}
            name={'email'}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            icon={'ShowIcon'}
            value={password}
            name={'password'}
            error={false}
            ref={passwordRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div className={style.conteiner__footer}>
        <p>
          Уже зарегистрированы?
          <Link to="/login"> Войти</Link>
        </p>
      </div>
    </div>
  );
};
