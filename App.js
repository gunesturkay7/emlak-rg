import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export function PortfolioTrackingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Portfolio Tracking Screen</Text>
        <Button icon="camera" mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
          Press me
        </Button>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

export function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="PortfolioTrackingScreen">
      <Drawer.Screen
        name="PortfolioTrackingScreen"
        component={PortfolioTrackingScreen}
        options={{ drawerLabel: "Portfolio Tracking" }}
      />
      {/* Buraya diğer ekranlarınızı ekleyebilirsiniz. */}
    </Drawer.Navigator>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Details Screenasdasdasdasdasdasdasdasdsadasdasd</Text>
        <Button icon="camera" mode="contained" onPress={() => navigation.navigate("Drawer")}>
          Press measdsaasdasd
        </Button>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
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
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // Animasyon ayarları buraya eklenebilir
            transitionSpec: {
              open: { animation: "timing", config: { duration: 500 } },
              close: { animation: "timing", config: { duration: 500 } },
            },
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
