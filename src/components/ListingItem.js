import { View, StyleSheet, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import Card from './atoms/Card'
import { CardContentLabel } from './atoms/CradLabel'
import { Entypo } from '@expo/vector-icons';
import { statusColor, cardColor } from '../Config/Colors'
import { FontAwesome } from '@expo/vector-icons';
import { Colors, Line, StyledHeadingText, StyledText } from './style'
import moment from "moment";
import { MaterialIcons } from '@expo/vector-icons';
import RoundButton from './atoms/RoundButton'
import { ActivityIndicator } from 'react-native';

import {cardStepsLabel} from '../constants/ProcessList'

const ListingItem = ({ listings,loading, isApprovalTab = false, handleApproval,...props }) => {
  

  return (
    <View>
      <Card height={isApprovalTab ? 300  : 240}>

        <View style={styles.process}>
          <CardContentLabel style={{ color: '#6A0D01', backgroundColor: cardColor.SENDER.backgroundColor, marginRight: 12, flex : .4 }}>{listings.fromProcess.split('_').join(' ')}</CardContentLabel>
          <FontAwesome name="arrow-circle-right" size={24} color={!isApprovalTab ? statusColor[listings.status]: Colors.textBlue} style={{flex:.2}} />
          <CardContentLabel style={{ color: '#6A0D01', backgroundColor: cardColor.RECEIVER.backgroundColor, flex:.4, marginLeft: 12 }}>{listings.toProcess.split('_').join(' ')}</CardContentLabel>
        </View>
        <View style={styles.container}>


          <View style={{ flexDirection: 'row' }}>

            <View style={{ marginBottom: 10, padding: 5, flex: .4 }}>
              <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                <MaterialIcons name="call-made" size={18} color={Colors.brand} style={styles.icon}/>
                <StyledText style={{ color: cardColor.SENDER.textColor, fontWeight: '700' }} numberOfLines={2} ellipsizeMode={'tail'}>{listings.fromUserName}</StyledText>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                <MaterialIcons name="call-received" size={18} color={Colors.brand}  style={styles.icon} />
                <StyledText style={{ color: cardColor.RECEIVER.textColor, fontWeight: '700' }} numberOfLines={2} ellipsizeMode={'tail'}>{listings.toUserName}</StyledText>
              </View>

            </View>

            <View style={{ padding: 5, flex: .6 }}>
              <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                <MaterialIcons name="date-range" size={24} color={Colors.brand}  style={styles.icon} />
                <StyledText style={{ color: cardColor.SENDER.textColor, fontWeight: '700' }}>{moment(listings.timeOfTransaction).format("MMM D, YYYY")}</StyledText>
              </View>

              <View style={{ flexDirection: 'row', }}>
                <MaterialIcons name="update" size={24} color={Colors.brand}  style={styles.icon} />
                <StyledText style={{ color: cardColor.RECEIVER.textColor, fontWeight: '700' }}>{listings.timeOfApproval ? moment(listings.timeOfApproval).format("MMM D, YYYY") : 'Update Awaited'}</StyledText>
              </View>

            </View>

          </View>



    

          <Line />

          <View style={styles.product}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>

              {Object.keys(listings.entries).map((item, index) => {
                return (
                  <View key={index} style={{ flex: 1, flexDirection: 'column', margin: 1, flexDirection: 'column', backgroundColor: '#6A0D01', borderRadius: 10, borderColor: "red", width: 120, height: 80 }}>
                    <View style={{ flex: .4, justifyContent: 'center', alignItems: 'center' }}>
                      <StyledText style={{ fontSize: 12, fontWeight: "800", textAlign: 'center',color :Colors.primary }}>{cardStepsLabel[item]?.toUpperCase()}</StyledText>
                    </View>
                    <View style={{ flex: .6, justifyContent: 'center', alignItems: 'center' }}>
                      <StyledText style={{ fontSize: 18,color :Colors.primary }}>{listings.entries[item]}</StyledText>
                      <StyledText style={{ fontSize: 10,color :Colors.primary }}>kgs</StyledText>
                    </View>

                  </View>)
              })}

            </View>

          </View>



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
    flexDirection: 'row'
  },

  container: {
    flex: 1,
    marginTop: 10,
  },
  user: {

    flex: .5,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },

  date: {

    flex: .5,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'

  },

  product: {
    flex: 1,
  },
  status: {
    justifyContent: 'center',
    alignItems: 'center',
flexDirection : 'row',
    width: '100%',

    borderRadius: 10
  },

  statusColor: {
    color: Colors.primary,
    backgroundColor: Colors.green
  },

  textStyles: {
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  submitButton: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginTop: 10
  },
  icon : {
    marginRight : 3
  }
})