import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/app-header/app-header';
import { HomePage } from './page/home';
import { LoginPage } from './components/login/login';
import { RegisterPage } from './components/register/register';
import { ForgotPasswordPage } from './components/forgot-password/forgot-password';
import { ResetPasswordPage } from './components/reset-password/reset-password';
import { ProfilePage } from './components/profile/profile';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';
import { useDispatch } from 'react-redux';
import { checkUserAuth } from './services/slices/user/action';
import './App.css';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route exact path="/forgot-password/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
