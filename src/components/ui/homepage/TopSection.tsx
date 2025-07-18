import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import NotificationIcon from "src/components/shared/NotificationIcon";

const TopSection = ({ navigation }: { navigation: any }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView>
      <View>
        <View className=" overflow-hidden  rounded-full relative  ">
          <View
            className="bg-white  h-full px-5 flex-row  items-center  justify-between mb-3"
            style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
          >
            <View className="flex-row items-center gap-2">
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Ionicons name="menu" size={26} color="black" />
              </TouchableOpacity>
            </View>
            <NotificationIcon
              handleNotificationPress={() =>
                navigation.navigate("Notification")
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopSection;
