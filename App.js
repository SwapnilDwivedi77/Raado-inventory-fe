
import React from 'react'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import { store, persistor } from './src/state/store';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
       <AppNavigator/>
      </PersistGate>
    </Provider>
    </GestureHandlerRootView>
  );
}