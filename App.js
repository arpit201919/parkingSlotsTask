import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './src/mainScreen';
import { NavigationContainer } from '@react-navigation/native';
import PaskingStack from "./navigation/paskingStack"
import {Provider} from "react-redux";
import {store,persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

export default function App() { 
  return (     
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaskingStack/>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
