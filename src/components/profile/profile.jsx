import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/slices/user/user';
import { logout, fetchUser, updateUser } from '../../services/slices/user/action';
import style from './profile.module.css';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [name, setName] = React.useState(user?.name || '');
  const [email, setEmail] = React.useState(user?.email || '');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  React.useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
  }, [user]);

  const onIconClick = () => {
    setShowPassword(!showPassword);
    setTimeout(() => passwordRef.current.focus(), 0);
  };

  const handleInputChange = (e, setValue) => {
    setValue(e.target.value);
    setShowButton(true);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser({ name, email, password }));
      setShowButton(false);
      alert('Данные успешно обновлены');
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPassword(user?.password || '');
    setShowButton(false);
  };

  return (
    <div className={style.container__box}>
      <nav className={style.nav__profile}>
        <div className={style.nav__title}>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? style.active : style.nav__link)}
          >
            Профиль
          </NavLink>
        </div>
        <div className={style.nav__title}>
          <Link to="/profile/orders" className={style.nav__link}>
            История заказов
          </Link>
        </div>
        <div className={style.nav__title}>
          <NavLink to="#" className={style.nav__link} onClick={handleLogout}>
            Выход
          </NavLink>
        </div>
        <div className={style.nav__footer}>
          <p>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
      </nav>
      <div className={style.setting__profile}>
        <form onSubmit={handleSave}>
          <div className={style.input__container}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={(e) => handleInputChange(e, setName)}
              value={name}
              icon={'EditIcon'}
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
              onChange={(e) => handleInputChange(e, setEmail)}
              value={email}
              icon={'EditIcon'}
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
              onChange={(e) => handleInputChange(e, setPassword)}
              icon={'EditIcon'}
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

          {showButton && (
            <div className={style.buttons__container}>
              <span onClick={handleCancel} className={style.cancel}>
                Отмена
              </span>
              <Button
                onClick={handleSave}
                htmlType="button"
                type="primary"
                size="small"
                extraClass="ml-2"
              >
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
