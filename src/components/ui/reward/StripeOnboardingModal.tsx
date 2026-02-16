import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import WebView from "react-native-webview";

type Props = {
  visible: boolean;
  onClose: () => void;
  onboardingUrl: string;
  statusFetching: boolean;
};

export default function StripeOnboardingModal({
  visible,
  onClose,
  onboardingUrl,
  statusFetching,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "#121212" }}>
        <View
          style={{
            height: 56,
            paddingHorizontal: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#2C2C2C",
          }}
        >
          <TouchableOpacity onPress={onClose} style={{ padding: 6 }}>
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>

          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            Stripe Onboarding
          </Text>

          <View style={{ width: 30 }} />
        </View>

        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#2C2C2C",
          }}
        >
          {statusFetching ? (
            <ActivityIndicator size="small" color="#4ADE80" />
          ) : (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: "#4ADE80",
              }}
            />
          )}
          <Text style={{ color: "#DCF3FF" }}>Checking onboarding status...</Text>
        </View>

        <WebView
          source={{ uri: onboardingUrl }}
          startInLoadingState
          renderLoading={() => (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator size="large" color="#4ADE80" />
              <Text style={{ color: "white", marginTop: 10 }}>Loading onboarding...</Text>
            </View>
          )}
        />
      </View>
    </Modal>
  );
}
