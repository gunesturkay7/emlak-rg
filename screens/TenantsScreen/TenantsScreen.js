import { View, Text, StyleSheet } from "react-native";
import useService from "../../hooks/useService";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, Button, Card, Paragraph, Searchbar, Title, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import TenantCard from "./TenantCard";
import ScreenHeader from "./ScreenHeader";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { showMessage } from "react-native-flash-message";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
export default function TenantsScreen({ navigation }) {
  const { serviceCall, isLoading, setIsLoading } = useService();
  const [data, setData] = React.useState(null); // [1
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const theme = useTheme();
  const route = useRoute();

  const renderShimmerPlaceholders = () => {
    // Adjust the number of placeholders as per your requirement
    return [...Array(3)].map((_, index) => (
      <ShimmerPlaceholder key={index} style={styles.shimmerPlaceholderStyle}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]} // Gradient colors
          style={styles.gradient}
          start={{ x: 0, y: 0 }} // You can adjust these values
          end={{ x: 1, y: 1 }} // You can adjust these values
        />
      </ShimmerPlaceholder>
    ));
  };
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
      height: "100%",
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
    shimmerPlaceholderStyle: {
      marginTop: 10,
      marginHorizontal: 16,
      height: 200, // Adjust the height as per your card size
      width: "90%",
      alignSelf: "center",
      borderRadius: 5, // Match your card's border radius,
    },
  });

  useEffect(() => {
    const message = route.params?.message;
    if (message) {
      showMessage({
        message: message,
        type: "success",
        icon: "success",
        duration: 1500,
        backgroundColor: theme.colors.success, // background color
      });
    }
    navigation.setParams({ message: null });
  }, [route.params?.message]);

  if (isLoading || data === null) {
    return <View style={styles.loadingContainer}>{renderShimmerPlaceholders()}</View>;
  }

  return (
    <ScrollView style={styles.container}>
      {data?.map((tenant) => (
        <TenantCard tenant={tenant} navigation={navigation} key={tenant._id} />
      ))}
    </ScrollView>
  );
}
