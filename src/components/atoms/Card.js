import { View, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../style'

const Card = ({ children,style,height }) => {
  return (
    <View style={{...styles.containerStyle,...style,height : height}}>

      {children}

    </View>
  )
}

export default Card

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 20;
const radius = 20;

const styles = StyleSheet.create({

  containerStyle: {
    width: deviceWidth - offset,
    backgroundColor: '#FFE5E2',
    height: 280,
    borderRadius: radius,
    
    padding  :10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 3,
  }
});