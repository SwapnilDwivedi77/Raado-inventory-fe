import { View, StyleSheet, Switch } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../Config/Colors'
import { StyledText } from './style'

import Checkbox from './atoms/Checkbox'
import { useEffect } from 'react'
import { isEmpty } from '../utils'


const PremissionListItem = ({ permission, userPermissionData,handlePermissionUpdate,handleWritePermission,reset,selectedUser }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [isChecked, setChecked] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {

        userPermissionData?.forEach(({ processName, write }) => {
            if (permission.value === processName) {
                setChecked(true)
                if(write) {
                    setIsEnabled(true)
                }
            }
        })

        
      return () => {
        setIsEnabled(false)
        setChecked(false)
      }

    }, [userPermissionData])
    
   

    const handleCheck = (permission) => {
        handlePermissionUpdate(permission,!isChecked)
        if(isChecked) setIsEnabled(false)
        setChecked(!isChecked)  
    }

    const handleWriteToggle = (permission) => {
        handleWritePermission(permission)
        toggleSwitch()
        
    }



    return (

        <>
            <View style={styles.container}>
                <View style={styles.checkbox}>
                    <Checkbox
                        isChecked={isChecked}
                       handleCheck ={()=>{handleCheck(permission)}}
                       disabled ={isEmpty(selectedUser)}
                    />
                </View>

                <View style={styles.text}>

                    <StyledText>{permission.label}</StyledText>

                </View>

                <View style={styles.switch}>

                    <Switch
                        disabled={!isChecked}
                        trackColor={{ false: "#767577", true: Colors.red }}
                        thumbColor={isEnabled ? Colors.brand : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={()=>{handleWriteToggle(permission)}}
                        value={isEnabled}
                    />

                </View>


            </View>

        </>
    )
}

export default PremissionListItem


const styles = StyleSheet.create({

    container: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        borderBottomColor: Colors.secondary,
        borderBottomWidth: 2,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },

    checkbox: {
        flex: .2
    },

    text: {
        flex: .6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },

    switch: {
        flex: .2
    }

})