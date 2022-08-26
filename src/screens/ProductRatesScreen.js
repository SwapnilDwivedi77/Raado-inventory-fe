import React ,{useState,useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'
import SafeAreaView from '../components/atoms/SafeAreaView'
import ProductRatesForm from '../components/ProductRatesForm';

import { getAllUserCall } from '../actions/getAllUserAction'

const ProductRatesScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserCall())
  }, [])

  return (
    <SafeAreaView>
      <ProductRatesForm
      />
    </SafeAreaView>
  )
}

export default ProductRatesScreen