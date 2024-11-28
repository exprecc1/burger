import React, { FunctionComponent } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Location } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logout, fetchUser } from '../../services/slices/user/action';
import style from './profile.module.css';

export const ProfilePage: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location: Location<string> = useLocation();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isProfileActive = location.pathname === '/profile';
  const isOrdersActive = location.pathname === '/profile/orders';

  return (
    <div className={style.container__box}>
      <div className={style.box}>
        <nav className={style.nav__profile}>
          <div className={style.nav__title}>
            <NavLink to="/profile" className={isProfileActive ? style.active : style.nav__link}>
              Профиль
            </NavLink>
          </div>
          <div className={style.nav__title}>
            <NavLink
              to="/profile/orders"
              className={isOrdersActive ? style.active : style.nav__link}
            >
              История заказов
            </NavLink>
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
        <Outlet />
      </div>
    </div>
  );
};
