import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

const CheckBox = ({ label, onChange, checked }: any) => {
  return (
    <Pressable
      onPress={onChange}
      className="flex-row items-center space-x-2 p-2"
    >
      <View className="w-6 h-6  rounded items-center justify-center ">
        {checked ? (
          <FontAwesome name="check-square-o" size={24} color="#6e4442" />
        ) : (
          <FontAwesome name="square-o" size={24} color="#6e4442" />
        )}
      </View>

      <Text> {label}</Text>
    </Pressable>
  );
};

export default CheckBox;
