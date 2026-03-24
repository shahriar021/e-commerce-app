 import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
 import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
 import { Camera, useCameraDevice } from "react-native-vision-camera";
 import { useNavigation, useIsFocused } from "@react-navigation/native";
 
 const CameraScreenFeed = ({ route, navigation }: any) => {
  const { onCapture } = route.params;
  const isFocused = useIsFocused();
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status !== "granted") Alert.alert("Error", "Camera permission is required");
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (!camera.current) return;
    try {
      const photo = await camera.current.takeSnapshot({ quality: 80 });
      const path = Platform.OS === "android" ? `file://${photo.path}` : photo.path;

      // Send image back to modal
      if (onCapture) onCapture(path);
      navigation.goBack();
    } catch (e) {
      Alert.alert("Capture Error", "Try again");
    }
  };

  if (!hasPermission || !device)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>{!device ? "No Camera Found" : "No Permission"}</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Camera ref={camera} style={StyleSheet.absoluteFill} device={device} isActive={isFocused} />
      <TouchableOpacity onPress={takePhoto} style={styles.button}>
        <View style={styles.inner} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" },
  button: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: "black" },
});

export default CameraScreenFeed;
