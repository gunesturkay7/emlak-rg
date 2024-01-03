import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Card, Title, ActivityIndicator, useTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { DatePickerInputProps } from "react-native-paper-dates";

import useService from "../../../hooks/useService";
import DatePicker from "../../../components/DatePicker/DatePicker";

// Registering the translation

export default function AddTenantScreen({ navigation }) {
  const { serviceCall, data, isLoading } = useService();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [leaseStartDate, setLeaseStartDate] = useState(new Date());
  const [leaseEndDate, setLeaseEndDate] = useState(new Date());
  const [rentAmount, setRentAmount] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [rentDueDate, setRentDueDate] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [rentalHistory, setRentalHistory] = useState("");
  const [notes, setNotes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [inputDate, setInputDate] = React.useState(new Date());

  const theme = useTheme();

  const handleAddTenant = () => {
    try {
      serviceCall(
        {
          url: "/tenants",
          method: "POST",
          data: {
            name,
            address,
            contactNumber,
            email,
            leaseStartDate,
            leaseEndDate,
            rentAmount,
            securityDeposit,
            rentDueDate,
            emergencyContact,
            rentalHistory,
            notes,
          },
        },
        (err, res) => {
          if (err) {
            console.error("Hata:", err);
            return;
          }
          setSuccessMessage("Kiracı başarıyla eklendi.");
          setName("");
          setAddress("");
          navigation.navigate("TenantsScreen", { dataAdded: true, isLoading: true });
        }
      );
      /*   setSuccessMessage("Kiracı başarıyla eklendi.");
      setName("");
      setAddress(""); */
    } catch (err) {
      setErrorMessage("Kiracı eklenirken bir hata oluştu.");
    } finally {
    }
  };

  const handleDateChange = (date) => {
    console.log("New Date Selected:", date);
    setLeaseStartDate(date);
  };
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
    },
    scrollView: {
      flex: 1,
      backgroundColor: "#f7f7f7",
      // Diğer stil özellikleri...
    },
    card: {
      margin: 10,
      elevation: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      marginBottom: 15,
    },
    button: {
      marginTop: 10,
    },
    success: {
      color: "green",
      marginTop: 10,
    },
    error: {
      color: theme.colors.error,
      marginTop: 10,
    },
    fixedButtonContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: 10, // Kenarlardan biraz boşluk için
      paddingBottom: 10, // Alt kısımdan biraz boşluk için
      backgroundColor: "#f5f5f5",
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
      >
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Yeni Kiracı Ekle</Title>

            <DatePickerInput
              locale="tr"
              label="Lease Start Date"
              value={leaseStartDate}
              onChange={(selectedDate) => {
                console.log(selectedDate); // Test amaçlı log
                setLeaseStartDate(selectedDate);
              }}
              inputMode="start"
              mode="outlined"
              icon={false}
              iconColor="red"
              style={styles.input}
              saveLabel="Seç"
              saveLabelDisabled={false}
              left={<TextInput.Icon name="calendar" color={theme.colors.primary} />}

              // ...DatePickerInputProps
            />
            <DatePickerInput
              locale="tr"
              label="Lease End Date"
              value={leaseEndDate}
              onChange={(selectedDate) => {
                console.log(selectedDate); // Test amaçlı log
                setLeaseEndDate(selectedDate);
              }}
              inputMode="start"
              mode="outlined"
              icon={false}
              style={styles.input}
              saveLabel="Seç"
              saveLabelDisabled={false}

              // ...DatePickerInputProps
            />

            {/* You can add more content here */}

            {/* Mevcut TextInput'lar... */}
            <TextInput
              label="Ad Soyad"
              value={name}
              onChangeText={(text) => setName(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="account" color={theme.colors.primary} />}
            />
            <TextInput
              label="Adres"
              value={address}
              onChangeText={(text) => setAddress(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="map-marker" color={theme.colors.primary} />}
            />
            <TextInput
              label="İletişim Numarası"
              value={contactNumber}
              onChangeText={(text) => setContactNumber(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="phone" color={theme.colors.primary} />}
            />
            <TextInput
              label="E-posta"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="email" color={theme.colors.primary} />}
            />

            <TextInput
              label="Kira Bedeli"
              value={rentAmount}
              onChangeText={(text) => setRentAmount(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="currency-usd" color={theme.colors.primary} />}
            />
            <TextInput
              label="Depozito"
              value={securityDeposit}
              onChangeText={(text) => setSecurityDeposit(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="currency-usd" color={theme.colors.primary} />}
            />
            <TextInput
              label="Kira Vadesi"
              value={rentDueDate}
              onChangeText={(text) => setRentDueDate(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="calendar" color={theme.colors.primary} />}
            />
            <TextInput
              label="Acil Durum İletişim Numarası"
              value={emergencyContact}
              onChangeText={(text) => setEmergencyContact(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="phone" color={theme.colors.primary} />}
            />
            <TextInput
              label="Kiralama Geçmişi"
              value={rentalHistory}
              onChangeText={(text) => setRentalHistory(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="history" color={theme.colors.primary} />}
              size={12}
            />
            <TextInput
              label="Notlar"
              value={notes}
              onChangeText={(text) => setNotes(text)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon name="note" color={theme.colors.primary} />}
            />
          </Card.Content>
        </Card>
      </ScrollView>
      <View style={styles.fixedButtonContainer}>
        <Button mode="contained" onPress={handleAddTenant} style={styles.button} icon="plus">
          Ekle
        </Button>
      </View>
    </View>
  );
}
