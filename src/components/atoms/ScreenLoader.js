import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import React from 'react';
import { Colors } from '../../Config/Colors';

const ScreenLoader = ({message}) => {
  return (
    <View style={styles.overlaycontainer}>
        <ActivityIndicator color={Colors.brand} style={styles.activityIndicator} size={'large'}/>
      <Text style={{ color: '#fff' }}>{message}</Text>
    </View>
  );
};

export default ScreenLoader;

const styles = StyleSheet.create({
  overlaycontainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  activityIndicator: {
      color: Colors.brand
  }
});
