import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";

type TProps = {
  heading?: string;
  data: any;
  navigation: any;
};

const ShowNavigations = ({ heading, data, navigation }: TProps) => {
  const handlePress = (text: string) => {
    navigation.navigate(text);
  };

  return (
    <View className="mx-5 mb-6">
      {heading && <Text className="text-xl text-gray-700 mb-5">{heading}</Text>}
      <View className="flex-row gap-2">
        {data.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handlePress(item?.screen || item?.title)}
              className="flex-1"
            >
              <View className="items-center">
                <Image
                  source={item.icon}
                  className="h-[45px] w-[45px] rounded-lg"
                />
                <Text className="text-center mt-1 w-[100px] text-gray-600 text-sm">
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {data?.length === 3 && <View className="flex-1"></View>}
      </View>
    </View>
  );
};

export default ShowNavigations;
