import React ,{useState,useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import SafeAreaView from '../components/atoms/SafeAreaView'
import ProductRatesForm from '../components/ProductRatesForm';

import { getAllUserCall } from '../actions/getAllUserAction'

const ProductRatesScreen = () => {


  const selectedProcess = useSelector(state => state.selectedProcess).value;
  const dispatch = useDispatch();
  const postNewRequest = useSelector(state => state.postNewRequest)

  useEffect(() => {
    dispatch(getAllUserCall())
  }, [])


  const handleNewRequestSubmit = (value) => {
   
  }


  return (
    <SafeAreaView>
      <ProductRatesForm
        handleNewRequestSubmit={handleNewRequestSubmit}
        selectedProcess={selectedProcess}
        loading={postNewRequest.loading}
      />
    </SafeAreaView>
  )
}

export default ProductRatesScreen