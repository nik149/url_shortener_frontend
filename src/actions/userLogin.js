export function loginSuccess(userInfo) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: userInfo
  };
}

export function logoutSuccess() {
  return {
    type: 'LOGOUT_SUCCESS'
  };
}
