import axios from 'axios'

import {APPROVE_TRXN_INIT,
    APPROVE_TRXN_FAILED,
    APPROVE_TRXN_SUCCESS} from '../constants/action'

import {BASE_URL,UPDATE_TRANSACTION_STATUS} from '../constants/urls'
import { notifyMessage } from '../utils/showToast'
import {getActivityLogsCall} from './fetchLogsAction'

 const updateTransactionInit = () =>( {type:APPROVE_TRXN_INIT})

 const updateTransactionFailed = () => ({ type: APPROVE_TRXN_FAILED});

 const updateTransactionSucess = () => ({ type : APPROVE_TRXN_SUCCESS})


 export const updateTrxnStatusCall = ({trxnId , status,selectedProcess,reloadApproval}) => {

    let URL = BASE_URL + UPDATE_TRANSACTION_STATUS + `?transactionId=${trxnId}&transactionStatus=${status}`

    return dispatch => {
      dispatch(updateTransactionInit());
  
      axios
        .patch(URL)
        .then(res => {
          dispatch(updateTransactionSucess());      
          notifyMessage(status ==='APPROVED' ? 'Request Approved!' : 'Request Rejected')
          dispatch(getActivityLogsCall(selectedProcess))
          reloadApproval()
        })
        .catch(err => {
          dispatch(updateTransactionFailed());
          console.log(err)
          notifyMessage('Something went wrong!')
        });
    };
  };