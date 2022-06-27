import {

    USER_SIGNUP_FAILURE,
    USER_SIGNUP_INIT,
    USER_SIGNUP_SUCCESS,
  } from '../../constants/action';
  
  const initialState = {
    loading: false,
    success : false,
  };
  
  export default function userSignUp(state = initialState, action) {
    switch (action.type) {
      case USER_SIGNUP_INIT:
        return {
          ...state,
          loading: true
        };
      case USER_SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
          success : true,
        };
      case USER_SIGNUP_FAILURE:
        return {
          ...state,
          loading: false,

        };
      default:
        return state;
    }
  }