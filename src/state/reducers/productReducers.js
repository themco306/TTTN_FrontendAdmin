import { ProductActionTypes } from "../actions/productActions";






const initialState = {
  product:{},
  products: [],
  // parentCate:[],
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_PRODUCT:
        return {
          ...state,
          product: action.payload,
        };
    //     case CategoryActionTypes.CLEAR_CATEGORY:
    //       return {
    //         ...state,
    //         category: {},
    //       };
    case ProductActionTypes.LIST_PRODUCT:
        return {
          ...state,
          products: action.payload,
        };
    // case CategoryActionTypes.LIST_PARENT_CATEGORY:
    //     return {
    //       ...state,
    //       parentCate: action.payload,
    //     };
    // case CategoryActionTypes.ADD_CATEGORY:
    //   return {
    //     ...state,
    //     categories: [...state.categories, action.payload],
    //   };
    case ProductActionTypes.UPDATE_PRODUCT:
      const updated = state.products.map(data =>
        data.id === action.payload.id ? action.payload : data
      );
      return {
        ...state,
        products: updated,
      };
      case ProductActionTypes.DELETE_PRODUCT:
        return{
            ...state,
            products : state.products.filter(i=> i.id !== parseInt(action.payload)),
         };
         case ProductActionTypes.DELETE_PRODUCTS:
          return {
            ...state,
            products: state.products.filter(i => !action.payload.includes(i.id)),
          };
        
    default:
      return state;
  }
};

export default productReducers;
