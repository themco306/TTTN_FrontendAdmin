

export const MenuActionTypes = {
    LIST_MENU: 'LIST_MENU',
    SET_MENU: 'SET_MENU',
    UPDATE_MENU: 'UPDATE_MENU',
    UPDATE_STATUS_MENU:'UPDATE_STATUS_MENU',
    DELETE_MENU: 'DELETE_MENU',
    DELETE_MENUS: 'DELETE_MENUS',
  };
  
  export const menuActions = {
    listMenu: (items) => ({
      type: MenuActionTypes.LIST_MENU,
      payload: items,
    }),
    setMenu: (item) => ({
      type: MenuActionTypes.SET_MENU,
      payload: item,
    }),
    updateMenu: (item) => ({
      type: MenuActionTypes.UPDATE_MENU,
      payload: item,
    }),
    updateStatusMenu: (item) => ({
      type: MenuActionTypes.UPDATE_STATUS_MENU,
      payload:item,
    }),
    deleteMenu: (item) => ({
      type: MenuActionTypes.DELETE_MENU,
      payload: item,
    }),
  
    deleteMenus: (ids) => ({
      type: MenuActionTypes.DELETE_MENUS,
      payload: ids,
    }),
  };
  