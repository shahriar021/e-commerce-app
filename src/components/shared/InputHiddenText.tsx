import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

type TProps = {
  title: string;
  required?: boolean;
  selectedState: any;
  setSelectedState: any;
};

const InputHiddenText = ({
  title,
  required,
  selectedState,
  setSelectedState,
}: TProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View className="border px-3 border-gray-300 rounded-md mb-5 relative h-[55px] justify-center">
      <View className="absolute -top-3 left-2 text-center bg-white px-2 flex-row items-center">
        <Text className="text-sm text-gray-500">
          {title} {""}
        </Text>
        {required && <Text className="text-red-500">*</Text>}
      </View>
      <View className="flex-row items-center">
        <TextInput
          className="flex-1"
          value={selectedState}
          onChangeText={setSelectedState}
          secureTextEntry={!isPasswordVisible}
        />
        <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text className="text-gray-400">
            <Feather name="eye" size={18} />
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InputHiddenText;
