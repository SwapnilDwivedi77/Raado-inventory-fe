import {
    FETCH_PRODUCT_RATE_INIT,FETCH_PRODUCT_RATE_FAILED,FETCH_PRODUCT_RATE_SUCCESS,
    UPDATE_PRODUCT_RATE_INIT,UPDATE_PRODUCT_RATE_SUCCESS,UPDATE_PRODUCT_RATE_FAILED
   } from '../../constants/action';
   
   const initialState = {
     loading: false,
     success : false,
     list:[],
     updateRate : false,
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
         // For update product rates
         case UPDATE_PRODUCT_RATE_INIT:
         return {
           ...state,
           updateRate: true
         };
       case UPDATE_PRODUCT_RATE_SUCCESS:
         return {
           ...state,
           updateRate: false,
         };
       case UPDATE_PRODUCT_RATE_FAILED:
         return {
           ...state,
           updateRate: false,         
         };
       default:
         return state;
     }
   }