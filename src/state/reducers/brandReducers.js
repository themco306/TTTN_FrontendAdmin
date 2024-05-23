import { BrandActionTypes } from "../actions/brandActions";






const initialState = {
  brand:{},
  brands: [],
};

const brandReducers = (state = initialState, action) => {
  switch (action.type) {
    case BrandActionTypes.SET_BRAND:
        return {
          ...state,
          brand: action.payload,
        };
        case BrandActionTypes.CLEAR_BRAND:
          return {
            ...state,
            brand: {},
          };
    case BrandActionTypes.LIST_BRAND:
        return {
          ...state,
          brands: action.payload,
        };
    case BrandActionTypes.LIST_PARENT_BRAND:
        return {
          ...state,
          parentCate: action.payload,
        };
    case BrandActionTypes.ADD_BRAND:
      return {
        ...state,
        brands: [...state.brands, action.payload],
      };
    case BrandActionTypes.UPDATE_BRAND:
      const updatedBrands = state.brands.map(brand =>
        brand.id === action.payload.id ? action.payload : brand
      );
      return {
        ...state,
        brands: updatedBrands,
      };
      case BrandActionTypes.DELETE_BRAND:
        return{
            ...state,
            brands : state.brands.filter(cat=> cat.id !== parseInt(action.payload)),
         };
         case BrandActionTypes.DELETE_BRANDS:
          return {
            ...state,
            brands: state.brands.filter(cat => !action.payload.includes(cat.id)),
          };
          case BrandActionTypes.UPDATE_STATUS_BRAND:
            const userIdToUpdate = action.payload;
      
            // Tìm người dùng trong danh sách users
            const updatedUsers = state.brands.map((user) =>
              user.id === userIdToUpdate
                ? { ...user, status: user.status==1?0:1 } // Đảo ngược trạng thái emailConfirmed
                : user
            );
            return {
              ...state,
              brands: updatedUsers,
            };
    default:
      return state;
  }
};

export default brandReducers;
