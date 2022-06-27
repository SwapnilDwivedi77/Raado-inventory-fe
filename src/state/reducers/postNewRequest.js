import {
    POST_NEW_REQUEST_INIT ,
    POST_NEW_REQUEST_FAILED ,
    POST_NEW_REQUEST_SUCCESS,
  } from '../../constants/action';
  
  const initialState = {
    loading: false,
    success : false,
  };
  
  export default function postNewRequest(state = initialState, action) {
    switch (action.type) {
      case POST_NEW_REQUEST_INIT:
        return {
          ...state,
          loading: true
        };
      case POST_NEW_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          success : true,
        };
      case POST_NEW_REQUEST_FAILED:
        return {
          ...state,
          loading: false,
          success:false

        };
      default:
        return state;
    }
  }