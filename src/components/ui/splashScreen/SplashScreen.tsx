import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  Text,
  ImageBackground,
  Image,
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
      <ImageBackground
        source={require("../../../../assets/e-icon/ON.png")}
        style={styles.fullImage}
        resizeMode="cover"
      >
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Image source={require("../../../../assets/e-icon/ark.png")}/>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    alignItems: "center",
    justifyContent: "center",
  },
});
