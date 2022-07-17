import {
    FETCH_PRODUCT_RATE_INIT,FETCH_PRODUCT_RATE_FAILED,FETCH_PRODUCT_RATE_SUCCESS
   } from '../../constants/action';
   
   const initialState = {
     loading: false,
     success : false,
     list:[]
   };
   
   export default function productRates(state = initialState, action) {
     switch (action.type) {
       case FETCH_PRODUCT_RATE_INIT:
         return {
           ...state,
           loading: true
         };
       case FETCH_PRODUCT_RATE_SUCCESS:
         return {
           ...state,
           loading: false,
           success : true,
           list : action.payload
         };
       case FETCH_PRODUCT_RATE_FAILED:
         return {
           ...state,
           loading: false,
           success : false,
         };
       default:
         return state;
     }
   }