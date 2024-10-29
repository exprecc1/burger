import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.ingredientsAll);

  // Получение данных с api
  React.useEffect(() => {
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(checkUserAuth());
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
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
        <Route exact path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route exact path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route
          exact
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          exact
          path="/reset-password/:token"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route exact path="/ingredient/:id" element={<IngredientDetailsPage />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            exact
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
