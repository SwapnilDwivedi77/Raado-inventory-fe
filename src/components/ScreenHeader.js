import { TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

import { MaterialCommunityIcons, MaterialIcons,Ionicons,FontAwesome } from '@expo/vector-icons';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useDispatch, useSelector } from 'react-redux';

import { Colors } from '../Config/Colors';
import routes from '../navigation/routes';
import { processDropdownList, processLabels } from '../constants/ProcessList'

import Dropdown from './atoms/Dropdown';
import { HeaderWrapper, HeaderAction, DropdownWrapper } from './style'


import { logoutUser } from '../actions/users';
import { selectedProcessAction } from '../actions/selectedProcessAction'
import {isEmpty} from '../utils/index'
import { fetchUserPremissions } from '../actions/getUserPermissions';

const ScreenHeader = (props) => {

  const dispatch = useDispatch();
  const {userData,userPermissions} = useSelector(state => state.user);
  const [permissionDropdown, setpermissionDropdown] = useState([])

  const handleLogout = (values) => {
    hideMenu()
    dispatch(logoutUser(values));
  }


  useEffect(() => {
    let temp = []
    userPermissions.forEach(({ processName }) => {
      temp.push({ label: processLabels[processName], value: processName })
    });
    setpermissionDropdown(temp);
    dispatch(selectedProcessAction(temp[0].value))
  

  }, [userPermissions])

  const [selectedValue, setSelectedValue] = useState(processDropdownList[0].value)
  const [menuVisible, setMenuVisible] = useState(false);

  const isAdmin = useSelector(state => state.user).userData.admin

  const hideMenu = () => setMenuVisible(false);

  const showMenu = () => setMenuVisible(true);

  const handlePickerChange = (value, index) => {
    setSelectedValue(value)
    dispatch(selectedProcessAction(value))
  }
  const handleMenuNavigation = (route) => {
    props.navigate(route)
    hideMenu()
  }

  const handlePermissionRefresh = () => {
    dispatch(fetchUserPremissions(userData.userId))
  }
  return (
    <>
      <HeaderWrapper style={styles.header}>
        <DropdownWrapper>
          <Dropdown selectedValue={selectedValue}
            handlePickerChange={handlePickerChange}
            itemList={permissionDropdown}
            styles={styles.picker}
            itemStyles={styles.pickerItem} />
             <TouchableOpacity onPress={handlePermissionRefresh} style={{marginRight:4}}>
            <Ionicons name="reload-circle" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </DropdownWrapper>
        <HeaderAction>
          <Menu
            visible={menuVisible}
            style={styles.menu}
            anchor={<TouchableOpacity onPress={showMenu}>
              <MaterialCommunityIcons name="dots-vertical" size={24} color={Colors.primary} />
            </TouchableOpacity>}
            onRequestClose={hideMenu}
          >
            {isAdmin &&
              <>
                <MenuItem onPress={() => handleMenuNavigation(routes.PERMISSIONS)}>
                  <MaterialIcons name="admin-panel-settings" size={24} color={Colors.brand} />
                  Permissions
                  </MenuItem>
                <MenuDivider color={Colors.brand} />

                <MenuItem onPress={() => handleMenuNavigation(routes.RATES)}>
                <FontAwesome name="rupee" size={24} color={Colors.brand} />
                  Rates
                </MenuItem>
                <MenuDivider color={Colors.brand} />
              </>
            }
            <MenuItem onPress={() => handleMenuNavigation(routes.PROFILE)}>
              <MaterialIcons name="account-circle" size={24} color={Colors.brand} />
              Profile</MenuItem>
            <MenuDivider color={Colors.brand} />
            <MenuItem onPress={handleLogout}>
              <MaterialCommunityIcons name="logout" size={24} color={Colors.brand} />

              Logout
            </MenuItem>
            <MenuDivider color={Colors.brand} />
          </Menu>
        </HeaderAction>
      </HeaderWrapper>

    </>
  )
}

export default ScreenHeader

const styles = StyleSheet.create({
  picker: {
    padding: 0,
    color: Colors.primary,
    width: 220,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'solid'

  },
  header: {
    borderBottomWidth: 0,
    backgroundColor: Colors.brand,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    padding: 0,

  },
  menu: {
    color: Colors.brand,
    letterSpacing: 1.1,
    fontWeight: 400,
    width: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  pickerItem: {
    backgroundColor: Colors.brand,
    color: Colors.primary,
  }
});