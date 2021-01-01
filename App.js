import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from "react-navigation";
import Drawer from './src/navigation/DrawerNavigator'
import EStyleSheet from 'react-native-extended-stylesheet';
import store from './src/redux/store'
import { Provider } from 'react-redux'
import NavigationService from './src/navigation/NavigationService'
 EStyleSheet.build({
   $primaryColor: "#008577",
   $primaryColorDark: "#00574B"
 });

console.disableYellowBox = true
const Container = createAppContainer(Drawer)
 
export default function App() {
  return (
    <Provider store={store}>
      <Container
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd', 
  },
});
