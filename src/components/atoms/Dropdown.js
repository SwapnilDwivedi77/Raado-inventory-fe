
import React from 'react'

import { Picker } from "@react-native-picker/picker";
import Colors from '../../Config/Colors'

const Dropdown = ({handlePickerChange , styles,selectedValue , itemList,enabled}) => {
  return (
   <Picker
        selectedValue={selectedValue}
        onValueChange={(value, index) =>handlePickerChange(value,index)}
        mode="dropdown" // Android only
        style={styles}
        enabled={enabled}
       >

{itemList.map((item,index) => {
        return (<Picker.Item label={item.label}  value={item.value} key={index}/>) //if you have a bunch of keys value pair
    })}

      </Picker>
  )
}

export default Dropdown
