import axios from 'axios'
import {FETCH_PRODUCT_RATE_FAILED,FETCH_PRODUCT_RATE_SUCCESS,FETCH_PRODUCT_RATE_INIT} from '../constants/action'
import {BASE_URL,GET_GLOBAL_RATES,GET_USER_RATES,} from '../constants/urls'
import { notifyMessage } from '../utils/showToast';


 const fetchProductRatesInit = () =>( {type:FETCH_PRODUCT_RATE_INIT})

 const fetchProductRatesFailed = () => ({ type: FETCH_PRODUCT_RATE_FAILED});

 const fetchProductRatesSuccess = (payload) => ({ type : FETCH_PRODUCT_RATE_SUCCESS,payload : payload})


 export const getProductRates = (globalRate , params) => {

    let URL = BASE_URL;
    if (globalRate) {
      URL += GET_GLOBAL_RATES;
    } else {
      URL += GET_USER_RATES + `?userId=${params.userId}`;
    } 

    console.log(globalRate,URL);
    return dispatch => {
      dispatch(fetchProductRatesInit());

      axios
        .get(URL)
        .then(res => {
            let data = globalRate ? res.data.data : res.data.data.permissions
            console.log(data)
          dispatch(fetchProductRatesSuccess(data));
        })
        .catch(err => {
          dispatch(fetchProductRatesFailed());
          notifyMessage("Couldn't fetch product rates!")
        });
  
    }
  };