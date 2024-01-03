import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Card, Paragraph, Button, IconButton, useTheme } from "react-native-paper";
import moment from "moment";

const TenantCard = ({ tenant, onDetailsPress }) => {
  const formattedStartDate = moment(tenant.leaseStartDate).format("DD/MM/YYYY");
  const formattedEndDate = moment(tenant.leaseEndDate).format("DD/MM/YYYY");
  const [menuVisible, setMenuVisible] = React.useState(false);
  const theme = useTheme();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const renderContextMenu = () => {
    if (menuVisible) {
      return (
        <View style={styles.contextMenu}>
          <Text style={styles.menuItem} onPress={closeMenu}>
            Menü Öğesi 1
          </Text>
          <Text style={styles.menuItem} onPress={closeMenu}>
            Menü Öğesi 2
          </Text>
          {/* Diğer menü öğeleri */}
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <Text style={styles.name}>{tenant.name}</Text>
            <IconButton icon="dots-vertical" onPress={openMenu} size={20} />
          </View>
          <Text style={styles.address}>{tenant.address}</Text>
          <Text style={styles.email}>{tenant.email}</Text>
          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>Adres: </Text>
            {tenant.address}
          </Paragraph>
          <View style={styles.row}>
            <Paragraph style={[styles.paragraph, styles.flexHalf]}>
              <Text style={styles.bold}>Kira Başlangıç Tarihi: </Text>
              {formattedStartDate}
            </Paragraph>
            <Paragraph style={[styles.paragraph, styles.flexHalf]}>
              <Text style={styles.bold}>Kira Bitiş Tarihi: </Text>
              {formattedEndDate}
            </Paragraph>
          </View>
          <View style={styles.row}>
            <Paragraph style={[styles.paragraph, styles.flexHalf]}>
              <Text style={styles.bold}>Aylık Kira: aaaaaaaaaaaaaaaaaaaaaa</Text>
              {tenant.rentAmount}
            </Paragraph>
            <Paragraph style={[styles.paragraph, styles.flexHalf]}>
              <Text style={styles.bold}>Depozito: </Text>
              {tenant.securityDeposit}
            </Paragraph>
          </View>
          <Paragraph style={styles.paragraph}>
            <Text style={styles.bold}>İletişimc: </Text>
            {tenant.contactNumber}
          </Paragraph>
          {/* Diğer bilgiler burada gösterilebilir */}
        </Card.Content>
        {renderContextMenu()}
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,

    borderWidth: 1,
    borderColor: "#6ba5ce",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paragraph: {
    fontSize: 14, // Mobil uyumlu font boyutu
    color: "#555555", // Daha yumuşak renk
    paddingVertical: 4,
  },
  flexHalf: {
    flex: 0.5,
    marginRight: 5,
  },
  bold: {
    fontWeight: "500", // Daha ince font kalınlığı
    color: "#6ba5ce",
  },
  contextMenu: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    padding: 5,
  },
  menuItem: {
    padding: 10,
    fontSize: 14, // Mobil uyumlu font boyutu
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  address: {
    color: "grey",
  },
  email: {
    color: "grey",
  },
});

export default TenantCard;
