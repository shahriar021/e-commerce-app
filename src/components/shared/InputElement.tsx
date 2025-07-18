import { View, Text, TextInput } from "react-native";
import React, { useEffect } from "react";
// import { useAppSelector } from "src/redux/hooks";

type TProps = {
  title: string;
  required?: boolean;
  selectedState: any;
  setSelectedState: any;
  placeholder?: string;
  editable?: boolean;
  onChangeText?: any;
  keyboardType?:
    | "ascii-capable"
    | "decimal-pad"
    | "default"
    | "email-address"
    | "name-phone-pad"
    | "number-pad"
    | "numbers-and-punctuation"
    | "numeric"
    | "phone-pad"
    | "twitter"
    | "url"
    | "visible-password"
    | "web-search";
};

const InputElement = ({
  title,
  required,
  selectedState,
  setSelectedState,
  placeholder,
  keyboardType,
  editable,
  onChangeText,
}: TProps) => {
  return (
    <View className="border px-3 border-gray-300 rounded-md mb-5 relative h-[55px] justify-center">
      <View className="absolute -top-3 left-2 text-center bg-white px-2 flex-row items-center">
        <Text className="text-sm text-gray-500">
          {title} {""}
        </Text>
        {required && <Text className="text-red-500">*</Text>}
      </View>
      <TextInput
        placeholderTextColor="#9ca3af"
        placeholder={placeholder}
        className="text-gray-600"
        value={selectedState}
        onChangeText={setSelectedState}
        keyboardType={keyboardType}
        editable={editable}
      />
    </View>
  );
};

export default InputElement;
