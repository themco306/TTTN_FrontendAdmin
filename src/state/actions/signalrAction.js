

export const SignalrActionTypes = {
    SET_COUNT_USER_ONLINE:"SET_COUNT_USER_ONLINE"
  };
  
  export const signalrAction = {
    setCUserOnline: (items) => ({
      type: SignalrActionTypes.SET_COUNT_USER_ONLINE,
      payload: items,
    }),
  

  };
  