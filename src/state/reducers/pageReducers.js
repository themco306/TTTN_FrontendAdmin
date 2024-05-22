import { PageActionTypes } from "../actions/pageActions";


const initialState = {
  page: {},
  pages: [],
};

const pageReducers = (state = initialState, action) => {
  switch (action.type) {
    case PageActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case PageActionTypes.LIST_PAGE:
      return {
        ...state,
        pages: action.payload,
      };
      case PageActionTypes.UPDATE_STATUS_PAGE:
        const userIdToUpdate = action.payload;
  
        // Tìm người dùng trong danh sách users
        const updatedUsers = state.pages.map((user) =>
          user.id === userIdToUpdate
            ? { ...user, status: user.status==1?0:1 } // Đảo ngược trạng thái emailConfirmed
            : user
        );
        return {
          ...state,
          pages: updatedUsers,
        };
    case PageActionTypes.UPDATE_PAGE:
      const updated = state.pages.map((data) =>
        data.id === action.payload.id ? action.payload : data
      );
      return {
        ...state,
        pages: updated,
      };
    case PageActionTypes.DELETE_PAGE:
      return {
        ...state,
        pages: state.pages.filter((i) => i.id !== action.payload),
      };
    case PageActionTypes.DELETE_PAGES:
      return {
        ...state,
        pages: state.pages.filter((i) => !action.payload.includes(i.id)),
      };

    default:
      return state;
  }
};

export default pageReducers;
