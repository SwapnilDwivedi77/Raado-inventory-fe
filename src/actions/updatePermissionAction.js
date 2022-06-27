import axios from 'axios'

import {UPDATE_USER_PERMISSION_INIT,
    UPDATE_USER_PERMISSION_FAILED,
    UPDATE_USER_PERMISSION_SUCCESS} from '../constants/action'

import {BASE_URL,UPDATE_USER_PERMISSION} from '../constants/urls'
import { notifyMessage } from '../utils/showToast'
import {saveLoginDetails} from './users'


 const updateUserPermissionInit = () =>( {type:UPDATE_USER_PERMISSION_INIT})

 const updateUserPermissionFailed = () => ({ type: UPDATE_USER_PERMISSION_FAILED});

 const updateUserPermissionSucess = () => ({ type : UPDATE_USER_PERMISSION_SUCCESS})


 export const updateUserPermissionCall = (userId , payload,fn) => {

    let URL = BASE_URL + UPDATE_USER_PERMISSION + `?userId=${userId}`



    return dispatch => {
      dispatch(updateUserPermissionInit());
  
      axios
        .patch(URL, payload)
        .then(res => {
          dispatch(updateUserPermissionSucess());      
          notifyMessage('Permissions Updated!')
          fn()
        })
        .catch(err => {
          dispatch(updateUserPermissionFailed());
          console.log(err)
          notifyMessage('Something went wrong!')
        });
    };
  };