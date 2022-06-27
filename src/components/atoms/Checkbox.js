import { View, Text } from 'react-native'
import React , { useState } from 'react'
import Checkbox from 'expo-checkbox';
import {Colors} from '../../Config/Colors'

const CheckboxAtom = ({isChecked,handleCheck}) => {
    
    return (
        <Checkbox
            value={isChecked}
            onValueChange={handleCheck}
            color={isChecked ? Colors.brand : undefined}
        />
    )
}

export default CheckboxAtom