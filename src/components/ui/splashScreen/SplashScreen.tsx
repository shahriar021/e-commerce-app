import React, { useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require("../../../../assets/e-icon/Onboarding.png")}
        style={[styles.fullImage, { opacity: fadeAnim }]}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
});
