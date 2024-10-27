import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppHeader } from './components/app-header/app-header';
import { HomePage } from './page/home';
import { useModal } from './hooks/useModal';
import { Modal } from './components/modal/modal';
import { LoginPage } from './components/login/login';
import { RegisterPage } from './components/register/register';
import { ForgotPasswordPage } from './components/forgot-password/forgot-password';
import { ResetPasswordPage } from './components/reset-password/reset-password';
import { ProfilePage } from './components/profile/profile';
import { IngredientDetailsPage } from './components/burger-ingredients/burger-ingredients-page/burger-ingredients-page';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';

import { checkUserAuth, fetchUser } from './services/slices/user/action';

import './App.css';

function App() {
  const { isModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  React.useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchUser());
  }, [dispatch]);

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
            element={<Modal isVisible={isModal} onClose={closeModal} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
