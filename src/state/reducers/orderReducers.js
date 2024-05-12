import { OrderActionTypes } from "../actions/orderActions";

const initialState = {
  order: {},
  orders: [],
};

const orderReducers = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionTypes.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case OrderActionTypes.LIST_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case OrderActionTypes.UPDATE_ORDER:
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.id ? action.payload : order
      );
      return {
        ...state,
        orders: updatedOrders,
      };
    case OrderActionTypes.DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== parseInt(action.payload)),
      };
    case OrderActionTypes.DELETE_ORDERS:
      return {
        ...state,
        orders: state.orders.filter(order => !action.payload.includes(order.id)),
      };
    default:
      return state;
  }
};

export default orderReducers;
