import {
    UPDATE_USER_PERMISSION_INIT,
    UPDATE_USER_PERMISSION_FAILED,
    UPDATE_USER_PERMISSION_SUCCESS
  } from '../../constants/action';
  
  const initialState = {
    loading: false,
    success : false,
  };
  
  export default function updateUserPermission(state = initialState, action) {
    switch (action.type) {
      case UPDATE_USER_PERMISSION_INIT:
        return {
          ...state,
          loading: true
        };
      case UPDATE_USER_PERMISSION_SUCCESS:
        return {
          ...state,
          loading: false,
          success : true,
        };
      case UPDATE_USER_PERMISSION_FAILED:
        return {
          ...state,
          loading: false,

        };
      default:
        return state;
    }
  }