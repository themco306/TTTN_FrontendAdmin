import { SignalrActionTypes } from "../actions/signalrAction";







const initialState = {
  adminOnline:0,
  customerOnline:0,
  messages:[],
  readMessages: [],
};

const signalrReducers = (state = initialState, action) => {
  switch (action.type) {
    case SignalrActionTypes.SET_COUNT_USER_ONLINE:
        return{
            ...state,
            adminOnline:action.payload.adminOnline,
            customerOnline:action.payload.customerOnline,

        }
        case SignalrActionTypes.SET_MESSAGE:
          return{
            ...state,
            messages: [action.payload, ...state.messages]
          }
          case SignalrActionTypes.SET_READ_MESSAGES:
            return {
                ...state,
                readMessages: action.payload,
            };
    default:
      return state;
  }
};

export default signalrReducers;
