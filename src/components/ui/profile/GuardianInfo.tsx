import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
} from "@expo/vector-icons";

const GuardianInfo = () => {
  return (
    <View>
      <View className="mt-3">
        <Text className="text-center font-bold text-2xl">Guardian</Text>
        <ScrollView className="mt-10 m-3 p-3 ">
          <View className="gap-2">
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <Entypo name="user" size={18} color="pink" />
              <Text className="font-bold  w-[100px]">Guardian Name</Text>
              <Text className="font-normal">:Shahriar sr</Text>
            </View>
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <Entypo name="v-card" size={18} color="lightblue" />
              <Text className="font-bold w-[100px]">Guardian Phone:</Text>
              <Text className="font-normal">:00994221</Text>
            </View>
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <MaterialCommunityIcons
                name="office-building"
                size={18}
                color="yellow"
              />
              <Text className="font-bold w-[100px]">Father's Name:</Text>
              <Text className="font-normal">:Shahriar sr</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default GuardianInfo;
