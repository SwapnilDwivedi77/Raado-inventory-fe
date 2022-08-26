import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import { ButtonText, Colors, StyledButton, StyledInputLabel } from './style';

import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import routes from '../navigation/routes'
import { FontAwesome } from '@expo/vector-icons';
import {
  processDropdownList,
  processLabels,
  processStepsMap,
} from '../constants/ProcessList';
import { useSelector } from 'react-redux';
import Dropdown from './atoms/Dropdown';
import { getSearchableDropdownItems, isEmpty } from '../utils';
import DropdownSearchable from './atoms/DropdownSearchable';
import { notifyMessage } from '../utils/showToast';
import moment from 'moment';
import ScreenLoader from './atoms/ScreenLoader';
import { BASE_URL_ANALYTICS, GET_PROCESS_ACCOUNTING, GET_USER_ACCOUNTING } from '../constants/urls';

const { StorageAccessFramework } = FileSystem;
const AnalyticsForm = (props) => {
  const [selectedProcess, setSelectedProcess] = useState(
    processDropdownList[0].value,
  );
  const [processList, setProcessList] = useState(processDropdownList);
  const { userData, userPermissions } = useSelector((state) => state.user);
  const usersList = useSelector((state) => state.allUsers);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [userDropdownList, setUserDropdownList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [downloadProgress, setDownloadProgress] = useState(false);

  const currentTab = props?.route?.name

  useEffect(() => {
    let temp = [];

    if (!userData.admin) {
      userPermissions.forEach(({ processName }) => {
        if (processStepsMap.hasOwnProperty(processName))
          temp.push({ label: processLabels[processName], value: processName });
      });
      setProcessList(temp);
      setSelectedProcess(temp[0].value);

      setSelectedUser({id:userData.userId, name : userData.name + ',' + userData.phoneNo})
    }

    // set user dropdown

    if (!isEmpty(usersList.list)) {
      let list = getSearchableDropdownItems(usersList.list, userData.userId);
      setUserDropdownList(list);
    }
  }, []);

  const onEndChange = (event, selectedDate) => {
    setEndDate(selectedDate);
  };
  const onStartChange = (event, selectedDate) => {
    setStartDate(selectedDate);
  };

  const showStartDatepicker = () => {
    var currentdate = new Date();
    let onChange = onStartChange;
    DateTimePickerAndroid.open({
      onChange,
      mode: 'date',
      is24Hour: true,
      value: currentdate,
    });
  };

  const showEndDatepicker = () => {
    var currentdate = new Date();
    let onChange = onEndChange;
    DateTimePickerAndroid.open({
      onChange,
      mode: 'date',
      is24Hour: true,
      value: currentdate,
      minimumDate: startDate,
    });
  };

  const handleItemSelection = (user) => {
    setSelectedUser(user);
    let userPermissions = usersList.list.filter(
      (obj) => obj.userId === user.id,
    )[0].permissions;
    let temp = [];
    userPermissions.forEach(({ processName, write }) => {
      if (processStepsMap.hasOwnProperty(processName) && write)
        temp.push({ label: processLabels[processName], value: processName });
    });
    if (!isEmpty(temp)) {
      setProcessList(temp);
      setSelectedProcess(temp[0].value);
    }
  };

  
  const csv_to_array = (data, delimiter = ',', omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(delimiter));

  const saveAndroidFile = async (fileUri, fileName = 'Report') => {

    if(!userData.admin || currentTab === routes.USER_REPORT)
    fileName = selectedUser.name.split(',')[0] + '_' + selectedProcess + "_Report"
    else
    fileName = selectedProcess + "_Report"
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, { encoding:FileSystem.EncodingType.Base64 });
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        return;
      }

      try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, { encoding: FileSystem.EncodingType.Base64 });
            alert('Report Downloaded Successfully')
          })
          .catch((e) => {
          });
      } catch (e) {
        throw new Error(e);
      }

    } catch (err) {
    }
  }

  const generateExcel = async (data) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1", true);
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "RaadoExcel.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64
    }).then((resp) => {
      saveAndroidFile(filename)
    });
};

  const downloadReport = () => {
    setDownloadProgress(true)
    let url = BASE_URL_ANALYTICS

   
    const headers = {
      'Content-Type': 'application/json'
    }

    let data = {
      // endDate: moment(endDate).unix(),
      // startDate: moment(startDate).unix() ,
      endDate: 16588128219641,
      startDate:1657352544223,
    };

    if(userData.admin)
    {
      url+= currentTab === routes.USER_REPORT ? GET_USER_ACCOUNTING : GET_PROCESS_ACCOUNTING
      
      if(currentTab === routes.USER_REPORT)
        data.userId = selectedUser.id
        if(currentTab === routes.PROCESS_REPORT)
        data.processId = selectedProcess
    }else
     { 
       url += GET_USER_ACCOUNTING
       data.userId = selectedUser.id
}

    axios
      .post(
        url,data,{'headers' : headers}
      )
      .then((resp) => {
        let csvObj = csv_to_array(resp.data)
        setDownloadProgress(false)
        generateExcel(csvObj)
        
       
      })
      .catch((err) => {
        setDownloadProgress(false)
        console.log(err);
        notifyMessage('Something went wrong')
      });
  };

  return (
    <>
    {downloadProgress && <ScreenLoader />}
    <View style={styles.container}>
      {userData.admin && currentTab === routes.USER_REPORT &&  (
        <View
          style={{marginBottom : 20,marginTop:30}}
        >
          <StyledInputLabel style={{ color: Colors.brand }}>
            Select User
          </StyledInputLabel>
          <DropdownSearchable
            getItemSelection={(user) => handleItemSelection(user)}
            items={userDropdownList}
            selectedItem={selectedUser}
          />
        </View>
      )}

      <View
        style={{marginBottom:40}}
      >
        <StyledInputLabel style={{ color: Colors.brand }}>
          Select Process
        </StyledInputLabel>
        <View
        style={{borderWidth:1,borderColor:'red',borderStyle:'solid',width:280,borderRadius:15}}
      >
        <Dropdown
          selectedValue={selectedProcess}
          handlePickerChange={setSelectedProcess}
          itemList={processList}
          styles={styles.picker}
          itemStyles={styles.pickerItem}
        />
        </View>
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.button}>
        <Button
          onPress={showStartDatepicker}
          
          title={
            isEmpty(startDate)
              ? 'Start Date'
              : new Date(startDate).toDateString()
          }
          
        />
        </TouchableOpacity>
        
        <View style={styles.calender}>
          <FontAwesome name="calendar" size={24} color="white" />
        </View>
        <TouchableOpacity style={styles.button}>
        <Button
          onPress={showEndDatepicker}
          title={
            isEmpty(endDate) ? 'End Date' : new Date(endDate).toDateString()
          }
        />
        </TouchableOpacity>
      </View>
      <StyledButton onPress={downloadReport}>
        <ButtonText>
          <FontAwesome name="cloud-download" size={24} color="white" />
          Download Report
        </ButtonText>
      </StyledButton>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
  },
  button: {
    height: 70,
    width : 160
  },
  dateContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom : 30
  },
  calender: {
    width: 60,
    height: 37,
    backgroundColor: '#24a0ed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    padding: 0,
    color: Colors.dark,
    width: 280,
  },
  pickerItem: {
    // backgroundColor: Colors.brand,
    color: Colors.primary,
  },
});

export default AnalyticsForm;
