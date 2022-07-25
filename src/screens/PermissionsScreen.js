import { View, TouchableOpacity, StyleSheet, ActivityIndicator,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import RoundButton from '../components/atoms/RoundButton'
import { StyledHeadingText } from '../components/style'
import { Colors } from '../Config/Colors'
import { useDispatch, useSelector } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';

import DropdownSearchable from '../components/atoms/DropdownSearchable'
import { getAllUserCall } from '../actions/getAllUserAction'
import { updateUserPermissionCall } from '../actions/updatePermissionAction'
import SafeAreaView from '../components/atoms/SafeAreaView'
import { getSearchableDropdownItems, isEmpty } from '../utils'
import PermissionList from '../components/PermissionList'




const PermissionsScreen = (props) => {

  const usersList = useSelector(state => state.allUsers);
  const userData = useSelector(state => state.user).userData;
  const updateState = useSelector(state => state.updatePermission);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState({})
  const [permissionList, setpermissionList] = useState()
  const [userDropdownList, setUserDropdownList] = useState([])

  const handleUserFetch = () => {
    dispatch(getAllUserCall())
  }

  useEffect(() => {
    handleUserFetch();
  }, [])

  useEffect(()=>{
    
   if(!isEmpty(usersList.list)) {
     let list = getSearchableDropdownItems(usersList.list,userData.userId);
     setUserDropdownList(list)
   }


  },[usersList])

  const handleItemSelection = (user) => {

    setSelectedUser(user)
    let temp = usersList.list.filter(obj => obj.userId === user.id)
    setpermissionList(temp[0].permissions)

  }



  const resetPage = () => {
    setSelectedUser({})
    setpermissionList([])
    // props.navigation.navigate(routes.LISTINGS)
  }

let updatedPermission = permissionList

  const handleSubmit = () => {
    dispatch(updateUserPermissionCall(selectedUser.id, updatedPermission, resetPage))
  }

  const handlePermissionUpdate = (permission, isChecked) => {

    if (selectedUser && selectedUser.id) {
      if (!isChecked) {
        let idx = updatedPermission.findIndex(({ processName }) => processName === permission.value)
        if (idx > -1)
        updatedPermission.splice(idx, 1)
      }
      else {
        updatedPermission.push({ processName: permission.value, write: false })
      }
    }
  }

  const handleWritePermission = (permission, isEnabled) => {
    if (selectedUser && selectedUser.id)
    {let idx = updatedPermission.findIndex(({ processName }) => processName === permission.value)
    if (idx > -1)
    updatedPermission[idx].write = !updatedPermission[idx].write}
  }



  return (
    
    <SafeAreaView>
      <View style={{width: '80%', position: 'absolute',
          zIndex: 9999,marginLeft : 30,}}>
          <DropdownSearchable
            getItemSelection={(user) => handleItemSelection(user)}
            items={userDropdownList}
            selectedItem={selectedUser}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => {handleUserFetch();resetPage();}} style={{ marginLeft: 'auto',marginTop:10 }}>
            <Ionicons name="reload-circle" size={34} color={Colors.brand} />
          </TouchableOpacity>
        </View>


      <View style={styles.container}>

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

          <PermissionList
          permissionList ={permissionList}
           handlePermissionUpdate={handlePermissionUpdate}
           handleWritePermission={handleWritePermission}
           selectedUser={selectedUser}
          />
          {updateState.loading ?
          <ActivityIndicator size={'large'} /> :

          <RoundButton
            iconColor={Colors.primary}
            styles={styles.submitButton}
            buttonClickedHandler={handleSubmit}
            onPress={handleSubmit}
            icon={<Ionicons name="arrow-forward" size={34} color={Colors.primary} />}
          />}
        </View>

        
    </SafeAreaView>
    
  )
}

export default PermissionsScreen

const styles = StyleSheet.create({
  container: {

    marginTop : 25,

  },

  heading: {
    paddingTop: 15,
    paddingBottom: 15,
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
    marginTop: 5
  },
})