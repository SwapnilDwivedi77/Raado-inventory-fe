import {
  FETCH_STATIC_FAILED,FETCH_STATIC_INIT,FETCH_STATIC_SUCCESS} from '../../constants/action';
   
   const initialState = {
     loading: false,
     success : false,
     staticRes : {}
   };
   
   export default function staticResources(state = initialState, action) {
     switch (action.type) {
       case FETCH_STATIC_INIT:
         return {
           ...state,
           loading: true
         };
       case FETCH_STATIC_SUCCESS:
         return {
           ...state,
           loading: false,
           success : true,
           staticRes : action.payload
         };
       case FETCH_STATIC_FAILED:
         return {
           ...state,
           loading: false,
           success : false,
         };
       default:
         return state;
     }
   }