import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {Colors} from './style'

import { MaterialCommunityIcons } from '@expo/vector-icons'

const NewListingButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>

            <View style={styles.container}>
                <MaterialCommunityIcons
                    name='plus-circle'
                    color={Colors.primary}
                    size={40} />
            </View>
        </TouchableOpacity>
    )
}

export default NewListingButton

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.brand,
        borderRadius: 45,
        borderColor: Colors.primary,
        borderWidth: 10,
        bottom: 35,
        justifyContent: 'center',
        height: 80,
        width: 80,

    }
})
