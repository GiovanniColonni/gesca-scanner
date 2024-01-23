import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AntDesign from "react-native-vector-icons/AntDesign";
import GescaLogo from "./assets/icons/logo-small.png"
import HomeComponent from './components/Home/Home';
import SettingComponent from './components/Settings/Settings';
import CronologiaComponent from './components/CronologiaScanners/Cronologia';
import { Icon, Image, TouchableOpacity } from "react-native"

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
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
                style={{ width: 40, height: 40, marginLeft: 8 }}
                source={GescaLogo}
              />
            </TouchableOpacity>
          )
        })}>
        <Drawer.Screen name="Home" component={HomeComponent} options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="home"
              size={size}
              color={"red"}
            />
          )
        }} />
        <Drawer.Screen name="Impostazioni" component={SettingComponent} options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="setting"
              size={size}
              color={"red"}
            />
          )
        }} />
        <Drawer.Screen name="Cronologia" component={CronologiaComponent} options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="search1"
              color="red"
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
