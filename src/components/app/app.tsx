import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { Route, Routes } from 'react-router-dom';
import { getBurgerIngredients } from '../../services/slices/ingredientsSlice';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Заказ' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>

        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Описание заказа' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Ингредиенты' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
