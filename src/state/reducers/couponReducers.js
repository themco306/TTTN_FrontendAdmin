import { CouponActionTypes } from "../actions/couponActions";







const initialState = {
  coupon:{},
  coupons: [],
  // parentCate:[],
};

const couponReducers = (state = initialState, action) => {
  switch (action.type) {
    case CouponActionTypes.SET_COUPON:
        return {
          ...state,
          coupon: action.payload,
        };
    //     case CategoryActionTypes.CLEAR_CATEGORY:
    //       return {
    //         ...state,
    //         category: {},
    //       };
    case CouponActionTypes.LIST_COUPON:
        return {
          ...state,
          coupons: action.payload,
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
    case CouponActionTypes.UPDATE_COUPON:
      const updated = state.coupons.map(data =>
        data.id === action.payload.id ? action.payload : data
      );
      return {
        ...state,
        coupons: updated,
      };
      case CouponActionTypes.DELETE_COUPON:
        return{
            ...state,
            coupons : state.coupons.filter(i=> i.id !== parseInt(action.payload)),
         };
         case CouponActionTypes.DELETE_COUPONS:
          return {
            ...state,
            coupons: state.coupons.filter(i => !action.payload.includes(i.id)),
          };
          case CouponActionTypes.UPDATE_STATUS_COUPON:
            const userIdToUpdate = action.payload;
      
            // Tìm người dùng trong danh sách users
            const updatedUsers = state.coupons.map((user) =>
              user.id === userIdToUpdate
                ? { ...user, status: user.status==1?0:1 } // Đảo ngược trạng thái emailConfirmed
                : user
            );
            return {
              ...state,
              coupons: updatedUsers,
            };
    default:
      return state;
  }
};

export default couponReducers;
