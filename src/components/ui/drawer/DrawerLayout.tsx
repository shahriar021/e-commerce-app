import React from "react";
import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Feather, Ionicons } from "@expo/vector-icons";

const DrawerLayout = (props: any) => {
  const { navigation } = props;

  const handleNavigation = (text: string) => {
    navigation.navigate(text as string);
    navigation.toggleDrawer();
  };

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    // <View className="flex-1  bg-transparent shadow-lg ring-1 ring-black/5">
    <View className="flex-1 bg-transparent ring-1 ring-black/5">
      <DrawerContentScrollView {...props}>
        {/* Drawer Heading */}
        <View className="mb-5 flex-row justify-between ">
          <Text className="p-2 font-bold text-4xl">Restaurant</Text>
          <TouchableOpacity onPress={toggleDrawer}>
            <Text>
              <Ionicons name="close-circle-outline" size={26} color="grey" />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Drawer Root Items */}
        <DrawerItemList {...props} />

        {/* Drawer Custom Items */}
        <View>
          <Pressable
            className="mt-2 bg-gray-100 p-4 rounded-full"
            onPress={() => handleNavigation("Profile")}
          >
            <View className="flex-row justify-start gap-3 ml-0.5">
              <Feather name="user" size={16} color="grey" />
              <Text className="font-normal text-black-500">Profile</Text>
            </View>
          </Pressable>
        </View>

        <View>
          <Pressable className="mt-2 bg-gray-100 p-4 rounded-full">
            <View className="flex-row justify-start gap-3 ml-0.5">
              <Feather name="user" size={16} color="grey" />
              <Text className="font-normal text-black-500">
                Change Password
              </Text>
            </View>
          </Pressable>
        </View>

        {/* Logout Button */}
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerLayout;
