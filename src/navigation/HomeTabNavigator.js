import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ApprovalScreen from '../screens/ApprovalScreen'
import ListingsScreen from '../screens/ListingsScreen'
import NewRequestScreen from '../screens/NewRequestScreen'
import { Feather } from '@expo/vector-icons';
import NewListingButton from '../components/NewListingButton'

import routes from './routes'
import 'react-native-gesture-handler';
import {Colors} from '../Config/Colors'
const Tab = createBottomTabNavigator()


const headerStyles = {
    headerTintColor: Colors.brand,
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: Colors.brand,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 0 },
      height: 110
    }
  }


const HomeTabNavigator = () => (

    <Tab.Navigator screenOptions={{
        headerShown: false
      }}
      >
    <Tab.Screen name={routes.LISTINGS} component={ListingsScreen}
        options={({ navigation }) => ({
            tabBarIcon: ({ color, size }) =>( <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size}/>),     
        })} />
    <Tab.Screen name={routes.OPEN_REQUEST} component={NewRequestScreen}
        options={({ navigation }) => ({
            tabBarButton: () => (<NewListingButton onPress={() => navigation.navigate(routes.OPEN_REQUEST)} />),
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                    name="plus-circle"
                    color={color}
                    size={size} />),
                  
        })} />
    <Tab.Screen name={routes.APPROVALS} component={ApprovalScreen}
        options={{
            tabBarIcon: ({ color, size }) => (<Feather name="user-check" color={color} size={size} />),
             }} />
</Tab.Navigator>

)

export default HomeTabNavigator