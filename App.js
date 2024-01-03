import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider, DefaultTheme, configureFonts } from "react-native-paper";
import { tr, registerTranslation } from "react-native-paper-dates";
registerTranslation("tr", tr);

import "react-native-gesture-handler";
import { AuthProvider } from "./context/AuthContext";
import Navigator from "./navigation/Navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

const theme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: "#6ba5ce",
    secondary: "#807da6",
    error: "#cd1819",
    success: "#07911c",
    warning: "#f5a623",
    inputIconColor: "#b7f1ff",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
