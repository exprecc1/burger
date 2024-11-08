import React from 'react';
import { Route, Routes, useLocation, Location, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from './components/app-header/app-header';
import { HomePage } from './page/home';
import { Modal } from './components/modal/modal';
import { LoginPage } from './components/login/login';
import { RegisterPage } from './components/register/register';
import { ForgotPasswordPage } from './components/forgot-password/forgot-password';
import { ResetPasswordPage } from './components/reset-password/reset-password';
import { ProfilePage } from './components/profile/profile';
import { IngredientDetailsPage } from './components/burger-ingredients/burger-ingredients-page/burger-ingredients-page';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';

import { checkUserAuth, fetchUser } from './services/slices/user/action';
import { fetchAllIngredients } from './services/slices/all-ingredients/slice';

import './App.css';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const location: Location = useLocation();
  const backgroundLocation: string = location.state?.backgroundLocation;
  const navigate = useNavigate();
  // @ts-ignore
  const { loading, error } = useSelector((state) => state.ingredientsAll);

  // Получение данных с api
  React.useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  React.useEffect(() => {
    // @ts-ignore
    dispatch(checkUserAuth());
    // @ts-ignore
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password/:token"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route path="/ingredient/:id" element={<IngredientDetailsPage />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredient/:id"
            element={
              <Modal onClose={() => navigate(-1)}>
                <IngredientDetailsPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
