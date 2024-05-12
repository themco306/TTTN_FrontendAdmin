

export const CategoryActionTypes = {
  LIST_CATEGORY: 'LIST_CATEGORY',
  LIST_PARENT_CATEGORY: 'LIST_PARENT_CATEGORY',
  CATEGORY: 'CATEGORY',
  SET_CATEGORY: 'SET_CATEGORY',
  CLEAR_CATEGORY: 'CLEAR_CATEGORY',
  ADD_CATEGORY: 'ADD_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
  DELETE_CATEGORIES: 'DELETE_CATEGORIES',
};

export const categoryActions = {
  listCategory: (items) => ({
    type: CategoryActionTypes.LIST_CATEGORY,
    payload: items,
  }),

  listParentCategory: (items) => ({
    type: CategoryActionTypes.LIST_PARENT_CATEGORY,
    payload: items,
  }),

  setCategory: (item) => ({
    type: CategoryActionTypes.SET_CATEGORY,
    payload: item,
  }),

  clearCategory: () => ({
    type: CategoryActionTypes.CLEAR_CATEGORY,
  }),

  addCategory: (item) => ({
    type: CategoryActionTypes.ADD_CATEGORY,
    payload: item,
  }),

  updateCategory: (item) => ({
    type: CategoryActionTypes.UPDATE_CATEGORY,
    payload: item,
  }),

  deleteCategory: (category) => ({
    type: CategoryActionTypes.DELETE_CATEGORY,
    payload: category,
  }),

  deleteCategories: (ids) => ({
    type: CategoryActionTypes.DELETE_CATEGORIES,
    payload: ids,
  }),
};
