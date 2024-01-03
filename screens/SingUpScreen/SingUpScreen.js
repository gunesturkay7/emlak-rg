import React, { useEffect } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, Image } from "react-native";
import { TextInput, Button, Title, Paragraph, Card, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { StatusBar } from "expo-status-bar";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("recepgunes@gmail.com");
  const [username, setUsername] = React.useState("recepgunes");
  const [password, setPassword] = React.useState("test");
  const { user, signIn, singUp, error, loading } = useAuth(); // AuthContext kullan
  const theme = useTheme();

  const loginServer = () => {
    singUp({ email, username, password });
  };
  useEffect(() => {
    if (user) {
      navigation.navigate("Drawer");
    }
  }, [user]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
    },

    card: {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      borderRadius: 8,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // Android için gölge efekti
    },
    input: {
      marginBottom: 12,
    },
    button: {
      marginTop: 12,
      paddingVertical: 8,
      color: theme.colors.secondary,
    },
    textButton: {
      marginTop: 10,
      color: theme.colors.secondary,
      textAlign: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    paragraph: {
      textAlign: "center",
      marginBottom: 20,
    },
    brandLogo: {
      height: 50,
      resizeMode: "contain",
      alignSelf: "center",
      marginTop: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../../assets/login.jpg")} style={styles.background}>
        <View style={styles.overlay}>
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>Hoşgeldiniz</Title>
              <Paragraph style={styles.paragraph}>Lütfen sisteme kayıt için bilgilerinizi giriniz</Paragraph>
              <TextInput
                label="E-posta"
                value={email} // Yeni state'i tanımlamayı unutmayın
                onChangeText={(text) => setEmail(text)} // Yeni state güncelleme fonksiyonu
                mode="outlined"
                style={styles.input}
              />
              <TextInput
                label="Kullanıcı Adı"
                value={username}
                onChangeText={(text) => setUsername(text)}
                mode="outlined"
                style={styles.input}
              />

              <TextInput
                label="Şifre"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                mode="outlined"
                style={styles.input}
              />
              <Button
                mode="contained"
                onPress={loginServer}
                loading={loading}
                disabled={loading}
                color={theme.colors.primary}
                textColor={theme.colors.secondary}
              >
                Kayıt Ol
              </Button>
              <TouchableOpacity onPress={() => console.log("Şifremi Unuttum")}>
                <Text style={styles.textButton}>Şifremi Unuttum</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("Üye Ol")}>
                <Text style={styles.textButton}>Üye Ol</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
          <Image source={require("../../assets/logo-eanaliz.png")} style={styles.brandLogo} />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default SignUpScreen;
