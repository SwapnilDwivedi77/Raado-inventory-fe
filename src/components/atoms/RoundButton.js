import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons';


const RoundButton = ({styles,onPress,width,height,icon}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={{...style.roundButton1,...styles,width,height}}>
      {icon}
      </TouchableOpacity>
  )
}

export default RoundButton

const style = StyleSheet.create({
    roundButton1: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
    }
  });