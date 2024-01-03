import { View, Text, StyleSheet } from "react-native";
import useService from "../../hooks/useService";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, Button, Card, Paragraph, Searchbar, Title, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import TenantCard from "./TenantCard";
import ScreenHeader from "./AddTenantScreen/ScreenHeader";

export default function TenantsScreen({ navigation }) {
  const { serviceCall, isLoading, setIsLoading } = useService();
  const [data, setData] = React.useState(null); // [1
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const theme = useTheme();
  const route = useRoute();

  /*   React.useEffect(() => {
    serviceCall({ url: "/tenants", method: "GET" }, (err, res) => {
      if (err) {
        // Hata işleme
      }
      // Başarılı işleme
    });
  }, [serviceCall]); */
  const loadTenants = async () => {
    serviceCall({ url: "/tenants", method: "GET" }, (err, res) => {
      if (err) {
        console.error("Hata:", err);
        return;
      }
      setData(res);
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadTenants();
    }, [route.params?.itemAdded])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <ScreenHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          dataLength={data?.length || 0}
          navigation={navigation}
        />
      ),
    });
  }, [navigation, searchQuery, setSearchQuery, data]);

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
    },
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    card: {
      margin: 10,
      elevation: 4,
    },
    cardTitle: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    cardContent: {
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
      paddingBottom: 10,
      marginBottom: 10,
    },
    nameText: {
      fontWeight: "bold",
      fontSize: 16,
    },
    addressText: {
      color: "grey",
    },
    addButton: {
      margin: 5,
    },
    cardActions: {
      justifyContent: "flex-end",
    },
  });

  if (isLoading || data === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {data?.map((tenant) => (
        <TenantCard tenant={tenant} navigation={navigation} key={tenant._id} />
      ))}
    </ScrollView>
  );
}
