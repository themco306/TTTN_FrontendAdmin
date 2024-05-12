import { UserActionTypes } from "../actions/userActions";

const initialState = {
  user: {},
  users: [],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserActionTypes.LIST_USER:
      return {
        ...state,
        users: action.payload,
      };
    case UserActionTypes.UPDATE_STATUS_USER:
      const userIdToUpdate = action.payload;

      // Tìm người dùng trong danh sách users
      const updatedUsers = state.users.map((user) =>
        user.id === userIdToUpdate
          ? { ...user, emailConfirmed: !user.emailConfirmed } // Đảo ngược trạng thái emailConfirmed
          : user
      );

      return {
        ...state,
        users: updatedUsers,
      };
    case UserActionTypes.UPDATE_USER:
      const updated = state.users.map((data) =>
        data.id === action.payload.id ? action.payload : data
      );
      return {
        ...state,
        users: updated,
      };
    case UserActionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((i) => i.id !== action.payload),
      };
    case UserActionTypes.DELETE_USERS:
      return {
        ...state,
        users: state.users.filter((i) => !action.payload.includes(i.id)),
      };

    default:
      return state;
  }
};

export default userReducers;
