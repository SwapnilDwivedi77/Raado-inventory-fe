import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {useSelector,useDispatch } from 'react-redux'
import AuthNavigator from './AuthNavigator';
import navigationTheme from './navigationTheme';
import PostLoginNavigator from './PostLoginNavigator';
import { isEmpty } from '../utils';
import NoAccessNavigator from './NoAccessNavigator';
import {fetchUserPremissions} from '../actions/getUserPermissions'



const AppNavigator = ({ }) => {

    const { isLoggedin, userData,userPermissions } = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchUserPremissions(userData.userId))
    }, [])
    
    return (

        <NavigationContainer theme={navigationTheme}>
            {!isLoggedin ?
                <AuthNavigator /> :
                isEmpty(userPermissions) ?
                    <NoAccessNavigator /> :
                    <PostLoginNavigator />
            }
        </NavigationContainer>
    )


}


export default AppNavigator