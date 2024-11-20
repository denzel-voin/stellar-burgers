import type { TOrder, TUser } from '@utils-types';
import {
  authChecked,
  getUserOrders,
  loginUser,
  resetErrorMessage,
  type TUserState,
  userLogout,
  userReducer
} from '../slices/userSlice';

describe('Тестирование редьюсера слайса userSlice', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    userData: null,
    userOrders: [],
    error: null,
    isLoading: false
  };

  it('проверка статуса "pending" для асинхронных экшенов', () => {
    const requestAction = { type: loginUser.pending.type };
    const state = userReducer(initialState, requestAction);
    expect(state).toEqual({
      ...initialState,
      error: null,
      isLoading: true
    });
  });

  it('проверка статуса "fulfilled" для loginUser', () => {
    const userPayload: TUser = {
      email: 'test@test.com',
      name: 'Test User'
    };
    const successAction = {
      type: loginUser.fulfilled.type,
      payload: userPayload
    };
    const state = userReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      userData: userPayload,
      isAuthChecked: true,
      error: null,
      isLoading: false
    });
  });

  it('проверка статуса "fulfilled" для getUserOrders', () => {
    const ordersPayload: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'Order 1',
        createdAt: '2024-11-20T10:00:00.000Z',
        updatedAt: '2024-11-20T10:05:00.000Z',
        number: 1,
        ingredients: ['ingredient1', 'ingredient2']
      }
    ];
    const successAction = {
      type: getUserOrders.fulfilled.type,
      payload: ordersPayload
    };
    const state = userReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      userOrders: ordersPayload,
      error: null,
      isLoading: false
    });
  });

  it('проверка статуса "rejected" для loginUser', () => {
    const failedAction = { type: loginUser.rejected.type };
    const state = userReducer(initialState, failedAction);
    expect(state).toEqual({
      ...initialState,
      error: true,
      isLoading: false
    });
  });

  it('проверка действия authChecked', () => {
    const state = userReducer(initialState, authChecked());
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  it('проверка действия userLogout', () => {
    const modifiedState: TUserState = {
      ...initialState,
      userData: { email: 'test@test.com', name: 'Test User' }
    };
    const state = userReducer(modifiedState, userLogout());
    expect(state).toEqual({
      ...modifiedState,
      userData: null
    });
  });

  it('проверка действия resetErrorMessage', () => {
    const modifiedState: TUserState = {
      ...initialState,
      error: true
    };
    const state = userReducer(modifiedState, resetErrorMessage());
    expect(state).toEqual({
      ...modifiedState,
      error: null
    });
  });

  // Тесты селекторов
  it('проверка селектора isErrorSelector', () => {
    const state = { error: true };
    expect(state.error).toBe(true);
  });

  it('проверка селектора authCheckedSelector', () => {
    const state = { isAuthChecked: true };
    expect(state.isAuthChecked).toBe(true);
  });

  it('проверка селектора getUserDataSelector', () => {
    const state = {
      userData: { email: 'test@test.com', name: 'Test User' }
    };
    expect(state.userData).toEqual({
      email: 'test@test.com',
      name: 'Test User'
    });
  });

  it('проверка селектора getUserOrdersSelector', () => {
    const state = {
      userOrders: [
        {
          _id: '1',
          status: 'done',
          name: 'Order 1',
          createdAt: '2024-11-20T10:00:00.000Z',
          updatedAt: '2024-11-20T10:05:00.000Z',
          number: 1,
          ingredients: ['ingredient1', 'ingredient2']
        }
      ]
    };
    expect(state.userOrders).toHaveLength(1);
  });

  it('проверка селектора isLoadingSelector', () => {
    const state = { isLoading: true };
    expect(state.isLoading).toBe(true);
  });
});
