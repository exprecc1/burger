import PropTypes from 'prop-types';
import { useSelector } from '../services/store';
import { getIsAuthChecked, getUser } from '../services/slices/user/user';
import { Navigate, useLocation, Location } from 'react-router-dom';
import { FunctionComponent } from 'react';

interface ProtectedProps {
  onlyUnAuth?: boolean;
  component: React.ReactNode;
}

interface ILocationState {
  from?: string;
}

const Protected: FunctionComponent<ProtectedProps> = ({ onlyUnAuth = false, component }) => {
  const user = useSelector(getUser);
  const isAuthChecked: boolean = useSelector(getIsAuthChecked);
  const location: Location<ILocationState> = useLocation();

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
    const from = location.state?.from || '/';
    return <Navigate to={from} />;
  }

  // !onlyUnAuth && user  для авторизованных и авторизован
  // onlyUnAuth && !user для неавторизованных и неавторизован

  return component;
};

export const OnlyAuth: React.FC<{ component: React.ReactNode }> = ({ component }) => (
  <Protected onlyUnAuth={false} component={component} />
);
export const OnlyUnAuth: React.FC<{ component: React.ReactNode }> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);
