import React from 'react';
import { Route, Routes, useLocation, Location, useNavigate } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from './services/store';
import { AppHeader } from './components/app-header/app-header';
import { HomePage } from './page/home';
import { FeedPage } from './page/feed';
import { Modal } from './components/modal/modal';
import { LoginPage } from './components/login/login';
import { RegisterPage } from './components/register/register';
import { ForgotPasswordPage } from './components/forgot-password/forgot-password';
import { ResetPasswordPage } from './components/reset-password/reset-password';
import { ProfilePage } from './components/profile/profile';
import { ProfileSetting } from './components/profile/profile-setting/profile-setting';
import { ProfileOrderFeed } from './components/profile/order-feed/order-feed';
import { OrderStructurePage } from './components/feed/order-structure-page/order-structure-page';

import { IngredientDetailsPage } from './components/burger-ingredients/burger-ingredients-page/burger-ingredients-page';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';

import { checkUserAuth, fetchUser } from './services/slices/user/action';
import { fetchAllIngredients } from './services/slices/all-ingredients/slice';

import { Ingredient } from './utils/types';

import './App.css';
import { OrderStructureModal } from './components/feed/order-structure-modal/order-structure';

interface LocationState {
  backgroundLocation: string;
}
function App(): JSX.Element {
  const dispatch = useDispatch();
  const location: Location<LocationState> = useLocation();
  const backgroundLocation: string = location.state?.backgroundLocation;
  const navigate = useNavigate();

  const { status, error } = useSelector((state: RootState) => state.ingredientsAll);

  // Получение данных с api
  React.useEffect(() => {
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchUser());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:number" element={<OrderStructurePage />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
          <Route index element={<OnlyAuth component={<ProfileSetting />} />} />
          <Route path="orders" element={<OnlyAuth component={<ProfileOrderFeed />} />} />
        </Route>
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
          <Route
            path="/feed/:number"
            element={
              <Modal onClose={() => navigate(-1)}>
                <OrderStructurePage />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
