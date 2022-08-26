import React ,{useEffect, useState} from 'react'
import NewRequestForm from '../components/NewRequestForm'
import { getAllUserCall } from '../actions/getAllUserAction'
import { useDispatch, useSelector } from 'react-redux'
import {newRequestCall} from '../actions/newRequestAction'
import SafeAreaView from '../components/atoms/SafeAreaView'
import PullToRefresh from '../components/atoms/PullToRefresh'

const NewRequestScreen = () => {

  const [refresh , setRefreshing] = useState(false)
  const selectedProcess = useSelector(state => state.selectedProcess).value;
  const dispatch = useDispatch();
  const postNewRequest = useSelector(state => state.postNewRequest)

  const getUsersList = () => {
    dispatch(getAllUserCall(setRefreshing))    
  }

  useEffect(() => {
    getUsersList();
}, [])


  const handleNewRequestSubmit = (value) => {
   dispatch(newRequestCall(value,selectedProcess))
  }

    return(
      
       <SafeAreaView>
        <PullToRefresh refreshing = {refresh}  onRefresh={getUsersList}>
         <NewRequestForm
         handleNewRequestSubmit={handleNewRequestSubmit}
         selectedProcess={selectedProcess}
         loading = {postNewRequest.loading}
         />
        </PullToRefresh>
        </SafeAreaView>
    )
}


export default NewRequestScreen