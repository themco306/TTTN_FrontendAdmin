

export const ProductActionTypes = {
    LIST_PRODUCT: 'LIST_PRODUCT',
    SET_PRODUCT: 'SET_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    DELETE_PRODUCTS: 'DELETE_PRODUCTS',
  };
  
  export const productActions = {
    listProduct: (items) => ({
      type: ProductActionTypes.LIST_PRODUCT,
      payload: items,
    }),
    setProduct: (item) => ({
      type: ProductActionTypes.SET_PRODUCT,
      payload: item,
    }),
    updateProduct: (item) => ({
      type: ProductActionTypes.UPDATE_PRODUCT,
      payload: item,
    }),
  
    deleteProduct: (item) => ({
      type: ProductActionTypes.DELETE_PRODUCT,
      payload: item,
    }),
  
    deleteProducts: (ids) => ({
      type: ProductActionTypes.DELETE_PRODUCTS,
      payload: ids,
    }),
  };
  