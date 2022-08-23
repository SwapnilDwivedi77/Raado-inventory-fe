import axios from 'axios'
import { FETCH_LOGS_FAILURE,FETCH_LOGS_INIT,FETCH_LOGS_SUCCESS} from '../constants/action'
import { filterConfig } from '../constants/filterConfig'
import {BASE_URL,GET_TRANSACTIONS_LIST} from '../constants/urls'
import {notifyMessage} from '../utils/showToast'

 const fetchLogsInit = () =>( {type:FETCH_LOGS_INIT})

 const fetchLogsFailed = () => ({ type: FETCH_LOGS_FAILURE});

export const fetchLogsSucess = (payload) => ({ type : FETCH_LOGS_SUCCESS,payload : payload})


 export const getActivityLogsCall = ({selectedProcess,filterOptions}) => {


    let URL = BASE_URL + GET_TRANSACTIONS_LIST + `?commonProcess=${selectedProcess}`
    console.log('In api call',{filterOptions})
    if(filterOptions?.userId) URL += `&commonUserId=${filterOptions.userId}`
    if(filterOptions?.status) URL += `&status=${filterOptions.status}`
    console.log(URL)
    return dispatch => {
      dispatch(fetchLogsInit());
  
      axios
      .get(URL)
      .then(res => {
        dispatch(fetchLogsSucess(res.data.data));
      })
      .catch(err => {
        dispatch(fetchLogsFailed());
        console.log('from activity call',err)
        notifyMessage('Something went wrong!',err)
      });

    };
  };