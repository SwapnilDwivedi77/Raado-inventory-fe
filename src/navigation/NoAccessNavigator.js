import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import routes from './routes'

import NoPermissions from '../screens/NoPermissions';

const Stack = createStackNavigator();

const NoAccessNavigator = () => (

    <Stack.Navigator  screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name={routes.NO_ACCESS} component={NoPermissions} />
    </Stack.Navigator>
)

export default NoAccessNavigator;