import { Alert, Linking } from "react-native";
import Constants from "expo-constants";
import VersionCheck from "react-native-version-check-expo";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.smartsoftware.hrm&hl=en&gl=US";

// Function to compare version numbers correctly
const isNewVersionAvailable = (current: string, latest: string) => {
  const currentParts = current.split(".").map(Number);
  const latestParts = latest.split(".").map(Number);

  for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
    const currentValue = currentParts[i] || 0;
    const latestValue = latestParts[i] || 0;

    if (latestValue > currentValue) {
      return true; // New version is available
    } else if (latestValue < currentValue) {
      return false; // Current version is ahead (unlikely, but safe check)
    }
  }

  return false; // Versions are the same
};

export const checkForUpdate = async () => {
  try {
    // console.log("🔍 Checking for updates...");

    // ✅ Get current app version from Expo config (Managed Workflow)
    const currentVersion = Constants.expoConfig?.version;
    // console.log("📌 Current App Version:", currentVersion);

    if (!currentVersion) {
      // console.log("⚠️ Could not determine current app version.");
      return;
    }

    // ✅ Get latest Play Store version using react-native-version-check-expo
    const latestVersion = await VersionCheck.getLatestVersion();

    if (!latestVersion) {
      // console.log("⚠️ Could not fetch Play Store version.");
      return;
    }

    // console.log("🔹 Latest Version from Play Store:", latestVersion);

    // ✅ Compare versions correctly
    if (isNewVersionAvailable(currentVersion, latestVersion)) {
      // console.log("🚀 New update available!");
      Alert.alert(
        "Update Available",
        `A new version is available. Please update for the best experience.`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Update", onPress: () => Linking.openURL(PLAY_STORE_URL) },
        ]
      );
    } else {
      // console.log("✅ No update needed. App is up to date.");
    }
  } catch (error) {
    console.error("❌ Error checking for updates:", error);
  }
};
