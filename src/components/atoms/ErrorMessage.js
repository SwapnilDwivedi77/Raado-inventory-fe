import React from 'react'
import { StyleSheet,Text } from 'react-native'
import { Colors } from '../style'



const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null
    return (
        <Text style={styles.error}>{error}</Text>
    )
}

export default ErrorMessage

const styles = StyleSheet.create({
    error: {
        color: Colors.red
    }
})
