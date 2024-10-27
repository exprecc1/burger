import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getIsAuthChecked, getUser } from '../services/slices/user/user';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const location = useLocation();

  // url == /profile, onlyUnAuth = false, user = null
  // url == /login, from == /profile, onlyUnAuth == true, user = null
  // url == /login, from == /profile, onlyUnAuth == true, user != null
  // url == /profile, onlyUnAuth = false, user != null
  // url == /profile, onlyUnAuth = false, user = null

  if (!isAuthChecked) {
    return <p>Загрузка...</p>;
  }

  if (!onlyUnAuth && !user) {
    // для авторизованных, но неавторизован
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // для неавторизованных, но авторизован
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // !onlyUnAuth && user  для авторизованных и авторизован
  // onlyUnAuth && !user для неавторизованных и неавторизован

  return component;
};

export const OnlyAuth = ({ component }) => <Protected onlyUnAuth={false} component={component} />;
export const OnlyUnAuth = ({ component }) => <Protected onlyUnAuth={true} component={component} />;

Protected.propTypes = {
  component: PropTypes.element.isRequired,
  onlyUnAuth: PropTypes.bool.isRequired,
};

OnlyAuth.propTypes = {
  component: PropTypes.element.isRequired,
};

OnlyUnAuth.propTypes = {
  component: PropTypes.element.isRequired,
};
