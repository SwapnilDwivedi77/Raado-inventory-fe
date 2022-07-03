import axios from 'axios'
import { FETCH_LOGS_FAILURE,FETCH_LOGS_INIT,FETCH_LOGS_SUCCESS} from '../constants/action'
import {BASE_URL,GET_TRANSACTIONS_LIST} from '../constants/urls'
import {notifyMessage} from '../utils/showToast'

 const fetchLogsInit = () =>( {type:FETCH_LOGS_INIT})

 const fetchLogsFailed = () => ({ type: FETCH_LOGS_FAILURE});

 const fetchLogsSucess = (payload) => ({ type : FETCH_LOGS_SUCCESS,payload : payload})


 export const getActivityLogsCall = (selectedProcess,toUserId,fn) => {
    let URL = BASE_URL + GET_TRANSACTIONS_LIST + `?commonProcess=${selectedProcess}`
    return dispatch => {
      dispatch(fetchLogsInit());
  
      axios
      .get(URL)
      .then(res => {
        dispatch(fetchLogsSucess(res.data.data));
        fn(false)
      })
      .catch(err => {
        dispatch(fetchLogsFailed());
        notifyMessage('Something went wrong!',err)
      });

    };
  };