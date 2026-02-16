import { Alert, Linking } from "react-native";

export async function safeOpenUrl(url?: string) {
  if (!url) return;

  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    Alert.alert("Can't open link", "This URL cannot be opened on your device.");
    return;
  }
  Linking.openURL(url);
}
