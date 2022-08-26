import { StyleSheet, TouchableOpacity, View, Switch } from 'react-native';
import React, { useState } from 'react';
import { Colors, StyledHeadingText } from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import { filterConfig } from '../constants/filterConfig';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Entypo } from '@expo/vector-icons';

const FilterComponent = ({ callOnFilter }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedStatus,setStatus] = useState('');
  
  const handleListToggle = () => {
    setToggle(!toggle) 
    callOnFilter({[filterConfig.MY_DATA] : !toggle , [filterConfig.STATUS_FILTER] : selectedStatus});
  };

  const handleStatusFilter = (status) => {
    setStatus(status)
    callOnFilter({[filterConfig.MY_DATA] : toggle , [filterConfig.STATUS_FILTER] : status});
    hideMenu()
  }

  const removeStatusFilter = () => {
    setStatus('')
    callOnFilter({[filterConfig.MY_DATA] : toggle , [filterConfig.STATUS_FILTER] : ''});
    
  }

  const hideMenu = () => setMenuVisible(false);

  const showMenu = () => setMenuVisible(true);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <StyledHeadingText>All</StyledHeadingText>
        <Switch
          trackColor={{ false: '#767577', true: Colors.red }}
          thumbColor={toggle ? Colors.brand : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleListToggle}
          value={toggle}
        />
        <StyledHeadingText style={{marginRight : 20}}>Me</StyledHeadingText>
          <Menu
            visible={menuVisible}
            anchor={ <TouchableOpacity onPress={showMenu} style={{flexDirection: 'row',alignItems: 'center',}}>
               <StyledHeadingText>Status</StyledHeadingText>
            <FontAwesome5 name="filter" size={24} color={Colors.brand} />
          </TouchableOpacity>}
            onRequestClose={hideMenu}
          >
            <MenuItem onPress={()=>handleStatusFilter('CREATED')}>CREATED</MenuItem>
            <MenuDivider />
            <MenuItem onPress={()=>handleStatusFilter('APPROVED')}>APPROVED</MenuItem>
            <MenuDivider />
            <MenuItem onPress={()=>handleStatusFilter('REJECTED')}>REJECTED</MenuItem>
          </Menu>

        { selectedStatus.length > 0 &&
        <TouchableOpacity onPress={removeStatusFilter}>
            <View style={styles.status}>
            <StyledHeadingText>{selectedStatus}</StyledHeadingText>
            <Entypo name="cross" size={15} color="black" />
          </View>
        </TouchableOpacity>
        
        }

      </View>
    </View>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: 60,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 3,
  },
  toggleLabel: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    backgroundColor: Colors.light,
    padding : 5,
    borderRadius : 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
