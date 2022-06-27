import {
    USER_LOGIN_INIT,USER_LOGIN_FAILURE,USER_LOGIN_SUCCESS
  } from '../../constants/action';
  
  const initialState = {
    loading: false,
    success : false,
  };
  
  export default function userSignUp(state = initialState, action) {
    switch (action.type) {
      case USER_LOGIN_INIT:
        return {
          ...state,
          loading: true
        };
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          success : true,
        };
      case USER_LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          success : false,

        };
      default:
        return state;
    }
  }