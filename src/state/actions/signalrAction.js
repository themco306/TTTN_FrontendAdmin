

export const SignalrActionTypes = {
    SET_COUNT_USER_ONLINE:"SET_COUNT_USER_ONLINE",
    SET_MESSAGE:"SET_MESSAGE",
    SET_READ_MESSAGES:"SET_READ_MESSAGES",
    DELETE_MESSAGE:"DELETE_MESSAGE"
  };
  
  export const signalrAction = {
    setCUserOnline: (items) => ({
      type: SignalrActionTypes.SET_COUNT_USER_ONLINE,
      payload: items,
    }),
    setMessage:(data)=>({
      type:SignalrActionTypes.SET_MESSAGE,
      payload:data
    }),
    setReadMessages: (readMessages) => ({ type: SignalrActionTypes.SET_READ_MESSAGES, payload: readMessages }),
    deleteMessage: (messageId) => ({
      type: SignalrActionTypes.DELETE_MESSAGE,
      payload: messageId,
    })
  };
  