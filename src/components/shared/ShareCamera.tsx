import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

/**
 * Handles camera permission requests and launches the camera.
 * @returns {Promise<ImagePicker.ImagePickerAsset | null>} The selected image asset, or null if canceled/failed.
 */
export const launchCameraAndHandlePermissions = async (): Promise<ImagePicker.ImagePickerAsset | null> => {
    // 1. Check existing permissions
    let { status, canAskAgain } = await ImagePicker.getCameraPermissionsAsync();

    // 2. Request permission if not granted but can ask
    if (status !== 'granted' && canAskAgain) {
        const requestResult = await ImagePicker.requestCameraPermissionsAsync();
        status = requestResult.status;
        canAskAgain = requestResult.canAskAgain;
    }

    // 3. Handle permission denial
    if (status !== 'granted') {
        if (!canAskAgain) {
            // Permission permanently denied
            Alert.alert(
                "Camera Permission Required",
                "It looks like you permanently denied camera access. Please go to your device settings to enable the camera for this app.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Open Settings", onPress: () => Linking.openSettings() }
                ]
            );
        } else {
            // Permission denied, but can ask again later
            Alert.alert("Permission to access camera is required!");
        }
        return null;
    }

    // 4. Launch the camera
    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    // 5. Return the result
    if (!result.canceled) {
        return result.assets[0];
    }

    return null;
};