import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const ContactInfo = () => {
  return (
    <View>
      <View className="mt-3">
        <Text className="text-center font-bold text-2xl">Contact</Text>
        <ScrollView className="mt-10 m-3 p-3 ">
          <View className="gap-2">
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <Entypo name="user" size={18} color="pink" />
              <Text className="font-bold  w-[100px]">Permanent Address</Text>
              <Text className="font-normal">:Sylhet</Text>
            </View>
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <Entypo name="v-card" size={18} color="lightblue" />
              <Text className="font-bold w-[100px]">Present Address:</Text>
              <Text className="font-normal">:eess street</Text>
            </View>
            <View className="flex-row bg-gray-100 p-3 rounded-md items-center gap-2">
              <MaterialCommunityIcons
                name="office-building"
                size={18}
                color="yellow"
              />
              <Text className="font-bold w-[100px]">Phone:</Text>
              <Text className="font-normal">:123467</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ContactInfo;
