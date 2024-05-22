import { MenuActionTypes } from "../actions/menuActions";








const initialState = {
  menu:{},
  menus: [],
};

const menuReducers = (state = initialState, action) => {
  switch (action.type) {
    case MenuActionTypes.SET_MENU:
        return {
          ...state,
          menu: action.payload,
        };
    case MenuActionTypes.LIST_MENU:
        return {
          ...state,
          menus: action.payload,
        };
    case MenuActionTypes.UPDATE_MENU:
      const updated = state.menus.map(data =>
        data.id === action.payload.id ? action.payload : data
      );
      return {
        ...state,
        menus: updated,
      };
      case MenuActionTypes.DELETE_MENU:
        return{
            ...state,
            menus : state.menus.filter(i=> i.id !== parseInt(action.payload)),
         };
         case MenuActionTypes.DELETE_MENUS:
          return {
            ...state,
            menus: state.menus.filter(i => !action.payload.includes(i.id)),
          };
          case MenuActionTypes.UPDATE_STATUS_MENU:
            const userIdToUpdate = action.payload;
      
            // Tìm người dùng trong danh sách users
            const updatedUsers = state.menus.map((user) =>
              user.id === userIdToUpdate
                ? { ...user, status: user.status==1?0:1 } // Đảo ngược trạng thái emailConfirmed
                : user
            );
            return {
              ...state,
              menus: updatedUsers,
            };
    default:
      return state;
  }
};

export default menuReducers;
