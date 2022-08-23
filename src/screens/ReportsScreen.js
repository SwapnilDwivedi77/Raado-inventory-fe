import { View, StyleSheet,TouchableOpacity } from 'react-native';
import React,{ useEffect, useState} from 'react';
import ImageButton from '../components/atoms/ImageButton';
import {isEmpty} from '../utils/index'
import AnalyticsForm from '../components/AnalyticsForm';
import routes from '../navigation/routes';
import { useSelector } from 'react-redux';

const ReportsScreen = (props) => {
  const { userData } = useSelector((state) => state.user);
  

  return (
  
   <>
   {userData.admin ? <View style={styles.container}>

      <TouchableOpacity onPress={()=> props.navigation.navigate(routes.USER_REPORT)}>
      <ImageButton
        height={180}
        width={180}
        title={'User Data'}
        imgSrc={require('../../assets/img/userData.png')}
      />
      </TouchableOpacity>
     <TouchableOpacity onPress={()=> props.navigation.navigate(routes.PROCESS_REPORT)}>
     <ImageButton
        height={180}
        width={180}
        title={'Process Data'}
        imgSrc={require('../../assets/img/processData.png')}
      />
     </TouchableOpacity>
     
    </View> :
    <AnalyticsForm/>
    }
    
    </>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop : 25
  },
});
