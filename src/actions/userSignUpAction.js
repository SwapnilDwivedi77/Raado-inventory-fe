import axios from 'axios'

import {USER_SIGNUP_INIT,USER_SIGNUP_FAILURE,USER_SIGNUP_SUCCESS} from '../constants/action'

import {BASE_URL,USER_SIGNUP} from '../constants/urls'
import { notifyMessage } from '../utils/showToast'
import {saveLoginDetails} from './users'


 const userSignUpInit = () =>( {type:USER_SIGNUP_INIT})

 const userSignUpFailed = () => ({ type: USER_SIGNUP_FAILURE});

 const userSignUpSucess = () => ({ type : USER_SIGNUP_SUCCESS})


 export const userSignUpCall = (userData) => {

    let URL = BASE_URL + USER_SIGNUP
 

    return dispatch => {
      dispatch(userSignUpInit());
  
      axios
        .post(URL, userData)
        .then(res => {
          dispatch(userSignUpSucess());
          dispatch(saveLoginDetails(res.data.data))
          notifyMessage('Welcome!')
        })
        .catch(err => {
          dispatch(userSignUpFailed(err.message));
       
          notifyMessage('User already exists')
        });
    };
  };