import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {useSelector } from 'react-redux'
import AuthNavigator from './AuthNavigator';
import navigationTheme from './navigationTheme';
import PostLoginNavigator from './PostLoginNavigator';
import { isEmpty } from '../utils';
import NoAccessNavigator from './NoAccessNavigator';



const AppNavigator = ({ }) => {

    const { isLoggedin, userData } = useSelector(state => state.user);
   
    
    return (

        <NavigationContainer theme={navigationTheme}>
            {!isLoggedin ?
                <AuthNavigator /> :
                isEmpty(userData.permissions) ?
                    <NoAccessNavigator /> :
                    <PostLoginNavigator />
            }
        </NavigationContainer>
    )


}


export default AppNavigator