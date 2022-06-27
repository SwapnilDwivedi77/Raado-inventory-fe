import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../style'

export const  CardHeadingLabel = ({children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

export const CardContentLabel = ({children,style})=>{
    return (
        <>
         <View style={{...styles.container, ...style}}>
         <Text style={{...styles.text,color : style.color}}>{children}</Text>
         </View>
        </>
    )
}



const styles = StyleSheet.create({

    container : {
        textTransform : 'capitalize',
        padding : 4,
        backgroundColor :Colors.secondary,
        borderRadius : 8,
    },

    text : {
        fontSize : 12,
        textTransform  : 'uppercase',
        letterSpacing:1,
        fontWeight : "500",
        color : Colors.darkLight,
    }

})
