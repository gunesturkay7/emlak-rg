import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

const SplashScreen = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondary, // Mavi arkaplan rengi
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      width: "50%",
      height: 50,
    },
    text: {
      marginTop: 20,
      fontSize: 16,
      color: "#fff", // Metin rengi
    },
    activityIndicator: {
      marginTop: 20,
      color: theme.colors.secondary,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-eanaliz.png")} // Logo dosyanızın yolu
        style={styles.logo}
      />
      <Text style={styles.text}>Portöf Takibi, Analiz, Skorlama</Text>
      <ActivityIndicator color={theme.colors.primary} size="large" animating={true} style={styles.activityIndicator} />
    </View>
  );
};

export default SplashScreen;
