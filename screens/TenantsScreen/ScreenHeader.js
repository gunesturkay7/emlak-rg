import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, IconButton, Searchbar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // İkonlar için

function ScreenHeader({ searchQuery, setSearchQuery, dataLength, navigation, isLoading }) {
  const theme = useTheme();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={navigation.openDrawer} style={styles.menuButton}>
          <Icon name="menu" size={28} color={theme.colors.primary} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Kiracılar</Text>
          <Text style={[styles.title, { color: "gray", fontSize: 14, fontWeight: 400 }]}>{`${dataLength} Kiracı`}</Text>
        </View>

        <IconButton
          icon="plus"
          onPress={() => navigation.navigate("AddTenantScreen")}
          color={theme.colors.success}
          size={28}
        />
      </View>

      <Searchbar
        placeholder="Kiracı Ara"
        onChangeText={setSearchQuery}
        value={searchQuery}
        disabled={isLoading}
        style={styles.searchBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff", // Temaya uygun bir arka plan rengi
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    elevation: 2, // Android için gölge efekti
    shadowOpacity: 0.2, // iOS için gölge efekti
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  menuButton: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  searchBar: {
    elevation: 5, // Gölgeyi kaldır
    shadowOpacity: 0, // Gölgeyi kaldır
    borderRadius: 20, // Kenarları yuvarlak yap
    backgroundColor: "#f7f7f7",
    marginBottom: 10,
    height: 40,
  },
});

export default ScreenHeader;
