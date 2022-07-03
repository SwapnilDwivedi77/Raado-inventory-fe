import axios from 'axios'
import {listings} from '../mockData'
import {  FETCH_STATIC_FAILED,FETCH_STATIC_INIT,FETCH_STATIC_SUCCESS} from '../constants/action'
import {BASE_URL,GET_STATIC_RESOURCES} from '../constants/urls'


 const fetchStaticResourcesInit = () =>( {type:FETCH_STATIC_INIT})

 const fetchStaticResourcesFailed = () => ({ type: FETCH_STATIC_FAILED});

 const fetchStaticResourcesSucess = (payload) => ({ type : FETCH_STATIC_SUCCESS,payload : payload})


 export const getStaticProcessEnteriesCall = () => {

    let URL = BASE_URL + GET_STATIC_RESOURCES

    console.log('static resource',URL)

    return dispatch => {
      dispatch(fetchStaticResourcesInit());

      axios
        .get(URL)
        .then(res => {
          
          dispatch(fetchStaticResourcesSucess(res.data.data));
          console.log(res.data.data);
        })
        .catch(err => {
          dispatch(fetchStaticResourcesFailed());
          notifyMessage('Something went wrong!')
        });
  
    }
  };