import React from 'react'
import {Text,StyleSheet,View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import PermissionsScreen from '../screens/PermissionsScreen'
import ProductRatesScreen from '../screens/ProductRatesScreen'
import { Ionicons } from '@expo/vector-icons';
import routes from './routes'
import HomeTabNavigator from './HomeTabNavigator'
import {Colors} from '../Config/Colors'
import ProfileScreen from '../screens/ProfileScreen'
import ScreenHeader from '../components/ScreenHeader'
import { TouchableOpacity } from 'react-native';
import ReportsScreen from '../screens/ReportsScreen'
import AnalyticsForm from '../components/AnalyticsForm'
const Stack = createStackNavigator();

const headerStyles = {
  headerTintColor: Colors.brand,
  headerStyle: {
    borderBottomWidth: 0,
    // backgroundColor: Colors.brand,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    height: 110
  }
}

const stackHeader = {
  headerTintColor: Colors.brand,
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: Colors.brand,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
}
}

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity style={{marginLeft : 15}} onPress={() => {navigation.goBack()}}>
      <Ionicons name="arrow-back-outline" size={30} color={Colors.primary} />
    </TouchableOpacity>
  )
}

const PostLoginNavigator = () => {
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen
        name={routes.HOME}
        component={HomeTabNavigator}
        options={({ navigation }) => ({
          headerTitle: (props) => <ScreenHeader {...navigation} />,
          ...headerStyles,
        })}
      />
      <Stack.Screen
        name={routes.PERMISSIONS}
        component={PermissionsScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => (
            <Text style={styles.headerTitle}>Manage Permissions</Text>
          ),
          headerLeft: (props) => <BackButton navigation={navigation} />,
          ...stackHeader,
        })}
      />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => (
            <Text style={styles.headerTitle}>Profile</Text>
          ),
          headerLeft: (props) => <BackButton navigation={navigation} />,
          ...stackHeader,
        })}
      />
      <Stack.Screen
        name={routes.RATES}
        component={ProductRatesScreen}
        options={({ navigation }) => ({
          headerTitle: (props) => (
            <Text style={styles.headerTitle}>Product rates</Text>
          ),
          headerLeft: (props) => <BackButton navigation={navigation} />,
          ...stackHeader,
        })}
      />

      <Stack.Screen
        name={routes.ANALYTICS}

        options={({ navigation }) => ({
          headerTitle: (props) => (
            <Text style={styles.headerTitle}>Analytics</Text>
          ),
          headerLeft: (props) => <BackButton navigation={navigation} />,
          ...stackHeader,
        })} >
      
        {props => <ReportsScreen {...props}/>}
        </Stack.Screen>
      <Stack.Screen
        name={routes.USER_REPORT}
        component={AnalyticsForm}
        options={({ navigation }) => ({
          headerTitle: (props) => (
            <Text style={styles.headerTitle}>User Reports</Text>
          ),
          headerLeft: (props) => <BackButton navigation={navigation} />,
          ...stackHeader,
        })}
      />

<Stack.Screen
        name={routes.PROCESS_REPORT}
        component={AnalyticsForm}
        options={({ navigation }) => ({
          headerTitle: (props) => (
            <Text style={styles.headerTitle}>Process Reports</Text>
          ),
          headerLeft: (props) => <BackButton navigation={navigation} />,
          ...stackHeader,
        })}
      />
    </Stack.Navigator>
  );
}

export default PostLoginNavigator

const styles = StyleSheet.create({
  headerTitle : {
    color : Colors.primary,
    fontSize : 18,
    fontWeight : 'bold',
    marginRight : 'auto',
  }
})