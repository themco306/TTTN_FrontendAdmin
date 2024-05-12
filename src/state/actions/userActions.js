

export const UserActionTypes = {
    LIST_USER: 'LIST_USER',
    SET_USER: 'SET_USER',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_STATUS_USER:'UPDATE_STATUS_USER',
    DELETE_USER: 'DELETE_USER',
    DELETE_USERS: 'DELETE_USERS',
  };
  
  export const userActions = {
    listUser: (items) => ({
      type: UserActionTypes.LIST_USER,
      payload: items,
    }),
    setUser: (item) => ({
      type: UserActionTypes.SET_USER,
      payload: item,
    }),
    updateUser: (item) => ({
      type: UserActionTypes.UPDATE_USER,
      payload: item,
    }),
    updateStatusUser: (item) => ({
      type: UserActionTypes.UPDATE_STATUS_USER,
      payload:item,
    }),
    deleteUser: (item) => ({
      type: UserActionTypes.DELETE_USER,
      payload: item,
    }),
  
    deleteUsers: (ids) => ({
      type: UserActionTypes.DELETE_USERS,
      payload: ids,
    }),
  };
  