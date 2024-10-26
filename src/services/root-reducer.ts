import { combineReducers } from '@reduxjs/toolkit';
import { constructorItemsReducer } from './slices/constructorItemsSlice';
import { feedsReducer } from './slices/feedsSlice';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { ordersReducer } from './slices/ordersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  orders: ordersReducer,
  feeds: feedsReducer
});
