import { StatusBar } from "expo-status-bar";
import React, { Reducer } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { DashboardScreen, LoadingScreen, LoginScreen } from "./src/screens";
import { Provider } from "react-redux";
import { store } from "./src/store/index";

import firebase from "firebase";
import { firebaseConfig } from "./src/config/firebase";

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const app = function App() {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
};

export default app;

const AppSwitchNav = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
});

const AppNav = createAppContainer(AppSwitchNav);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
