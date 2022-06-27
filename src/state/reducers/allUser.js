import {
   GET_USER_LIST_FAILED,GET_USER_LIST_INIT,GET_USER_LIST_SUCCESS} from '../../constants/action';
   
   const initialState = {
     loading: false,
     success : false,
     list:[]
   };
   
   export default function allUsers(state = initialState, action) {
     switch (action.type) {
       case GET_USER_LIST_INIT:
         return {
           ...state,
           loading: true
         };
       case GET_USER_LIST_SUCCESS:
         return {
           ...state,
           loading: false,
           success : true,
           list : action.payload
         };
       case GET_USER_LIST_FAILED:
         return {
           ...state,
           loading: false,
           success : false,
         };
       default:
         return state;
     }
   }