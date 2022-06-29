import axios from 'axios'
import { notifyMessage } from '../utils/showToast'

import {USER_LOGIN_INIT,USER_LOGIN_FAILURE,USER_LOGIN_SUCCESS} from '../constants/action'

import {BASE_URL,USER_LOGIN} from '../constants/urls'
import {saveLoginDetails} from './users'


 const userLoginInit = () =>( {type:USER_LOGIN_INIT})

 const userLoginFailed = () => ({ type: USER_LOGIN_FAILURE});

 const userLoginSucess = (data) => ({ type : USER_LOGIN_SUCCESS,payload : data})


 export const userLoginCall = (userData,fn) => {

console.log(userData)
    let URL = BASE_URL + USER_LOGIN + `?phoneNo=${userData.mobileNumber ? userData.mobileNumber : userData.phoneNo}&password=${userData.password}`

    return dispatch => {
      dispatch(userLoginInit());
  
      axios
        .get(URL)
        .then(res => {
          dispatch(userLoginSucess());
          dispatch(saveLoginDetails(res.data.data))
          notifyMessage('Welcome Back!')
          console.log(res.data.data)
        })
        .catch(err => {        
        notifyMessage('Invalid credentials')
          dispatch(userLoginFailed());
        });

    };
  };