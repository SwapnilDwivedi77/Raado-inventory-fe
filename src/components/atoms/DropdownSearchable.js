import React, { useState, useEffect, useCallback } from 'react';

import {StyleSheet, FlatList, View,TouchableOpacity } from 'react-native';
import { Colors, StyledText } from '../style';
import TextInput from './TextInput';
import debounce from 'lodash.debounce';
import {isEmpty} from '../../utils/index'

const DropdownSearchable = ({getItemSelection,usersList }) => {
  let timer;
  const [searchKey, setSearchKey] = useState('')
  const [filteredUser, setFilteredUSer] = useState(usersList)
  const [showList,setShowList] = useState('false')

  const filterUser = (value) => {

    if(value.length <3){
       setFilteredUSer(usersList)
      return}
    
    if (value.length >= 3) {
      let list = usersList.filter(({ name, phoneNo }) => name.toLowerCase().includes(value.toLowerCase()) || phoneNo.includes(value))
      setFilteredUSer(list);
    }
    else {
      setFilteredUSer([])
    }
  }
  const debouncedSave = useCallback(
    debounce(nextValue => filterUser(nextValue), 500),
    [], // will be created only once initially
  );


  const handleItemSelection = (item) => {
    getItemSelection(item)
    setSearchKey(item.name + ', ' + item.phoneNo)
    setShowList(!showList)
  }

  const handleChange = value => {
    setSearchKey(value);
    debouncedSave(value);
  };
  return (
    <View style={{ ...styles.container}}>
      <TextInput
        style={{ width: 290 }}
        icon="supervised-user-circle"
        placeholder="Search User (Min 3 chars)"
        placeholderTextColor={Colors.darkLight}
        onChangeText={handleChange}
        value={searchKey}
        onFocus={()=> setShowList(!showList)}
        
      />

     

      {!showList && !isEmpty(filteredUser) && <View style={styles.userList}>
   
        <FlatList
          data={filteredUser}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1, flexDirection: 'column',  }} key={item.userId}>
              <TouchableOpacity style={styles.user} key={item.userId}  onPress={()=>handleItemSelection(item)}>
                <StyledText>{item.name + ',' + item.phoneNo}</StyledText>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => item.key}
        />
      </View>
      }

    </View>
  );
};

export default DropdownSearchable;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    zIndex: 2000,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },

  userList: {
    backgroundColor: Colors.primary,

    flex: 1,
    width: 285,
    position: 'absolute',
    zIndex:9999,
    marginTop : '20%',
   
  },
  user: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottomColor: Colors.light,
    borderBottomWidth: 2,
    width: "100%",
    flex: 1,
    flexDirection: 'row',
    backgroundColor : Colors.light
  }
});