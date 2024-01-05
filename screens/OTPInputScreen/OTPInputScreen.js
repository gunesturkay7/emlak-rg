import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import { Button, Card, IconButton, Paragraph, useTheme } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import useService from "../../hooks/useService";
import { useAuth } from "../../context/AuthContext";
import { showMessage } from "react-native-flash-message";

export default function OTPScreen({ navigation, route }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30); // 30 saniyelik bir sayaç olarak başlat
  const { serviceCall, isLoading } = useService();
  const { user } = useAuth();
  const { colors } = useTheme();
  const [timerColor, setTimerColor] = useState(colors.secondary); // Başlangıç rengi
  const [timerEnded, setTimerEnded] = useState(false); // Sayacın bitip bitmediğini kontrol etmek için
  const [otpData, setOtpData] = useState(null); // OTP verilerini tutmak için

  const inputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
  useEffect(() => {
    if (timerEnded) return; // Do not start countdown if timer has already ended

    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown); // Stop the countdown
          setTimerEnded(true); // Indicate that the timer has ended
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(countdown); // Cleanup on unmount or dependency change
  }, [timerEnded, timer]); // Restart countdown when 'timer' or 'timerEnded' changes

  useEffect(() => {
    if (timer <= 20 && timer > 10) {
      setTimerColor(colors.warning); // Son 20 saniyede rengi sarı yap
    } else if (timer <= 10 && timer > 0) {
      setTimerColor(colors.error); // Son 10 saniyede rengi kırmızı yap
    }
  }, [timer]);

  const handleOTPChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent: { key: keyValue } }, index) => {
    if (keyValue === "Backspace" && index !== 0 && otp[index] === "") {
      setOtp([...otp.slice(0, index), "", ...otp.slice(index + 1)]);
      inputRefs.current[index - 1].focus();
    }
  };

  const sendOTP = async () => {
    try {
      await serviceCall(
        {
          url: "/send-otp",
          method: "POST",
          data: {
            email: user?.email,
          },
        },
        (err, res) => {
          if (err) {
            console.error("Hata:", err);
            return;
          }
          console.log(res);

          setOtpData(res);
          showMessage({
            message: res.message,
            type: "success",
            icon: "success",
            duration: 1500,
          });
        }
      );
    } catch (error) {
      console.error("OTP gönderilemedi: ", error);
    }
  };

  useEffect(() => {
    sendOTP();
  }, []);

  const retryOTP = async () => {
    sendOTP();
    resetOTP();
  };

  const handleOTPSumbit = async () => {
    const otpString = otp.join("");
    try {
      await serviceCall(
        {
          url: "/verify-otp",
          method: "POST",
          data: {
            code: otpString,
            email: user?.email,
          },
        },
        (err, res) => {
          console.log(otpString, "otpString");
          console.log("OTP verified successfully" == res);
          if (res === "OTP verified successfully") {
            console.log("hello");
            navigation.navigate("FindexResultScreen", { currentTenant: tenant });
            resetOTP();
          }
          console.log(res);
        }
      );
    } catch (error) {
      console.error("OTP doğrulama hatası: ", error);
    }
    console.log("Tamamlanan OTP: ", otpString);
  };

  const resetOTP = () => {
    setOtp(["", "", "", ""]); // Clear OTP input fields
    setTimer(30); // Reset timer to 30 seconds
    setTimerEnded(false); // Reset timer ended state
    setTimerColor(colors.secondary); // Reset timer color
    inputRefs.current[0].focus(); // Focus the first input field
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
      paddingTop: 50,
    },
    card: {
      width: "100%",
      padding: 20,
      marginVertical: 20,
      elevation: 4,
    },
    title: {
      fontSize: 22,
      textAlign: "center",
      marginVertical: 20,
    },
    description: {
      textAlign: "center",
      color: colors.secondary,
    },
    otpContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: 30,
    },
    otpInput: {
      fontSize: 18,
      width: 45,
      height: 50,
      borderBottomWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.grey,
      borderRadius: 5,
      textAlign: "center",
    },

    button: {
      marginTop: 15,
      width: "100%",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tek Seferlik Şifre</Text>
      <Text style={{ ...styles.description, color: timerColor }}>
        {timerEnded
          ? "Süre doldu. Lütfen yeni bir kod talep edin."
          : `Lütfen cep telefonunuza gelen 4 haneli şifreyi giriniz. Kalan süre: ${timer} saniye ${isLoading} `}
      </Text>

      <Card style={styles.card}>
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", gap: 10, alignItems: "center" }}>
          <MaterialIcons name="email" size={24} color={colors.primary} />
          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>{user?.email}</Text>
          </Paragraph>
        </View>
        <View style={styles.otpContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <TextInput
              selectionColor={colors.primary}
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={otp[index]}
              onChangeText={(text) => handleOTPChange(text, index)}
              maxLength={1}
              keyboardType="numeric"
              style={styles.otpInput}
              textAlign="center"
              autoFocus={index === 0}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>
        <Button mode="contained" onPress={handleOTPSumbit} style={styles.button} disabled={timerEnded}>
          Onayla
        </Button>
        {timerEnded && (
          <Button mode="outlined" onPress={retryOTP} style={styles.button}>
            Tekrar Dene
          </Button>
        )}
        <Paragraph>
          <Text> {JSON.stringify(otpData)}</Text>
        </Paragraph>
      </Card>
    </View>
  );
}
