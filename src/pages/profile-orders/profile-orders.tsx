import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import {
  getUserOrders,
  getUserOrdersSelector
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { FC, useEffect } from 'react';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getUserOrdersSelector);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (!orders) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
