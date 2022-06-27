import { View, StyleSheet } from 'react-native'
import React from 'react'

import {NumericInputWrapper,InputLabelNR, StyledNumericInput, Colors} from '../style'

const NumericInput = ({label,width,...props}) => {
  return (
      <> 
      
     
      <NumericInputWrapper>
      <InputLabelNR>{label}</InputLabelNR>
       <View style={{...styles.inputContainer,width}}>
           <StyledNumericInput
           {...props}
           />
       </View>
       </NumericInputWrapper>
      </>
    
  )
}

export default NumericInput

const styles = StyleSheet.create({

    inputContainer : {
        borderBottomColor: Colors.dark,
        borderBottomWidth: 4,
        height : 40,
        marginTop : 5,
        alignSelf : "flex-end",
        marginLeft: "auto",

    }
})