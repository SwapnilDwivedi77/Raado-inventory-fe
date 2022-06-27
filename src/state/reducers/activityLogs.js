import {
   FETCH_LOGS_FAILURE,FETCH_LOGS_INIT,FETCH_LOGS_SUCCESS
  } from '../../constants/action';
  
  const initialState = {
    loading: false,
    success : false,
    list:[]
  };
  
  export default function activityLogs(state = initialState, action) {
    switch (action.type) {
      case FETCH_LOGS_INIT:
        return {
          ...state,
          loading: true
        };
      case FETCH_LOGS_SUCCESS:
        return {
          ...state,
          loading: false,
          success : true,
          list : action.payload
        };
      case FETCH_LOGS_FAILURE:
        return {
          ...state,
          loading: false,
          success : false,
        };
      default:
        return state;
    }
  }