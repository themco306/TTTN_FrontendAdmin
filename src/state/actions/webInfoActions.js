

export const WebInfoActionTypes = {
  LIST_WEBINFO: 'LIST_WEBINFO',
};

export const webInfoActions = {
  listInfo: (items) => ({
    type: WebInfoActionTypes.LIST_WEBINFO,
    payload: items,
  }),

};
