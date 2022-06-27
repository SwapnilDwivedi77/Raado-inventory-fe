import {
    FETCH_APPROVAL_INIT,FETCH_APPROVAL_SUCCESS ,FETCH_APPROVAL_FAILURE
   } from '../../constants/action';
   
   const initialState = {
     loading: false,
     success : false,
     list:[]
   };
   
   export default function approvalList(state = initialState, action) {
     switch (action.type) {
       case FETCH_APPROVAL_INIT:
         return {
           ...state,
           loading: true
         };
       case FETCH_APPROVAL_SUCCESS:
         return {
           ...state,
           loading: false,
           success : true,
           list : action.payload
         };
       case FETCH_APPROVAL_FAILURE:
         return {
           ...state,
           loading: false,
           success : false,
         };
       default:
         return state;
     }
   }