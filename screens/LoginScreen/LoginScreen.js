import React from "react";
import { SafeAreaView, StyleSheet, View, ImageBackground, TouchableOpacity, Text, Image } from "react-native";
import { TextInput, Button, Title, Paragraph, Card } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // Giriş işlemleri
    console.log("Username:", username, "Password:", password);
    navigation.navigate("DetailsScreen");
  };

  return (
    <ImageBackground
      source={require("../../assets/login.jpg")} // Arka plan resmi URL'si
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.logoContainer}></View>
            <Title style={styles.title}>Hoşgeldiniz</Title>
            <Paragraph style={styles.paragraph}>Lütfen giriş bilgilerinizi giriniz</Paragraph>
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
              size={10}
            />
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
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
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // veya 'contain' arka planı uygun şekilde ayarlar
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  textButton: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  brandLogo: {
    height: 100,
    resizeMode: "contain",
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
});

export default LoginScreen;
