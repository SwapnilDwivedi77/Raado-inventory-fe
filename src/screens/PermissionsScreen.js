import { View, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PremissionListItem from '../components/PremissionListItem'

import { ScreenWrapper, StyledContainer } from '../components/style'
import RoundButton from '../components/atoms/RoundButton'
import { StyledHeadingText } from '../components/style'
import { Colors } from '../Config/Colors'
import { processDropdownList, processList } from '../constants/ProcessList'
import { useDispatch, useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

import DropdownSearchable from '../components/atoms/DropdownSearchable'
import { getAllUserCall } from '../actions/getAllUserAction'
import { updateUserPermissionCall } from '../actions/updatePermissionAction'
import routes from '../navigation/routes'
import SafeAreaView from '../components/atoms/SafeAreaView'




const PermissionsScreen = (props) => {

  const usersList = useSelector(state => state.allUsers);
  const userData = useSelector(state => state.user).userData;
  const updateState = useSelector(state => state.updatePermission);
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState({})
  const [permissionList, setpermissionList] = useState()

  useEffect(() => {
    dispatch(getAllUserCall())
  }, [])

  const handleItemSelection = (user) => {

    setSelectedUser(user)
    setpermissionList(user.permissions)

  }



  const resetPage = () => {
    console.log('resetCalled')
    setSelectedUser({})
    setpermissionList([])
    // props.navigation.navigate(routes.LISTINGS)
  }



  const handleSubmit = () => {

    dispatch(updateUserPermissionCall(selectedUser.userId, permissionList, resetPage))
  }

  const handlePermissionUpdate = (permission, isChecked) => {

    if (selectedUser && selectedUser.userId) {
      if (!isChecked) {
        let idx = permissionList.findIndex(({ processName }) => processName === permission.value)
        if (idx > -1)
          permissionList.splice(idx, 1)
      }
      else {
        permissionList.push({ processName: permission.value, write: false })
      }
    }
  }

  const handleWritePermission = (permission, isEnabled) => {
    if (selectedUser && selectedUser.userId)
    {let idx = permissionList.findIndex(({ processName }) => processName === permission.value)
    if (idx > -1)
      permissionList[idx].write = !permissionList[idx].write}
  }



  return (

    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>

          <DropdownSearchable
            style={{ backgroundColor: Colors.light }}
            backgroundColor={Colors.light}
            getItemSelection={(user) => handleItemSelection(user)}
            usersList={usersList.list}
          />
          {usersList.loading && <ActivityIndicator size={'small'} />}

          <View style={styles.heading}>
            <View style={{ flex: .3 }}>
              <StyledHeadingText style={{ ...styles.textStyles, marginRight: 13 }}>Select</StyledHeadingText>
            </View>
            <View style={{ flex: .4, justifyContent: 'center', alignItems: 'center' }}>
              <StyledHeadingText style={{ ...styles.textStyles, marginRight: 13 }}>Process</StyledHeadingText>
            </View>
            <View style={{ flex: .3 }}>
              <StyledHeadingText style={{ ...styles.textStyles, marginRight: 13 }}>Write Access</StyledHeadingText>
            </View>
          </View>



          <FlatList
            data={processDropdownList}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1, flexDirection: 'column' }}>
                <PremissionListItem
                  permission={item}
                  userPermissionData={permissionList}
                  handlePermissionUpdate={handlePermissionUpdate}
                  handleWritePermission={handleWritePermission}
                  reset={updateState.success}
                />
              </View>
            )}
            //Setting the number of column
            numColumns={1}
            keyExtractor={(item, index) => index}
          />
        </View>

        {updateState.loading ?
          <ActivityIndicator size={'large'} /> :

          <RoundButton
            iconColor={Colors.primary}
            styles={styles.submitButton}
            buttonClickedHandler={handleSubmit}
            onPress={handleSubmit}
            icon={<Ionicons name="arrow-forward" size={34} color={Colors.primary} />}
          />}
      </ScrollView>
    </SafeAreaView>
  )
}

export default PermissionsScreen

const styles = StyleSheet.create({
  container: {



  },

  heading: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    borderBottomColor: Colors.tertiary,
    borderBottomWidth: 2,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
  },

  textStyles: {
    textTransform: 'uppercase',
    fontWeight: '700'
  },

  submitButton: {
    backgroundColor: Colors.textBlue,
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10
  },
})