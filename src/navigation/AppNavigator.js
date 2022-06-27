import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeTabNavigator';
import navigationTheme from './navigationTheme';
import ScreenHeader from '../components/ScreenHeader';
import MenuOptionNavigator from './PostLoginNavigator';
import PostLoginNavigator from './PostLoginNavigator';



const AppNavigator = ({ }) => {

    const isLoggedIn = useSelector(state => state.user).isLoggedin;
    return (
   
    <NavigationContainer theme={navigationTheme}>
       {!isLoggedIn ? 
       <AuthNavigator/> : 
       <PostLoginNavigator/>
       }
    </NavigationContainer>
    )


}


export default AppNavigator