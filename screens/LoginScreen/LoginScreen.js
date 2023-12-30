import React, { useEffect } from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, Image } from "react-native";
import { TextInput, Button, Title, Paragraph, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { StatusBar } from "expo-status-bar";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("recepgunes");
  const [password, setPassword] = React.useState("test");
  const { user, signIn, error, loading } = useAuth(); // AuthContext kullan

  const loginServer = () => {
    signIn({ username, password });
  };
  useEffect(() => {
    if (user) {
      navigation.navigate("Drawer");
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/login.jpg")} // Arka plan resmi URL'si
        style={styles.background}
      >
        <Title style={styles.title}>EmlakPlus +</Title>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Hoşgeldiniz</Title>
            <Paragraph style={styles.paragraph}>Lütfen giriş bilgilerinizi giriniz</Paragraph>
            <TextInput
              label="Kullanıcı Adı"
              value={username}
              onChangeText={(text) => setUsername(text)}
              mode="flat"
              style={styles.input}
            />
            <TextInput
              label="Şifre"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              mode="flat"
              style={styles.input}
            />
            <Button mode="contained" onPress={loginServer} loading={loading} disabled={loading} style={styles.button}>
              Giriş Yap
            </Button>
            <TouchableOpacity onPress={() => console.log("Şifremi Unuttum")}>
              <Text style={styles.textButton}>Şifremi Unuttum</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Üye Ol")}>
              <Text style={styles.textButton}>Üye Ol</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
        <View style={{ display: "flex" }}>
          <Image source={require("../../assets/logo-eanaliz.png")} style={styles.brandLogo} />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },

  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  brandLogo: {
    height: 25,
    marginTop: 20,
    resizeMode: "contain",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    textAlign: "center",
    marginBottom: 20,
  },
  textButton: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
});

export default LoginScreen;
