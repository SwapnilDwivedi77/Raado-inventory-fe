import axios from 'axios'

import { notifyMessage } from '../utils/showToast'
import { UPDATE_PRODUCT_RATE_FAILED,UPDATE_PRODUCT_RATE_SUCCESS,UPDATE_PRODUCT_RATE_INIT} from '../constants/action'
import {BASE_URL,UPADATE_USER_RATES} from '../constants/urls'

const  updateProductRateInit = () =>( {type:UPDATE_PRODUCT_RATE_INIT})

const  updateProductRateFailed = () => ({ type: UPDATE_PRODUCT_RATE_FAILED});

const  updateProductRateSuccess = () => ({ type : UPDATE_PRODUCT_RATE_SUCCESS})


 export const updateProductRateCall = (payload) => {

    let URL = BASE_URL + UPADATE_USER_RATES.replace('{processName}',payload.selectedProcess) + `?userId=${payload.userId}`
    return dispatch => {
      dispatch(updateProductRateInit());
      axios
      .patch(URL,payload.formData)
      .then(res => {
        dispatch(updateProductRateSuccess());
        notifyMessage('Rates Updated!')
        })
      .catch(err => {
        dispatch(updateProductRateFailed(err.message));
        notifyMessage('Something went wrong')
      });
     
   
    };
  };