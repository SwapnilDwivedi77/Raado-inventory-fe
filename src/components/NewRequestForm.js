import { StyleSheet, View, ActivityIndicator,Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import RoundButton from './atoms/RoundButton';
import { Ionicons } from '@expo/vector-icons';
import {
  Colors,
  RequestFormWrapper,
  StyledInputLabel,
  StyledHeadingText,
  TextLinkContent,
} from './style';

import NumericInput from './atoms/NumericInput';
import {
  processStepsMap,
  processLabels,
  processList,
  processFlow,
  processDropdownList
} from '../constants/ProcessList';
import Card from './atoms/Card';
import Dropdown from './atoms/Dropdown';
import { useSelector } from 'react-redux';
import { getNewRequestEntries, isEmpty } from '../utils';

const NewRequestForm = ({
  handleNewRequestSubmit,
  loading,
  selectedProcess,
}) => {
  const { userData, userPermissions } = useSelector((state) => state.user);
  let fromUserId = userData.userId;
  const usersList = useSelector((state) => state.allUsers).list;
  const [selectedNextProcess, setselectedNextProcess] = useState();
  const [nextProcessOptions, setNextProcessOptions] = useState([]);
  const [filteredUsers, setFilteredUser] = useState([]);
  const [selectedNextUser, setNextUser] = useState('');
  const [isWrite, setIsWrite] = useState(false);
  const [productFields,setProductFields] = useState([]);
  const [rawMaterialRemaining,setRawMaterialRemaining] = useState(false);

  const [fromWareHouse , setFromWareHouse] = useState(false);
  const [toWareHouse,setToWareHouse] = useState(false);

  const checkPermissionExists = (permissions, process) => {
    let temp = [];
    temp = permissions.filter(
      (per) => per.processName === process && per.write,
    );

    return temp.length;
  };

  const getProductFields = (fromProcess,nextProcess,rawRemaining=rawMaterialRemaining) =>{
    let fields = []
    let processArray = Object.keys(processStepsMap)
   
    if(fromProcess === processList.WAREHOUSE) {
      let nextIdx = processArray.indexOf(nextProcess);
      fields = processStepsMap[processArray[nextIdx-1]]
    }
    else {
      let nextIdx = processArray.indexOf(fromProcess);
      fields = processStepsMap[processArray[nextIdx]]
      if(rawRemaining) {
        let rawFields = processStepsMap[processArray[nextIdx-1]]
        fields = [...rawFields,...fields]
      }
    }
    setProductFields(fields)

  }

  const findUserdWithNextPermissions = (nextProcess) => {
    let nextUsers = [];
    if (usersList.length > 0) {
      usersList.forEach((user) => {
        if (
          user &&
          checkPermissionExists(user.permissions, nextProcess) &&
          user.userId !== fromUserId
        ) {
          nextUsers.push({ label: user.name, value: user.userId });
        }
      });
      setFilteredUser(nextUsers);
      if (nextUsers.length > 0) setNextUser(nextUsers[0].value);
    }
  };
  const findNextProcessForUser = () => {
    let nextProcess = [];
    if (selectedProcess !== processList.WAREHOUSE) {
     nextProcess = [{label: processLabels[processList.WAREHOUSE], value :processList.WAREHOUSE}]
     setToWareHouse(true)
     setselectedNextProcess(nextProcess[0].value);
      findUserdWithNextPermissions(nextProcess[0].value);
    } else {
      nextProcess = processDropdownList.filter(obj => obj.value !== processList.WAREHOUSE && obj.value !== processList[Object.keys(processStepsMap)[0]])
      setToWareHouse(false)
      setselectedNextProcess(nextProcess[0].value);
      findUserdWithNextPermissions(nextProcess[0].value);
    }

    getProductFields(selectedProcess,nextProcess[0].value)
    setNextProcessOptions(nextProcess);
  };

  useEffect(() => {
    setFromWareHouse(selectedProcess === processList.WAREHOUSE)
    findNextProcessForUser();
    let write = true;
    write = userPermissions.filter(
      (per) => per.processName === selectedProcess,
    )[0].write;
    setIsWrite(write);
  }, [selectedProcess]);

  useEffect(() => {
    if (!isEmpty(selectedNextProcess) && !isEmpty(usersList)) {
      findUserdWithNextPermissions(selectedNextProcess);
    }
  }, [usersList]);

  const handleNextProcessSelection = (sel) => {
    setselectedNextProcess(sel);
    findUserdWithNextPermissions(sel);
    getProductFields(selectedProcess,sel)
  };

  const handleUserSelection = (value, index) => {
    setNextUser(value);
  };

  const handleFormSubmission = (values) => {
    let formData = {
      fromProcess: selectedProcess,
      toProcess: selectedNextProcess,
      status: 'CREATED',
      entries: getNewRequestEntries(
        values,
        selectedProcess === processList.WAREHOUSE
          ? selectedNextProcess
          : selectedProcess,
      ),
      fromUserId: fromUserId,
      toUserId: selectedNextUser,
    };
    handleNewRequestSubmit(formData);
  };

  const handleRawToggle = () => {
    setRawMaterialRemaining(!rawMaterialRemaining)
    getProductFields(selectedProcess,selectedNextProcess,!rawMaterialRemaining)
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
    finishedProductWt: '',
  };

  return (
    <>
      <View style={styles.pickerContainer}>
        <StyledInputLabel style={{ color: Colors.brand }}>
          Select next Process
        </StyledInputLabel>
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
        <StyledInputLabel style={{ color: Colors.brand }}>
          Select receiving user
        </StyledInputLabel>
        <Dropdown
          selectedValue={selectedNextUser}
          handlePickerChange={(value, index) =>
            handleUserSelection(value, index)
          }
          itemList={filteredUsers}
          styles={styles.picker}
          itemStyles={styles.pickerItem}
          enabled={isWrite}
        />
      </View>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmission(values);
          setTimeout(() => {
            resetForm(initialValues);
          }, 500);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, resetForm, values }) => (
          <>
            <View>
              <View style={styles.labelContainer}>
                <StyledHeadingText>
                  Product details for this step.
                </StyledHeadingText>
              </View>
              <RequestFormWrapper>
                <Card>
                  {productFields?.map(({ value, label }, index) => {
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
                    );
                  })}

       {toWareHouse && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <StyledHeadingText>Raw Material Remianing</StyledHeadingText>
        <Switch
          trackColor={{ false: '#767577', true: Colors.red }}
          thumbColor={rawMaterialRemaining ? Colors.brand : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleRawToggle}
          value={rawMaterialRemaining}/>
        </View>}

                </Card>
              </RequestFormWrapper>

              {loading ? (
                <ActivityIndicator size={'large'} />
              ) : (
                <RoundButton
                  iconColor={Colors.primary}
                  styles={styles.submitButton}
                  buttonClickedHandler={handleSubmit}
                  iconSize={40}
                  onPress={handleSubmit}
                  disabled={!isWrite}
                  icon={
                    <Ionicons
                      name="arrow-forward"
                      size={24}
                      color={Colors.primary}
                    />
                  }
                />
              )}
              {!isWrite && (
                <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <TextLinkContent>
                    Dont have write access for this process.
                  </TextLinkContent>
                </View>
              )}
            </View>
          </>
        )}
      </Formik>
    </>
  );
};

export default NewRequestForm;

const styles = StyleSheet.create({
  dropdownLayout: {},
  submitButton: {
    backgroundColor: Colors.textBlue,
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 15,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
  },
  labelContainer: {
    padding: 5,
    alignItems: 'center',
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
    marginBottom: 20,
  },
});
