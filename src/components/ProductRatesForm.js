import { StyleSheet, View, ActivityIndicator, Switch } from 'react-native';
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
  processDropdownList,
} from '../constants/ProcessList';
import Card from './atoms/Card';
import Dropdown from './atoms/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import {
  getNewRequestEntries,
  getSearchableDropdownItems,
  isEmpty,
} from '../utils';
import { updateProductRateCall } from '../actions/updateRateAction';
import { getProductRates } from '../actions/fetchProductRates';
import DropdownSearchable from './atoms/DropdownSearchable';
import ScreenLoader from './atoms/ScreenLoader';

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

const ProductRatesForm = () => {
  const { userData, userPermissions } = useSelector((state) => state.user);
  const { list: productRates, loading: loadRates , updateRate : updateRate } = useSelector(
    (state) => state.productRates,
  );
  const usersList = useSelector((state) => state.allUsers).list;
  const [selectedProcess, setselectedNextProcess] = useState(
    processDropdownList[0].value,
  );
  const [filteredUsers, setFilteredUser] = useState([]);
  const [selectedNextUser, setNextUser] = useState('');
  const [globalToggle, setGlobalToggle] = useState(false);
  const [formState, setFormState] = useState(initialValues);
  const dispatch = useDispatch();
  let fromUserId = userData.userId;

  const fetchProductRates = (global, user) => {
    dispatch(getProductRates(global, user));
  };
  const userWithProcessPermissions = (
    process = selectedProcess,
    global = globalToggle,
  ) => {
    let nextUsers = [];
    if (usersList.length > 0) {
      usersList.forEach((user) => {
        if (
          user &&
          user.permissions?.some((per) => per.processName === process) &&
          user.userId !== fromUserId
        ) {
          let idx = processFlow.indexOf(idx + 1);
          nextUsers.push(user);
        }
      });
      if (!isEmpty(nextUsers)) {
        let list = getSearchableDropdownItems(nextUsers, userData.userId);
        setFilteredUser(list);
      }
    }
  };

  const getFormStateFromData = (obj) => {
   let state = {} 
  !isEmpty(obj) && Object.keys(obj).forEach(key => state[key] = obj[key].toString())
    return state;
  };

  useEffect(() => {
    userWithProcessPermissions(selectedProcess, globalToggle);
  }, []);

  useEffect(() => {
    let formState={}
    if(!globalToggle && isEmpty(selectedNextUser)) 
       formState = initialValues
    else if (!isEmpty(productRates)) {
      formState = productRates[selectedProcess];  
    }

    setFormState(getFormStateFromData(formState));
  }, [productRates]);

  const handleProcessSelection = (sel) => {
    setselectedNextProcess(sel);
    if (!globalToggle) {
      userWithProcessPermissions(sel);
    } else {
      fetchProductRates(globalToggle);
    }
  };

  const handleUserSelection = (value) => {
    setNextUser(value);
    fetchProductRates(globalToggle, value);
  };

  const handleglobalToggle = (value) => {
    setGlobalToggle(value);
    setNextUser({})
    if (value) {
      fetchProductRates(value);
    }
    else {
      setFormState(initialValues)
    }
  };

  const handleFormSubmission = (values) => {
    let formData = getNewRequestEntries(
      values,
      selectedProcess === processList.WAREHOUSE
        ? selectedProcess
        : selectedProcess,
    );

    let payload = {
      selectedProcess: selectedProcess,
      userId: !globalToggle ? selectedNextUser.id : 'GLOBAL_RATES',
      formData: formData,
    };

    dispatch(updateProductRateCall(payload));
  };

  return (
    <>
      {loadRates && <ScreenLoader />}
      <View style={styles.pickerContainer}>
        <View style={styles.rateContainer}>
          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <StyledHeadingText style={styles.toggleLabel}>
              User Rates
            </StyledHeadingText>
          </View>

          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Switch
              trackColor={{ false: '#767577', true: Colors.red }}
              thumbColor={globalToggle ? Colors.brand : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleglobalToggle}
              value={globalToggle}
            />
          </View>

          <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <StyledHeadingText style={styles.toggleLabel}>
              Global Rates
            </StyledHeadingText>
          </View>
        </View>

        <StyledInputLabel style={{ color: Colors.brand, marginBottom: 5 }}>
          Select Process
        </StyledInputLabel>
        <Dropdown
          selectedValue={selectedProcess}
          handlePickerChange={handleProcessSelection}
          itemList={processDropdownList}
          styles={styles.picker}
          itemStyles={styles.pickerItem}
        />
      </View>
      {!globalToggle && (
        <View style={{ width: '80%', zIndex: 999, left: '10%' }}>
          <DropdownSearchable
            getItemSelection={(user) => handleUserSelection(user)}
            items={filteredUsers}
            selectedItem={selectedNextUser}
          />
        </View>
      )}

      <Formik
        enableReinitialize={true}
        initialValues={formState}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmission(values);
          setTimeout(() => {
            resetForm(initialValues);
            setNextUser({})
          }, 500);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, resetForm, values }) => (
          <>
            <View>
              <View style={styles.labelContainer}>
                <StyledHeadingText>Enter rates (in /kgs)</StyledHeadingText>
              </View>
              <RequestFormWrapper>
                <Card>
                  {processStepsMap[selectedProcess]?.map(({ value, label }, index) => {
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
                    );
                  })}
                </Card>
              </RequestFormWrapper>

              {updateRate ? (
                <ActivityIndicator size={'large'} />
              ) : (
                <RoundButton
                  iconColor={Colors.primary}
                  styles={styles.submitButton}
                  buttonClickedHandler={handleSubmit}
                  iconSize={40}
                  onPress={handleSubmit}
                  icon={
                    <Ionicons
                      name="arrow-forward"
                      size={24}
                      color={Colors.primary}
                    />
                  }
                />
              )}
            </View>
          </>
        )}
      </Formik>
    </>
  );
};

export default ProductRatesForm;

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
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 15,
    marginBottom: 25,
  },

  toggleLabel: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
