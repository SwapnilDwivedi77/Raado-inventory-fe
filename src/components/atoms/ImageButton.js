import { StyleSheet, Image, View,Text } from 'react-native'
import React from 'react'
import {Colors} from '../style'

const ImageButton = ({title,imgSrc,height= 180,width=180}) => {
  return (
    <View style={{...styles.container,height: height,width: width}}>
        <View style={styles.title}>
        <Text style={{fontWeight : 'bold',color:Colors.brand}}>{title}</Text>
        </View>
       
      <Image source={imgSrc} style={{ width: width-5,height: height-5 }} />              
     
      
    </View>
  )
}

export default ImageButton

const styles = StyleSheet.create({
    container: {
        borderWidth : 1,
        borderColor : Colors.secondary,
        borderRadius : 15,
    },
    overlaycontainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        borderRadius : 15,
      },
      title : {
          position : 'absolute',
          top : 10,
          zIndex: 9999,
          left : 10,


      }
})