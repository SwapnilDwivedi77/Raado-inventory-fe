import {StyleSheet,StatusBar,SafeAreaView } from 'react-native'
import React from 'react'
const SafeArea = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
     {children}
      </SafeAreaView>
  )
}

export default SafeArea


const styles = StyleSheet.create({
    container: {
        flex: 1,
         paddingTop: 10,
        paddingRight  :10,
        paddingLeft : 10,
        
      },
})