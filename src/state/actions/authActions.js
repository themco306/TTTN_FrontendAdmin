// authActions.js
export const AuthActionTypes = {
 LOGIN : 'LOGIN',
 LOGOUT : 'LOGOUT',
 SET_TOKEN : 'SET_TOKEN',
 CONFIRM_EMAIL:"CONFIRM_EMAIL"
}
export const authActions = {
  login: (userData) => ({
    type: AuthActionTypes.LOGIN,
    payload: userData,
  }),
  confirmEmail:()=>(
    {
      type:AuthActionTypes.CONFIRM_EMAIL
    }
  ),

  setToken: (token) => ({
    type: AuthActionTypes.SET_TOKEN,
    payload: token,
  }),

  logout: () => ({
    type: AuthActionTypes.LOGOUT,
  }),
};
