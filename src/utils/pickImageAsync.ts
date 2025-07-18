import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImageAsync = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission denied",
      "We need access to your gallery to pick images."
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
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
    Alert.alert("You did not select any image.");
    return false;
  }
};
