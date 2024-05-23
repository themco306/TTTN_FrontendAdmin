

export const PageActionTypes = {
    LIST_PAGE: 'LIST_PAGE',
    SET_PAGE: 'SET_PAGE',
    UPDATE_PAGE: 'UPDATE_PAGE',
    UPDATE_STATUS_PAGE:'UPDATE_STATUS_PAGE',
    DELETE_PAGE: 'DELETE_PAGE',
    DELETE_PAGES: 'DELETE_PAGES',
    CLEAR_PAGE: 'CLEAR_PAGE',
  };
  
  export const pageActions = {
    listPage: (items) => ({
      type: PageActionTypes.LIST_PAGE,
      payload: items,
    }),
    setPage: (item) => ({
      type: PageActionTypes.SET_PAGE,
      payload: item,
    }),
    updatePage: (item) => ({
      type: PageActionTypes.UPDATE_PAGE,
      payload: item,
    }),
    updateStatusPage: (item) => ({
      type: PageActionTypes.UPDATE_STATUS_PAGE,
      payload:item,
    }),
    deletePage: (item) => ({
      type: PageActionTypes.DELETE_PAGE,
      payload: item,
    }),
  
    deletePages: (ids) => ({
      type: PageActionTypes.DELETE_PAGES,
      payload: ids,
    }),
    clearCategory: () => ({
      type: PageActionTypes.CLEAR_PAGE,
    }),
  };
  