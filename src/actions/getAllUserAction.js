import axios from 'axios'
import {listings} from '../mockData'
import {  GET_USER_LIST_FAILED,GET_USER_LIST_INIT,GET_USER_LIST_SUCCESS} from '../constants/action'
import {BASE_URL,GET_USER_LIST} from '../constants/urls'


 const fetchAllUsersListInit = () =>( {type:GET_USER_LIST_INIT})

 const fetchAllUsersListFailed = () => ({ type: GET_USER_LIST_FAILED});

 const fetchAllUsersListSucess = (payload) => ({ type : GET_USER_LIST_SUCCESS,payload : payload})


 export const getAllUserCall = () => {

    let URL = BASE_URL + GET_USER_LIST

    return dispatch => {
      dispatch(fetchAllUsersListInit());

      axios
        .get(URL)
        .then(res => {
          dispatch(fetchAllUsersListSucess(res.data.data));
        })
        .catch(err => {
          dispatch(fetchAllUsersListFailed());
          notifyMessage('Something went wrong!')
        });
  
    }
  };