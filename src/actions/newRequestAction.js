import axios from 'axios'

import { notifyMessage } from '../utils/showToast'
import { POST_NEW_REQUEST_INIT,POST_NEW_REQUEST_SUCCESS,POST_NEW_REQUEST_FAILED } from '../constants/action'

import {BASE_URL,POST_NEW_REQUEST} from '../constants/urls'

import {getActivityLogsCall} from './fetchLogsAction'

 const  postNewREquestInit = () =>( {type:POST_NEW_REQUEST_INIT})

 const postNewREquestFailed = () => ({ type: POST_NEW_REQUEST_FAILED});

 const postNewRequestSuccess = () => ({ type : POST_NEW_REQUEST_SUCCESS})


 export const newRequestCall = (requestData,selectedProcess) => {

    let URL = BASE_URL + POST_NEW_REQUEST
    return dispatch => {
      dispatch(postNewREquestInit());
      axios
      .post(URL, requestData)
      .then(res => {
        dispatch(postNewRequestSuccess());
        notifyMessage('New Request Raised!')
        dispatch(getActivityLogsCall(selectedProcess))
      })
      .catch(err => {
        dispatch(postNewREquestFailed(err.message));
     console.log(err)
        notifyMessage('Something went wrong')
      });
     
   
    };
  };