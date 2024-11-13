import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { getUserDataSelector } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItemsSelector,
  resetConstructorItems
} from '../../services/slices/constructorItemsSlice';
import {
  getOrderRequestSelector,
  getOrderResponseSelector,
  orderBurger,
  resetOrderResponse
} from '../../services/slices/ordersSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUserDataSelector);
  const constructorItems = useSelector(getConstructorItemsSelector);
  const orderRequest = useSelector(getOrderRequestSelector);
  const orderModalData = useSelector(getOrderResponseSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(orderBurger(constructorItems));
    dispatch(resetConstructorItems());
  };

  const closeOrderModal = () => {
    dispatch(resetOrderResponse());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
