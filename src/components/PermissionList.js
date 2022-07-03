import { View, FlatList } from 'react-native'
import React from 'react'
import { processDropdownList} from '../constants/ProcessList'
import PremissionListItem from './PremissionListItem'

const PermissionList = ({permissionList, handlePermissionUpdate,handleWritePermission,selectedUser}) => {
  return (
    <FlatList
            data={processDropdownList}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1, flexDirection: 'column' }}>
                <PremissionListItem
                  permission={item}
                  userPermissionData={permissionList}
                  handlePermissionUpdate={handlePermissionUpdate}
                  handleWritePermission={handleWritePermission}
                  selectedUser={selectedUser}
                />
              </View>
            )}
            //Setting the number of column
            numColumns={1}
            keyExtractor={(item, index) => index}
          />
  )
}

export default PermissionList