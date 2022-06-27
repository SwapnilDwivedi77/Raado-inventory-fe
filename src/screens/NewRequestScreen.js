import React ,{useState,useEffect} from 'react'
import {View} from 'react-native'
import DropdownSearchable from '../components/atoms/DropdownSearchable'
import NewRequestForm from '../components/NewRequestForm'
import { ScreenWrapper } from '../components/style'

import { getAllUserCall } from '../actions/getAllUserAction'

import { useDispatch, useSelector } from 'react-redux'
import { getNewRequestEntries } from '../utils'

import {newRequestCall} from '../actions/newRequestAction'
import SafeAreaView from '../components/atoms/SafeAreaView'

const NewRequestScreen = () => {

  const selectedProcess = useSelector(state => state.selectedProcess).value;
  const dispatch = useDispatch();
  const postNewRequest = useSelector(state => state.postNewRequest)

  const [selectedUser,setSelectedUser] = useState({})

  useEffect(() => {
    dispatch(getAllUserCall())      
}, [])


  const handleNewRequestSubmit = (value) => {
   dispatch(newRequestCall(value,selectedProcess))
  }
  
  const handleDropdownChange = (value) => {
    setSelectedUser(value)
  }
    
    return(
      
       <SafeAreaView>
         <NewRequestForm
         handleNewRequestSubmit={handleNewRequestSubmit}
         handleDropdownChange={handleDropdownChange}
         selectedProcess={selectedProcess}
         loading = {postNewRequest.loading}
         />
        </SafeAreaView>
    )
}


export default NewRequestScreen