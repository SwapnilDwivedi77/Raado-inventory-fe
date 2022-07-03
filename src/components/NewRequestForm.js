import { StyleSheet, View, ActivityIndicator } from 'react-native'
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
import { processStepsMap, processLabels, processList, processFlow } from '../constants/ProcessList'
import Card from './atoms/Card'
import Dropdown from './atoms/Dropdown'
import { useSelector } from 'react-redux'
import { getNewRequestEntries, isEmpty } from '../utils'



const NewRequestForm = ({ handleNewRequestSubmit, loading, handleDropdownChange, selectedProcess }) => {

  const { userData } = useSelector(state => state.user)
  let fromUserId = userData.userId
  const usersList = useSelector(state => state.allUsers).list;
  const [selectedNextProcess, setselectedNextProcess] = useState(processList.WAREHOUSE)
  const [nextProcessOptions, setNextProcessOptions] = useState([])
  const [filteredUsers, setFilteredUser] = useState([])
  const [selectedNextUser, setNextUser] = useState('')
  const [isWrite, setIsWrite] = useState(false)

  const findUserdWithNextPermissions = (nextProcess) => {
    let nextUsers = []
    if (usersList.length > 0) {
      usersList.forEach((user) => {
        if (user && user.permissions?.some((per) => per.processName === nextProcess) && user.userId !== fromUserId) {
          let idx = processFlow.indexOf(idx + 1)
          nextUsers.push({ label: user.name, value: user.userId })
        }
      })
      setFilteredUser(nextUsers)
      if (nextUsers.length > 0)
        setNextUser(nextUsers[0].value)
    }
  }
  const findNextProcessForUser = () => {

    let nextProcess = []
    if (selectedProcess == processList.WAREHOUSE) {
      processFlow.forEach((pre) => {
        nextProcess.push({ label: processLabels[pre], value: pre })

      })

      setNextProcessOptions(nextProcess)
      setselectedNextProcess(nextProcess[0].value)
      findUserdWithNextPermissions(nextProcess[0].value)
    }
    else {
      let idx = processFlow.indexOf(selectedProcess)
      nextProcess = processFlow[idx + 1]
      setNextProcessOptions([{ label: processLabels[nextProcess], value: nextProcess }, { label: processLabels.WAREHOUSE, value: processList.WAREHOUSE }])
      findUserdWithNextPermissions(nextProcess)
    }

  }

  useEffect(() => {

    findNextProcessForUser()

    let write = true;
    if (!isEmpty(userData) && !isEmpty(userData.permissions))
      write = userData.permissions.filter((per) => per.processName === selectedProcess)[0].write
    console.log('This is write', write)
    setIsWrite(write)

  }, [selectedProcess])


  const handleNextProcessSelection = (sel) => {
    setselectedNextProcess(sel)
    findUserdWithNextPermissions(sel)
    let renderProcess = sel === processList.WAREHOUSE ? sel : sel
    setFormRender(renderProcess)

  }

  const handleUserSelection = (value, index) => {
    setNextUser(value)
  }

  const handleFormSubmission = (values) => {

    let formData = {
      fromProcess: selectedProcess,
      toProcess: selectedNextProcess,
      status: 'CREATED',
      entries: getNewRequestEntries(values, selectedProcess === processList.WAREHOUSE ? selectedNextProcess : selectedProcess),
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
        <StyledInputLabel style={{ color: Colors.brand }}>Select next Process</StyledInputLabel>
        <Dropdown
          selectedValue={selectedNextProcess}
          handlePickerChange={handleNextProcessSelection}
          itemList={nextProcessOptions}
          styles={styles.picker}
          itemStyles={styles.pickerItem}
          enabled={isWrite}
        />
      </View>
      <View style={styles.pickerContainer}>
        <StyledInputLabel style={{ color: Colors.brand }}>Select receiving user</StyledInputLabel>
        <Dropdown
          selectedValue={selectedNextUser}
          handlePickerChange={(value, index) => handleUserSelection(value, index)}
          itemList={filteredUsers}
          styles={styles.picker}
          itemStyles={styles.pickerItem}
          enabled={isWrite}
        />
      </View>

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
                <StyledHeadingText>Product details for this step.</StyledHeadingText>

              </View>
              <RequestFormWrapper>

                <Card>

                  {processStepsMap[selectedProcess !== processList.WAREHOUSE ? selectedProcess : selectedNextProcess]?.map(({ value, label }, index) => {
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
                          placeholder={'kgs'}
                          placeholderTextColor={Colors.secondary}
                          placeholderFontSize={18}
                          editable={isWrite}
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
                  disabled={!isWrite}
                  icon={<Ionicons name="arrow-forward" size={24} color={Colors.primary} />}
                />}
              {!isWrite && <View style={{ marginLeft: 'auto', marginRight: 'auto' }}><TextLinkContent>Dont have write access for this process.</TextLinkContent></View>}
            </View>


          </>

        )}


      </Formik>
    </>
  )
}

export default NewRequestForm


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
  }

})