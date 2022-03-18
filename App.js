import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { Router } from './Router'
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
import { StyleSheet } from 'react-native';
export default function App() {
  return (
    <Provider store={store}>
      <Router/>
      <StatusBar style="auto" />
    </Provider>
  );
}
