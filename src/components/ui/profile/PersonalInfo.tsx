import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
} from "@expo/vector-icons";

const PersonalInfo = () => {
  return (
    <View>
      <View className="mt-3">
        <Text className="text-center font-bold text-2xl">Personal</Text>
        <ScrollView className="mt-10 m-3 p-3 ">
          <View className="gap-2">
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <Entypo name="user" size={18} color="pink" />
              <Text className="font-bold  w-[100px]">Name</Text>
              <Text className="font-normal">:Shahriar</Text>
            </View>
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <Entypo name="v-card" size={18} color="lightblue" />
              <Text className="font-bold w-[100px]">Class:</Text>
              <Text className="font-normal">:XI</Text>
            </View>
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <MaterialCommunityIcons
                name="office-building"
                size={18}
                color="yellow"
              />
              <Text className="font-bold w-[100px]">Branch:</Text>
              <Text className="font-normal">
                :Collectorate School and College, Pirojpur
              </Text>
            </View>
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <Zocial name="email" size={18} color="lightblue" />
              <Text className="font-bold w-[100px]">Shift:</Text>
              <Text className="font-normal">:Morning</Text>
            </View>
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <Zocial name="call" size={18} color="violet" />
              <Text className="font-bold w-[100px] ">Section</Text>
              <Text className="font-normal">:A</Text>
            </View>
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <Entypo name="location" size={18} color="orange" />
              <Text className="font-bold w-[100px]">Roll No</Text>
              <Text className="font-normal">:1</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PersonalInfo;
