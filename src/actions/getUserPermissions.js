import axios from 'axios'
import {FETCH_USER_PERMISSION_SUCCESS} from '../constants/action'
import {BASE_URL,GET_USER_PERMISSION} from '../constants/urls'

 const fetchUserPremissionsSuccess = (payload) => ({ type : FETCH_USER_PERMISSION_SUCCESS,payload : payload})


 export const fetchUserPremissions = (userId) => {
    let URL = BASE_URL + GET_USER_PERMISSION + `?userId=${userId}`
    return dispatch => {
      axios
        .get(URL)
        .then(res => {
          dispatch(fetchUserPremissionsSuccess(res.data.data));
        })
        .catch(err => {
        });
  
    }
  };