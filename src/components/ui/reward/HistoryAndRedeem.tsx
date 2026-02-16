import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { RewardProps } from "src/types/reward";

const RewardHistoryRedeem = ({
  activeTab,
  redemptions = [],
  redeemLoading,
  onRedeem,
}: RewardProps) => {
  if (activeTab === "Pending") {
    if (!redemptions.length) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-white font-instrumentSansSemiBold">No history yet</Text>
        </View>
      );
    }

    return (
      <ScrollView className="flex-1 w-full" contentContainerStyle={{ paddingVertical: 8 }}>
        {redemptions.map((item, idx) => (
          <View
            key={item.id ?? `${item.updatedAt}-${idx}`}
            className="flex-col p-2 bg-[#1D3725] m-2 rounded-lg"
          >
            <View className="flex-row p-2 justify-between">
              <Text className="text-lg font-semibold text-white">
                points: {item.pointsRedeemed}
              </Text>
              <Text className="text-2xl font-bold text-white">${item.amount}</Text>
            </View>

            <View className="flex-row p-2 justify-between">
              <Text className="text-white font-bold">
                {new Date(item.updatedAt).toDateString()}
              </Text>
              <Text className="text-sm font-semibold bg-[#4ADE80] p-1 rounded-lg">
                {item.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white font-instrumentSansSemiBold">Collect your gifts</Text>

      <TouchableOpacity
        onPress={onRedeem}
        disabled={redeemLoading}
        style={{
          marginTop: 14,
          backgroundColor: "#4ADE80",
          paddingVertical: 10,
          paddingHorizontal: 22,
          borderRadius: 12,
          opacity: redeemLoading ? 0.6 : 1,
        }}
        activeOpacity={0.85}
      >
        {redeemLoading ? (
          <ActivityIndicator color="#0B1410" />
        ) : (
          <Text style={{ color: "#0B1410", fontWeight: "700" }}>Redeem</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RewardHistoryRedeem;
