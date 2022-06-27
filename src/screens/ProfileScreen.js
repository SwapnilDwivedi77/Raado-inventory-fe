import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import Card from '../components/atoms/Card'
import {Colors} from '../Config/Colors'
import {ScreenWrapper} from '../components/style'
const   Profile = () =>   {

    const {name ,phoneNo } = useSelector(state => state.user).userData;
  
    return (
     <ScreenWrapper>
         <View style={styles.avatar}>
             <Text style={{fontSize :64 , color : Colors.primary}}>{name[0]}</Text>
             </View>
            <Card height = {120}>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.info}>{'+91' + phoneNo}</Text>
            </View>
        </View>
            </Card>
     </ScreenWrapper>
    );
  
}

export default Profile

const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    marginBottom:10,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : Colors.textDark,
    color : Colors.primary,
    alignSelf:'center',
    marginTop:40
  },
  name:{
    fontSize:22,
    color:Colors.brand,
    fontWeight:'600',
  },
  body:{
    flex: 1,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent : 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
});