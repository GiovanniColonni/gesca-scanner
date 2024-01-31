import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AntDesign from "react-native-vector-icons/AntDesign";
import GescaLogo from "./assets/icons/logo3.png"
import HomeComponent from './components/Home/Home';
import SettingComponent from './components/Settings/Settings';
import InfoPage from './components/Info/InfoPage';
import { Icon, Image, TouchableOpacity } from "react-native"
import ScannerCode from './components/Scanner/Scanner';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Scanner"
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: 'grey',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                style={{ width: 45, height: 45, marginLeft: 8 }}
                source={GescaLogo}
              />
            </TouchableOpacity>
          )
        })}>
        <Drawer.Screen name="Scanner" component={ScannerCode} options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="home"
              size={size}
              color={"#246ded"}
            />
          )
        }} />
        <Drawer.Screen name="Articolo" component={HomeComponent} options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="search1"
              color="#246ded"
              size={size}
            />
          )
        }} />
        <Drawer.Screen name="Impostazioni" component={SettingComponent} options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="setting"
              size={size}
              color={"#246ded"}
            />
          )
        }} />
        <Drawer.Screen name="Info Applicazione" component={InfoPage} options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="info"
              color="#246ded"
              size={size}
            />
          )
        }} />
        
        {/* Add other screens here */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
