import { View, Text } from "react-native";
import React, { useEffect } from "react";

export default function FindexResultScreen({ route }) {
  const [currentTenant, setCurrentTenant] = React.useState(route.params.currentTenant);
  const [data, setData] = React.useState(null); // [1
  const startFindexResult = async () => {
    serviceCall(
      {
        url: "/tenants/result",
        method: "POST",
        data: {
          phoneNumber: currentTenant.phoneNumber,
        },
      },
      (err, res) => {
        if (err) {
          console.error("Hata:", err);
          return;
        }
        setData(res);
      }
    );
  };

  useEffect(() => {
    startFindexResult();
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}
