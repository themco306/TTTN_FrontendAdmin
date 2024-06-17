import { WebInfoActionTypes } from "../actions/webInfoActions";







const initialState = {
  webInfo:{},
};

const webInfoReducers = (state = initialState, action) => {
  switch (action.type) {
    case WebInfoActionTypes.LIST_WEBINFO:
        return {
          webInfo: action.payload,
        };
        
    default:
      return state;
  }
};

export default webInfoReducers;
