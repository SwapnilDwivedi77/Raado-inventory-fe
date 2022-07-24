import React from 'react';
import { View, Keyboard, TextInput } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Colors,} from '../style';
import {isEmpty} from '../../utils/index'

const DropdownSearchable = ({getItemSelection,items,selectedItem }) => {

  let inputBlur = Keyboard.dismiss
 
  return (
    <SearchableDropdown
    onTextChange={() => {}}
    onItemSelect={(item) => getItemSelection(item)}
    containerStyle={{ padding: 5 }}
    textInputProps={{ onSubmitEditing: inputBlur }}
    textInputStyle={{
      padding:15,
      paddingRight: 55,
      marginTop: 2,
      backgroundColor: Colors.secondary,
      color : Colors.tertiary,
      borderRadius : 16,
    }}
    itemStyle={{
      padding: 10,
      marginTop: 2,
      backgroundColor: '#FAF9F8',
      borderColor: Colors.primary,
      borderBottomWidth: 1,
      paddingLeft : 15
    }}
    itemTextStyle={{
      color: '#222',
    }}
    itemsContainerStyle={{
      maxHeight: '100%',
      maxWidth : '100%'
    }}
    items={items}
    placeholder={!isEmpty(selectedItem) ? selectedItem.name : 'Select user'}
    resetValue={false}
    underlineColorAndroid="transparent"
  />

  );
};

export default DropdownSearchable;
