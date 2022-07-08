import { StyleSheet, View, ActivityIndicator , Switch} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import RoundButton from './atoms/RoundButton'
import { Ionicons } from '@expo/vector-icons';
import {
  Colors,
  RequestFormWrapper,
  StyledInputLabel, StyledHeadingText, TextLinkContent,
} from './style'


import NumericInput from './atoms/NumericInput'
import { processStepsMap, processLabels, processList, processFlow, processDropdownList } from '../constants/ProcessList'
import Card from './atoms/Card'
import Dropdown from './atoms/Dropdown'
import { useSelector } from 'react-redux'
import { getNewRequestEntries,} from '../utils'



const ProductRatesForm = ({ handleNewRequestSubmit, loading, handleDropdownChange }) => {

  const { userData,userPermissions } = useSelector(state => state.user)
  let fromUserId = userData.userId
  const usersList = useSelector(state => state.allUsers).list;
  const [selectedProcess, setselectedNextProcess] = useState(processDropdownList[0].value)
  const [filteredUsers, setFilteredUser] = useState([])
  const [selectedNextUser, setNextUser] = useState('')


  const [userToggle , setUserToggle] = useState(false)

 
  const userWithProcessPermissions = (nextProcess) => {
    let nextUsers = []
    if (usersList.length > 0) {
      usersList.forEach((user) => {
        if (user && user.permissions?.some((per) => per.processName === selectedProcess) && user.userId !== fromUserId) {
          let idx = processFlow.indexOf(idx + 1)
          nextUsers.push({ label: user.name, value: user.userId })
        }
      })
      setFilteredUser(nextUsers)
      if (nextUsers.length > 0)
        setNextUser(nextUsers[0].value)
    }
  }


  const handleProcessSelection = (sel) => {
    setselectedNextProcess(sel)
    userWithProcessPermissions()
  }

  const handleUserSelection = (value, index) => {
    setNextUser(value)
  }

  const handleUserToggle = (value) => {
        console.log(value)
        setUserToggle(value)
       value && userWithProcessPermissions()
  }

  const handleFormSubmission = (values) => {

    let formData = {
      fromProcess: selectedProcess,
      toProcess: selectedProcess,
      status: 'CREATED',
      entries: getNewRequestEntries(values, selectedProcess === processList.WAREHOUSE ? selectedProcess : selectedProcess),
      fromUserId: fromUserId,
      toUserId: selectedNextUser
    }
    handleNewRequestSubmit(formData)
  }

  const initialValues = {
    bambooWt: '',
    bambooUnits: '',
    knotWt: '',
    splitWt: '',
    sliverWt: '',
    filamentWt: '',
    sawDustWt: '',
    returnedSliverWt: '',
    polishedSticksWt: '',
    size: '',
    quantity: '',
    finishedProductWt: ''
  }

  return (
    <>

      <View style={styles.pickerContainer}>

            <View style={styles.rateContainer}>
                <View style={{flex:.4,justifyContent:'center',alignItems : 'flex-end',}}>
                <StyledHeadingText style={styles.toggleLabel}>Global Rates</StyledHeadingText>
                </View>

                <View style={{flex:.2,justifyContent:'center',alignItems : 'center'}}>
                <Switch
                        trackColor={{ false: "#767577", true: Colors.red }}
                        thumbColor={userToggle ? Colors.brand : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={handleUserToggle}
                        value={userToggle}
                    />
                </View>

                <View style={{flex:.4,justifyContent:'center',alignItems:'flex-start'}}>
                <StyledHeadingText style={styles.toggleLabel}>User Rates</StyledHeadingText>
                </View>
            </View>




        <StyledInputLabel style={{ color: Colors.brand,marginBottom : 5 }}>Select Process</StyledInputLabel>
        <Dropdown
          selectedValue={selectedProcess}
          handlePickerChange={handleProcessSelection}
          itemList={processDropdownList}
          styles={styles.picker}
          itemStyles={styles.pickerItem}
    
        />
      </View>
     {userToggle && <View style={styles.pickerContainer}>
        <StyledInputLabel style={{ color: Colors.brand }}>Select user</StyledInputLabel>
        <Dropdown
          selectedValue={selectedNextUser}
          handlePickerChange={(value, index) => handleUserSelection(value, index)}
          itemList={filteredUsers}
          styles={styles.picker}
          itemStyles={styles.pickerItem}
       
        />
      </View>}

      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {

          handleFormSubmission(values)
          setTimeout(() => { resetForm(initialValues) }, 500)


        }}>

        {({ handleChange, handleBlur, handleSubmit, resetForm, values, }) => (
          <>

            <View >
              <View style={styles.labelContainer}>
                <StyledHeadingText>Enter rates (in /kgs)</StyledHeadingText>

              </View>
              <RequestFormWrapper>

                <Card>

                  {processStepsMap[selectedProcess !== processList.WAREHOUSE ? selectedProcess : selectedProcess]?.map(({ value, label }, index) => {
                    return (
                      <View style={styles.inputContainer}>
                        <NumericInput
                          key={index}
                          label={label}
                          onChangeText={handleChange(value)}
                          onBlur={handleBlur(value)}
                          value={values[value]}
                          keyboardType="number-pad"
                          width={70}
                          placeholder={'₹'}
                          placeholderTextColor={Colors.secondary}
                          placeholderFontSize={18}
                        />
                      </View>
                    )
                  })}


                </Card>


              </RequestFormWrapper>

              {loading ?
                <ActivityIndicator size={'large'} />
                :

                <RoundButton
                  iconColor={Colors.primary}
                  styles={styles.submitButton}
                  buttonClickedHandler={handleSubmit}
                  iconSize={40}
                  onPress={handleSubmit}
                 
                  icon={<Ionicons name="arrow-forward" size={24} color={Colors.primary} />}
                />}
             </View>


          </>

        )}


      </Formik>
    </>
  )
}

export default ProductRatesForm


const styles = StyleSheet.create({

  dropdownLayout: {
  },
  submitButton: {
    backgroundColor: Colors.textBlue,
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginTop: 10
  },
  inputContainer: {
    marginBottom: 15,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,

  },
  labelContainer: {
    padding: 5,
    alignItems: 'center'
  },
  picker: {
    padding: 10,
    color: Colors.tertiary,
    width: 270,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'solid',
    backgroundColor: Colors.secondary,


  },
  pickerItem: {
    backgroundColor: Colors.secondary,
    color: Colors.tertiary,
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  rateContainer : {
    flexDirection : 'row',
    justifyContent : 'center',
    width : '100%',
    paddingRight : 5,
    paddingLeft : 5,
    paddingBottom : 5,
    paddingTop : 5,
    marginTop : 15,
    marginBottom : 25
  },

  toggleLabel : {
    textTransform : 'capitalize',
    fontSize: 16,
    fontWeight : 'bold',
  }

})