import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { constructorItemsReducer } from '../slices/constructorItemsSlice';
import { feedsReducer } from '../slices/feedsSlice';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { ordersReducer } from '../slices/ordersSlice';
import { userReducer } from '../slices/userSlice';

it('Тестирование корневого редьюсера', () => {
  const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorItems: constructorItemsReducer,
    feeds: feedsReducer,
    orders: ordersReducer,
    user: userReducer
  });

  const store = configureStore({
    reducer: rootReducer
  });

  expect(store.getState()).toEqual(
    rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
  );
});
