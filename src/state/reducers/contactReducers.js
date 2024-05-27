import { ContactActionTypes } from "../actions/contactActions";








const initialState = {
  contact:{},
  contacts: [],
};

const contactReducers = (state = initialState, action) => {
  switch (action.type) {
    case ContactActionTypes.SET_CONTACT:
        return {
          ...state,
          contact: action.payload,
        };
    case ContactActionTypes.LIST_CONTACT:
        return {
          ...state,
          contacts: action.payload,
        };
    case ContactActionTypes.UPDATE_CONTACT:
      const updated = state.contacts.map(data =>
        data.id === action.payload.id ? action.payload : data
      );
      return {
        ...state,
        contacts: updated,
      };
      case ContactActionTypes.DELETE_CONTACT:
        return{
            ...state,
            contacts : state.contacts.filter(i=> i.id !== parseInt(action.payload)),
         };
         case ContactActionTypes.DELETE_CONTACTS:
          return {
            ...state,
            contacts: state.contacts.filter(i => !action.payload.includes(i.id)),
          };
    default:
      return state;
  }
};

export default contactReducers;
