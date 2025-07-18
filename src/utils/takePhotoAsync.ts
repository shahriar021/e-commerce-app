import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const takePhotoAsync = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== "granted") {
    Alert.alert("Permission denied", "Camera permissions are required.");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    // allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const imageData = {
      uri: result.assets[0].uri,
      name: result.assets[0].fileName || "photo.jpg",
      type: result.assets[0].mimeType || "image/jpeg",
    };

    return imageData;
    // setSelectedImage(imageData);
  } else {
    Alert.alert("You did not take a photo.");
    return false;
  }
};
