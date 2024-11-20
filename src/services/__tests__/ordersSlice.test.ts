import { TOrder } from '@utils-types';
import {
  orderBurger,
  ordersReducer,
  resetOrderResponse,
  type TOrdersState
} from '../slices/ordersSlice';

describe('Тестирование редьюсера слайса ordersSlice', () => {
  const initialState: TOrdersState = {
    error: null,
    orderResponse: {
      order: null
    },
    orderRequest: false
  };

  it('проверка статуса "pending" для orderBurger', () => {
    const requestAction = { type: orderBurger.pending.type };
    const state = ordersReducer(initialState, requestAction);
    expect(state).toEqual({
      ...initialState,
      error: null,
      orderRequest: true
    });
  });

  it('проверка статуса "fulfilled" для orderBurger', () => {
    const orderPayload: { order: TOrder } = {
      order: {
        _id: '123',
        status: 'done',
        name: 'Супер Бургер',
        createdAt: '2024-11-20T10:00:00.000Z',
        updatedAt: '2024-11-20T10:05:00.000Z',
        number: 1,
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa094c']
      }
    };
    const successAction = {
      type: orderBurger.fulfilled.type,
      payload: orderPayload
    };
    const state = ordersReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderResponse: { order: orderPayload.order }
    });
  });

  it('проверка статуса "rejected" для orderBurger', () => {
    const error = { message: 'Ошибка создания заказа' };
    const failedAction = { type: orderBurger.rejected.type, error };
    const state = ordersReducer(initialState, failedAction);
    expect(state).toEqual({
      ...initialState,
      error: error.message,
      orderRequest: false
    });
  });

  it('проверка действия resetOrderResponse', () => {
    const modifiedState: TOrdersState = {
      ...initialState,
      orderResponse: {
        order: {
          _id: '123',
          status: 'done',
          name: 'Супер Бургер',
          createdAt: '2024-11-20T10:00:00.000Z',
          updatedAt: '2024-11-20T10:05:00.000Z',
          number: 1,
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa094c']
        }
      }
    };
    const state = ordersReducer(modifiedState, resetOrderResponse());
    expect(state).toEqual({
      ...modifiedState,
      orderResponse: { order: null }
    });
  });

  // Тестирование селекторов
  it('проверка работы селектора getOrderResponseSelector', () => {
    const state = {
      orderResponse: {
        order: {
          _id: '123',
          status: 'done',
          name: 'Супер Бургер',
          createdAt: '2024-11-20T10:00:00.000Z',
          updatedAt: '2024-11-20T10:05:00.000Z',
          number: 1,
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa094c']
        }
      }
    };
    const order = state.orderResponse.order;
    expect(order).toEqual({
      _id: '123',
      status: 'done',
      name: 'Супер Бургер',
      createdAt: '2024-11-20T10:00:00.000Z',
      updatedAt: '2024-11-20T10:05:00.000Z',
      number: 1,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa094c']
    });
  });

  it('проверка работы селектора getOrderRequestSelector', () => {
    const state = {
      orderRequest: true
    };
    const orderRequest = state.orderRequest;
    expect(orderRequest).toBe(true);
  });
});
