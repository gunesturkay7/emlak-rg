import { DrawerContentScrollView } from "@react-navigation/drawer";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Drawer, Text, Avatar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/AuthContext";
import TenantsScreen from "../screens/TenantsScreen/TenantsScreen";

const DrawerContent = (props) => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const { state } = props;
  const activeRoute = state.routeNames[state.index];

  const handleLogout = () => {
    logout();
  };

  const styles = StyleSheet.create({
    drawerSection: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      flexDirection: "row",
      marginTop: 15,
      alignItems: "center",
      marginBottom: 15,
    },
    userName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    email: {
      fontSize: 14,
    },
    bottomDrawerSection: {
      marginBottom: 0,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    logoutText: {
      fontSize: 16,
      color: theme.colors.error,
    },
    // ... Diğer stiller
  });

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          <View style={styles.userInfoSection}>
            <Avatar.Image size={50} source={{ uri: user?.userAvatar }} />
            <View style={{ marginLeft: 15, flexDirection: "column" }}>
              <Text style={styles.userName}>{user?.username}</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>

          <Drawer.Item
            label="Kiracılar"
            icon="key-variant"
            active={activeRoute === "TenantsScreen"}
            onPress={() => props.navigation.navigate("TenantsScreen")}
          />
        </Drawer.Section>
        <View style={styles.bottomDrawerSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText} color={theme.colors.error}>
              Logout
            </Text>
            <Icon name="logout" size={20} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;
