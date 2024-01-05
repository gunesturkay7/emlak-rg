import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import { Button } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../context/AuthContext";
import TenantsScreen from "../screens/TenantsScreen/TenantsScreen";
import AddTenantScreen from "../screens/TenantsScreen/AddTenantScreen/AddTenantScreen";
import { Easing } from "react-native";
import SignUpScreen from "../screens/SingUpScreen/SingUpScreen";
import FlashMessage from "react-native-flash-message";
import StartFindexScreen from "../screens/StartFindexScreen/StartFindexScreen";
import OTPInputScreen from "../screens/OTPInputScreen/OTPInputScreen";
import FindexResultScreen from "../screens/FindexResultScreen/FindexResultScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="TenantsScreen" drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="TenantsScreen"
        component={TenantsScreen}
        options={{ drawerLabel: "Kiracılar", title: "Kiracılar" }}
      />
      <Drawer.Screen
        name="AddTenantScreen"
        component={AddTenantScreen}
        options={{ drawerLabel: "Kiracı Ekle", title: "Kiracı Ekle" }}
      />
      <Drawer.Screen name="DetailsScreen" component={DetailsScreen} options={{ drawerLabel: "Details" }} />
      <Drawer.Screen
        name="StartFindexScreen"
        component={StartFindexScreen}
        options={{ drawerLabel: "StartFindexScreen" }}
      />
      <Drawer.Screen
        name="OTPInputScreen"
        component={OTPInputScreen}
        options={{ drawerLabel: "OTPInputScreen", headerShown: false }}
      />
      <Drawer.Screen
        name="FindexResultScreen"
        component={FindexResultScreen}
        options={{ drawerLabel: "FindexResultScreen", headerShown: false }}
      />
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

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        ) : (
          <Stack.Group>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          </Stack.Group>
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
