import { View, Text } from 'react-native'
import React from 'react'


import SafeAreaView from '../components/atoms/SafeAreaView'
import NewRequestForm from '../components/NewRequestForm'

const ProductRatesScreen = () => {
  return (
    <SafeAreaView>
      <NewRequestForm
         handleNewRequestSubmit={console.log()}
         handleDropdownChange={console.log()}
         selectedProcess={'WAREHOUSE'}
         loading = {false}
         />
    </SafeAreaView>
  )
}

export default ProductRatesScreen