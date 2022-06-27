import { View, Text } from 'react-native'
import React , {useState} from 'react'


// icons

import { MaterialIcons,Ionicons } from '@expo/vector-icons';

import {
    LeftIcon,
    RightIcon,
    StyledTextInput,
    StyledInputLabel,
    Colors
} from '../style'


export default function TextInput({label,icon,isPassword,hidePassword, sethidePassword,...props}) {

    const {brand,darkLight} = Colors
  return (
   <View>
      {icon && <LeftIcon>
       <MaterialIcons name={icon} size={24} color={brand} />
       </LeftIcon>}
       <StyledInputLabel>{label}</StyledInputLabel>
       <StyledTextInput {...props}/>
       {isPassword && (<RightIcon onPress={()=> sethidePassword(!hidePassword)}>
        <Ionicons name={hidePassword ? 'md-eye-off' :'md-eye'} size={30} color={darkLight} />
           </RightIcon>)}

   </View>
  )
}