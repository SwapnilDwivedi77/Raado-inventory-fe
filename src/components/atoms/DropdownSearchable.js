import React, { useState, useEffect, useCallback } from 'react';

import { SafeAreaView, StyleSheet, FlatList, View,TouchableOpacity } from 'react-native';
import { Colors, StyledText } from '../style';
import TextInput from './TextInput';
import debounce from 'lodash.debounce';

const DropdownSearchable = ({getItemSelection,usersList }) => {
  let timer;
  const [searchKey, setSearchKey] = useState('')
  const [filteredUser, setFilteredUSer] = useState([])

  const filterUser = (value) => {
    
    if (value.length >= 3) {
      let list = usersList.filter(({ name, phoneNo }) => name.includes(value) || phoneNo.includes(value))
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
    setFilteredUSer([])
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
      />

     

      {filteredUser.length > 0 && <View style={styles.userList}>

        <FlatList
          data={filteredUser}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1, flexDirection: 'column' }} key={item.userId}>
              <TouchableOpacity style={styles.user}  onPress={()=>handleItemSelection(item)} key={item.phoneNo}>
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
    height: "auto",
    flex: 0,
    width: 320,
    // position: 'absolute',
  },
  user: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 2,
    width: "100%",
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary
  }
});