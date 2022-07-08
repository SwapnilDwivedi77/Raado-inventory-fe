import React ,{useEffect} from 'react'
import NewRequestForm from '../components/NewRequestForm'
import { getAllUserCall } from '../actions/getAllUserAction'
import { useDispatch, useSelector } from 'react-redux'
import {newRequestCall} from '../actions/newRequestAction'
import SafeAreaView from '../components/atoms/SafeAreaView'

const NewRequestScreen = () => {

  const selectedProcess = useSelector(state => state.selectedProcess).value;
  const dispatch = useDispatch();
  const postNewRequest = useSelector(state => state.postNewRequest)

  useEffect(() => {
    dispatch(getAllUserCall())      
}, [])


  const handleNewRequestSubmit = (value) => {
   dispatch(newRequestCall(value,selectedProcess))
  }

    return(
      
       <SafeAreaView>
         <NewRequestForm
         handleNewRequestSubmit={handleNewRequestSubmit}
         selectedProcess={selectedProcess}
         loading = {postNewRequest.loading}
         />
        </SafeAreaView>
    )
}


export default NewRequestScreen