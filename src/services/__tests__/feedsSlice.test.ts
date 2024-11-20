import {
  feedsReducer,
  getAllFeeds,
  getOrderByNumber,
  type TFeedsState
} from '../slices/feedsSlice';

describe('Тестирование редьюсера слайса feedsSlice', () => {
  const initialState: TFeedsState = {
    error: null,
    feeds: {
      orders: [],
      total: 0,
      totalToday: 0
    },
    orderByNumber: []
  };

  it('проверка статуса "pending" для getAllFeeds', () => {
    const requestAction = { type: getAllFeeds.pending.type };
    const state = feedsReducer(initialState, requestAction);
    expect(state).toEqual({
      ...initialState,
      error: null
    });
  });

  it('проверка статуса "fulfilled" для getAllFeeds', () => {
    const feedsPayload = {
      orders: [{ _id: '1', name: 'Order 1', number: 1 }],
      total: 100,
      totalToday: 50
    };
    const successAction = {
      type: getAllFeeds.fulfilled.type,
      payload: feedsPayload
    };
    const state = feedsReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      error: null,
      feeds: feedsPayload
    });
  });

  it('проверка статуса "rejected" для getAllFeeds', () => {
    const error = { message: 'Ошибка загрузки фидов' };
    const failedAction = { type: getAllFeeds.rejected.type, error };
    const state = feedsReducer(initialState, failedAction);
    expect(state).toEqual({
      ...initialState,
      error: error.message
    });
  });

  it('проверка статуса "pending" для getOrderByNumber', () => {
    const requestAction = { type: getOrderByNumber.pending.type };
    const state = feedsReducer(initialState, requestAction);
    expect(state).toEqual({
      ...initialState,
      error: null
    });
  });

  it('проверка статуса "fulfilled" для getOrderByNumber', () => {
    const orderPayload = {
      orders: [{ _id: '2', name: 'Order 2', number: 2 }]
    };
    const successAction = {
      type: getOrderByNumber.fulfilled.type,
      payload: orderPayload
    };
    const state = feedsReducer(initialState, successAction);
    expect(state).toEqual({
      ...initialState,
      error: null,
      orderByNumber: orderPayload.orders
    });
  });

  it('проверка статуса "rejected" для getOrderByNumber', () => {
    const error = { message: 'Ошибка получения заказа по номеру' };
    const failedAction = { type: getOrderByNumber.rejected.type, error };
    const state = feedsReducer(initialState, failedAction);
    expect(state).toEqual({
      ...initialState,
      error: error.message
    });
  });

  // Тестирование селекторов
  it('проверка работы селектора getAllOrdersSelector', () => {
    const state = {
      feeds: {
        orders: [{ _id: '1', name: 'Order 1', number: 1 }],
        total: 100,
        totalToday: 50
      }
    };
    const orders = state.feeds.orders;
    expect(orders).toEqual([{ _id: '1', name: 'Order 1', number: 1 }]);
  });

  it('проверка работы селектора getFeedsSelector', () => {
    const state = {
      feeds: {
        orders: [{ _id: '1', name: 'Order 1', number: 1 }],
        total: 100,
        totalToday: 50
      }
    };
    expect(state.feeds).toEqual({
      orders: [{ _id: '1', name: 'Order 1', number: 1 }],
      total: 100,
      totalToday: 50
    });
  });

  it('проверка работы селектора getOrderSelector', () => {
    const state = {
      feeds: {
        orderByNumber: [{ _id: '2', name: 'Order 2', number: 2 }]
      }
    };
    expect(state.feeds.orderByNumber[0]).toEqual({
      _id: '2',
      name: 'Order 2',
      number: 2
    });
  });
});
