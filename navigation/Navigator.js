import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import { Button } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/AuthContext";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export function DrawerNavigator({ navigation }) {
  const { user } = useAuth();

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

export function PortfolioTrackingScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Portfolio Tracking Screen</Text>
        <Button icon="camera" mode="contained" onPress={logout}>
          Press me
        </Button>
        <Text> {user && user?.username}</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
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

export default function Navigator() {
  const { token, loading } = useAuth();

  console.log(loading);

  if (loading) return <SplashScreen />;

  return (
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
        {token ? (
          <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
/* <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} /> */
