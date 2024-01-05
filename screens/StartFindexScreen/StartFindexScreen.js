import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

import { Easing } from "react-native";

import React, { useEffect, useRef } from "react";
import E from "../../assets/EanalizE.svg";

export default function StartFindexScreen({ navigation, route }) {
  const [currentTenant, setCurrentTenant] = React.useState({});

  useEffect(() => {
    setCurrentTenant(route.params);
  }, [currentTenant, navigation, route.params]);

  console.log();

  return (
    <View style={styles.container}>
      <Text>{currentTenant?.user?.name}</Text>
      <LoadingIcon />
    </View>
  );
}
const LoadingIcon = () => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const color = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 3000 }), -1, false);
    scale.value = withRepeat(
      withSequence(withTiming(1.5, { duration: 1000 }), withTiming(1, { duration: 1000 })),
      -1,
      true
    );
    color.value = withRepeat(withTiming(1, { duration: 5000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
      backgroundColor: interpolateColor(color.value, [0, 1], ["#eeeeee", "#dddddd"]), // Subtle color change
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animated, animatedStyle]}>
        <E width="120" height="120" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  animated: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});
