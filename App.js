import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigator from "./navigation/Navigator";

const theme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: "#6ba5ce",
    secondary: "#807da6",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </PaperProvider>
  );
}
