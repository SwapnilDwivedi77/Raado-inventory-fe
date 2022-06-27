import {
    ToastAndroid,
  } from 'react-native';

export const  notifyMessage=(msg) => { 
    ToastAndroid.show(msg, ToastAndroid.SHORT)
}