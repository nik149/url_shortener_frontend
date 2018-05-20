const initialUserState = {
  logged_in: false
}

function userReducer(state=initialUserState, action) {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
    console.log("Login Success: ", action.payload);
      state = {...state, profile: action.payload.profile, access_token: action.payload.access_token, logged_in: true};
      return state
    case 'LOGOUT_SUCCESS':
      state = {...state, profile: {}, logged_in: false};
      return state
    default:
      state = {...state};
      return state;
  }
  return state;
}

export default userReducer;
