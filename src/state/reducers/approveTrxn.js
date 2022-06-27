import {

   APPROVE_TRXN_INIT,
   APPROVE_TRXN_FAILED,
   APPROVE_TRXN_SUCCESS
  } from '../../constants/action';
  
  const initialState = {
    loading: false,
    success : false,
  };
  
  export default function approveTrxn(state = initialState, action) {
    switch (action.type) {
      case APPROVE_TRXN_INIT:
        return {
          ...state,
          loading: true
        };
      case APPROVE_TRXN_SUCCESS:
        return {
          ...state,
          loading: false,
          success : true,
        };
      case APPROVE_TRXN_FAILED:
        return {
          ...state,
          loading: false,

        };
      default:
        return state;
    }
  }