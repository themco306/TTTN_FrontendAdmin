import { SignalrActionTypes } from "../actions/signalrAction";







const initialState = {
  adminOnline:0,
  customerOnline:0,

};

const signalrReducers = (state = initialState, action) => {
  switch (action.type) {
    case SignalrActionTypes.SET_COUNT_USER_ONLINE:
        return{
            ...state,
            adminOnline:action.payload.adminOnline,
            customerOnline:action.payload.customerOnline,

        }
    default:
      return state;
  }
};

export default signalrReducers;
