import { View, Dimensions,StyleSheet,Text } from 'react-native'
import React from 'react'

import {StyledText} from '../../components/style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../Config/Colors';

const Empty = () => {
  return (
    <View style={styles.centered}>
       <MaterialCommunityIcons name="clipboard-alert" size={44} color={Colors.brand} />
      <Text style={styles.subtitle}>No records found!!</Text>
    </View>
  )
}

export default Empty


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.darkLight,
  },
})