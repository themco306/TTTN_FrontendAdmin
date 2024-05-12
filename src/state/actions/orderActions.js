export const OrderActionTypes = {
  LIST_ORDER: 'LIST_ORDER',
  SET_ORDER: 'SET_ORDER',
  UPDATE_ORDER: 'UPDATE_ORDER',
  DELETE_ORDER: 'DELETE_ORDER',
  DELETE_ORDERS: 'DELETE_ORDERS',
};

export const orderActions = {
  listOrder: (items) => ({
    type: OrderActionTypes.LIST_ORDER,
    payload: items,
  }),
  setOrder: (item) => ({
    type: OrderActionTypes.SET_ORDER,
    payload: item,
  }),
  updateOrder: (item) => ({
    type: OrderActionTypes.UPDATE_ORDER,
    payload: item,
  }),

  deleteOrder: (item) => ({
    type: OrderActionTypes.DELETE_ORDER,
    payload: item,
  }),

  deleteOrders: (ids) => ({
    type: OrderActionTypes.DELETE_ORDERS,
    payload: ids,
  }),
};
