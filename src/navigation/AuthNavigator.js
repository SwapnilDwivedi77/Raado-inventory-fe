import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import routes from './routes'

import Login from '../screens/Login'
import Signup from '../screens/Signup'

const Stack = createStackNavigator();

const AuthNavigator = () => (

    <Stack.Navigator  screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name={routes.LOGIN} component={Login} />
        <Stack.Screen name={routes.SIGNUP} component={Signup} />
    </Stack.Navigator>
)

export default AuthNavigator;