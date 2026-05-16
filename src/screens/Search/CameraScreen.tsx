import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform} from "react-native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const CameraScreen = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const camera = useRef<Camera>(null);

  // 1. Force the simplest back camera
  const device = useCameraDevice("back");

  const [hasPermission, setHasPermission] = useState(false);

  

  useLayoutEffect(() => {
      navigation.setOptions({
        headerStyle: { backgroundColor: "#121212" },
        headerTitle: "Click your photo",
        headerTitleStyle: { color: "white", fontSize: 20 },
      });
    }, []);

  // 2. Clear permission check
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status !== "granted") {
        Alert.alert("Error", "Camera permission is required");
      }
      setHasPermission(status === "granted");
    })();
  }, []);

  // 3. Simple capture function
 const takePhoto = async () => {
  if (!camera.current) return;
  try {
    let photo;
    if (Platform.OS === 'android') {
      photo = await camera.current.takeSnapshot({ quality: 80 });
      const path = `file://${photo.path}`;
      navigation.navigate("BottomScreen", {
        screen: "Search",
        params: { capturedImage: path },
      });
    } else {
      photo = await camera.current.takePhoto({});
      navigation.navigate("BottomScreen", {
        screen: "Search",
        params: { capturedImage: photo.path },
      });
    }
  } catch (e) {
    Alert.alert("Capture Error", "Try restarting the app");
  }
};

  // UI Checks
  if (!hasPermission)
    return (
      <View style={styles.center}>
        <Text>No Permission</Text>
      </View>
    );
  if (!device)
    return (
      <View style={styles.center}>
        <Text>No Camera Found</Text>
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        // ✅ THE SECRET: Don't use ANY extra props.
        // No 'photo={true}', no 'video', no 'format'.
        // This forces the library to use the "Legacy" stable mode.
        isActive={isFocused}
        photo={true} 
      />
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

export default CameraScreen;
