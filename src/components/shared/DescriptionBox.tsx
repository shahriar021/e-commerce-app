// src/components/shared/InputDescription.tsx
import { View, Text, TextInput } from "react-native";
import React from "react";

type TProps = {
  title: string;
  required?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const DescriptionBox = ({
  title,
  required,
  value,
  onChangeText,
  placeholder,
}: TProps) => {
  return (
    <View className="border px-3 border-gray-300 rounded-md mb-5 relative">
      <View className="absolute -top-3 left-2 text-center bg-white px-2 flex-row items-center">
        <Text className="text-sm text-gray-500">
          {title} {required && <Text className="text-red-500">*</Text>}
        </Text>
      </View>
      <TextInput
        placeholderTextColor="#9ca3af"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={5}
        style={{
          height: 150, // Larger height for the description box
          textAlignVertical: "top", // Align text to the top
          color: "#4B5563", // Text color
        }}
      />
    </View>
  );
};

export default DescriptionBox;
