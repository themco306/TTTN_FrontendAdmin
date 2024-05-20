

export const CouponActionTypes = {
    LIST_COUPON: 'LIST_COUPON',
    SET_COUPON: 'SET_COUPON',
    UPDATE_COUPON: 'UPDATE_COUPON',
    UPDATE_STATUS_COUPON:'UPDATE_STATUS_COUPON',
    DELETE_COUPON: 'DELETE_COUPON',
    DELETE_COUPONS: 'DELETE_COUPONS',
  };
  
  export const couponActions = {
    listCoupon: (items) => ({
      type: CouponActionTypes.LIST_COUPON,
      payload: items,
    }),
    setCoupon: (item) => ({
      type: CouponActionTypes.SET_COUPON,
      payload: item,
    }),
    updateCoupon: (item) => ({
      type: CouponActionTypes.UPDATE_COUPON,
      payload: item,
    }),
    updateStatusCoupon: (item) => ({
      type: CouponActionTypes.UPDATE_STATUS_COUPON,
      payload:item,
    }),
    deleteCoupon: (item) => ({
      type: CouponActionTypes.DELETE_COUPON,
      payload: item,
    }),
  
    deleteCoupons: (ids) => ({
      type: CouponActionTypes.DELETE_COUPONS,
      payload: ids,
    }),
  };
  