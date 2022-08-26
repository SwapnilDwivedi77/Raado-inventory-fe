import { View, StyleSheet, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import Card from './atoms/Card'
import { CardContentLabel } from './atoms/CradLabel'
import { Entypo } from '@expo/vector-icons';
import { statusColor, cardColor } from '../Config/Colors'
import { FontAwesome } from '@expo/vector-icons';
import { CardHeading, Colors, Line, StyledHeadingText, StyledText } from './style'
import moment from "moment";
import { MaterialIcons } from '@expo/vector-icons';
import RoundButton from './atoms/RoundButton'
import { ActivityIndicator } from 'react-native';
import { cardStepsLabel } from '../constants/ProcessList';


const ListingItem = ({ listings,loading, isApprovalTab = false, handleApproval,...props }) => {
  
  const sentenceCase = (str) => {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ')
  }
  return (
    <View>
      <Card height={isApprovalTab ? 255  : 225}>

      <View style={styles.container}>

        <View style={styles.sender}>
          <View style={{flexDirection: 'row',}}>
          { !isApprovalTab && <FontAwesome name="dot-circle-o" size={17} color={statusColor[listings.status]} />}
          <CardHeading numberOfLines={1}>{listings.fromProcess.split('_').join(' ')}</CardHeading>
          </View>  
              <View style={{...styles.content,alignItems: 'flex-end'}}>
               <Text>{listings.fromUserName}</Text>
            </View> 

            <View style={{...styles.content,alignItems: 'flex-end'}}>
            <Text style={{ color: Colors.textBlue, fontWeight: '500' }}>{listings.timeOfTransaction ? moment(listings.timeOfTransaction).format("HH:mm,MMM D YYYY") : 'Update Awaited'}</Text>
              
            </View> 
            
        </View>
        

        <View style={styles.icons}>
        <FontAwesome name="arrow-right" size={18} color={Colors.dark} style={styles.icon}/>
        <FontAwesome name="user" size={24} color={Colors.dark} style={styles.icon}/>
        <MaterialIcons name="update" size={24} color={Colors.dark}  style={styles.icon} />
                                  
        </View>

        <View style={styles.receiver}>

        <View style={{flexDirection: 'row',}}>
         
          <CardHeading numberOfLines={1}>{listings.toProcess.split('_').join(' ')}</CardHeading>
          
        
        </View>
        <View style={{...styles.content,alignItems: 'flex-start'}}>
               <Text>{listings.toUserName}</Text>
            </View> 

            <View style={{...styles.content,alignItems: 'flex-start'}}>
            <Text style={{ color: Colors.textBlue, fontWeight: '500' }}>{listings.timeOfApproval ? moment(listings.timeOfApproval).format("HH:mm,MMM D YYYY") : 'Update Awaited'}</Text>
              
            </View> 
        
        </View>


        

      </View>

      <Line />

      <View style={styles.product}>
    {Object.keys(listings.entries).map((item, index) => {
      return (
        <View key={index} style={styles.quantity}>
          <View style={{ alignItems: 'center',}}>
            <StyledText style={{ fontSize: 16, fontWeight: "800", textAlign: 'center',color :Colors.dark, }}>{cardStepsLabel[item]?.toUpperCase()}</StyledText>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center',flexDirection: 'row'}}>
            <StyledText style={{ fontSize: 44,color :Colors.brand }}>{listings.entries[item]}</StyledText>
            <Text style={{ fontSize: 10,color :Colors.dark,fontWeight: 'bold',marginTop:35}}>kgs</Text>
         
             </View>
             

        </View>)
    })}


</View>
    

         



        

         {loading && <ActivityIndicator/>}
         
        {isApprovalTab && !loading && <View style={styles.status}>
         
          <RoundButton
          
            icon={<Entypo name="check" size={24} color={Colors.primary} />}
            styles={{...styles.submitButton, backgroundColor: Colors.textBlue, marginRight : 10}}
            onPress={()=>{handleApproval(listings,'APPROVED')}}
          />
           <RoundButton
            icon={<Entypo name="cross" size={24} color={Colors.primary} />}
            styles={{...styles.submitButton, backgroundColor: Colors.red,}}
            onPress={()=>{handleApproval(listings,'REJECTED')}}
          />
        </View>}

      </Card>
    </View>
  )
}

export default ListingItem


const styles = StyleSheet.create({
  process: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  user: {
    flex: 0.5,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  date: {
    flex: 0.5,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  product: {
    flex: .5,
    flexDirection :'row',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius : 15,
    backgroundColor: Colors.light,
  
  },
  status: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    position : 'absolute',
    marginTop : 220
  },

  statusColor: {
    color: Colors.primary,
    backgroundColor: Colors.green,
  },

  textStyles: {
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  submitButton: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
  },
  icon: {
    marginRight: 3,
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '45%',
    flex : .45
  },
  sender: {
    flex: 0.45,
    flexDirection: 'column',
  },
  receiver: {
    flex: 0.45,
  },
  icons: {
    flex: 0.1,
    alignItems: 'center',
  },
  icon: {
    margin: 5,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    marginTop: 3
  },
  quantity: {
    paddingRight : 5,
    paddingLeft : 5,
  },
});