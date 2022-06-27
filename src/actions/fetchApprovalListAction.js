import axios from 'axios'
import {  FETCH_APPROVAL_INIT,FETCH_APPROVAL_SUCCESS ,FETCH_APPROVAL_FAILURE} from '../constants/action'
import {BASE_URL,GET_TRANSACTIONS_LIST} from '../constants/urls'
import {notifyMessage} from '../utils/showToast'

 const fetchApprovalListInit = () =>( {type:FETCH_APPROVAL_INIT})

 const fetchApprovalListFailed = () => ({ type: FETCH_APPROVAL_FAILURE});

 const fetchApprovalListSuccess = (payload) => ({ type : FETCH_APPROVAL_SUCCESS,payload : payload})


 export const getApprovalListCall = (toUserId,selectedProcess,fn) => {

    let URL = BASE_URL + GET_TRANSACTIONS_LIST + `?toUserId=${toUserId}&status=${'CREATED'}&toProcess=${selectedProcess}`

    console.log(URL)
  
    return dispatch => {
      dispatch(fetchApprovalListInit());

      axios
        .get(URL)
        .then(res => {
          dispatch(fetchApprovalListSuccess(res.data.data));
          fn(false)
          console.log('Approvaldata',res.data.data)
        })
        .catch(err => {
          dispatch(fetchApprovalListFailed());
          notifyMessage('Something went wrong!')
        });
  
    }
  };