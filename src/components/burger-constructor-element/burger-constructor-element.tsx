import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { useDispatch } from '../../services/store';
import {
  moveDownConstructorItem,
  moveUpConstructorItem,
  removeConstructorItem
} from '../../services/slices/constructorItemsSlice';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveDownConstructorItem(ingredient));
    };

    const handleMoveUp = () => {
      dispatch(moveUpConstructorItem(ingredient));
    };

    const handleClose = () => {
      dispatch(removeConstructorItem(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
