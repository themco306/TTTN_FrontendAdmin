

export const BrandActionTypes = {
  LIST_BRAND: 'LIST_BRAND',
  BRAND: 'BRAND',
  SET_BRAND: 'SET_BRAND',
  CLEAR_BRAND: 'CLEAR_BRAND',
  ADD_BRAND: 'ADD_BRAND',
  UPDATE_BRAND: 'UPDATE_BRAND',
  UPDATE_STATUS_BRAND:"UPDATE_STATUS_BRAND",
  DELETE_BRAND: 'DELETE_BRAND',
  DELETE_BRANDS: 'DELETE_BRANDS',
};

export const brandActions = {
  listBrand: (items) => ({
    type: BrandActionTypes.LIST_BRAND,
    payload: items,
  }),

  setBrand: (item) => ({
    type: BrandActionTypes.SET_BRAND,
    payload: item,
  }),

  clearBrand: () => ({
    type: BrandActionTypes.CLEAR_BRAND,
  }),

  addBrand: (item) => ({
    type: BrandActionTypes.ADD_BRAND,
    payload: item,
  }),

  updateBrand: (item) => ({
    type: BrandActionTypes.UPDATE_BRAND,
    payload: item,
  }),
  updateStatusBrand: (item) => ({
    type: BrandActionTypes.UPDATE_STATUS_BRAND,
    payload:item,
  }),
  deleteBrand: (category) => ({
    type: BrandActionTypes.DELETE_BRAND,
    payload: category,
  }),

  deleteBrands: (ids) => ({
    type: BrandActionTypes.DELETE_BRANDS,
    payload: ids,
  }),
};
