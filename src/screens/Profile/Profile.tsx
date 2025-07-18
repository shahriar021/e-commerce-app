import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
  Platform,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { profileItems } from "../../constants/profileItems";

// ✅ SVG imports as components
import LeftSVG from "../../../assets/restroIcon/leftSVG.svg";
import RightSVG from "../../../assets/restroIcon/rightSVG.svg";
import { scale, verticalScale } from "react-native-size-matters";
import { useAppSelector } from "src/redux/hooks";

const { width } = Dimensions.get("window");

type ProfileItemsProp = {
  icon: ImageSourcePropType;
  label: string;
  onPress: () => void;
};

type RootStackParamList = {
  Settings: undefined;
  Address: undefined;
  About: undefined;
  Privacy: undefined;
  Terms: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const isTablet = width > 768; 

export default function YourComponent() {
  const userType=useAppSelector((store)=>store.auth.userType)
  
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const {width,height}=useWindowDimensions()

  const SettingsItem = ({ icon, label, onPress }: ProfileItemsProp) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row justify-between border p-2 m-2 rounded-lg border-gray-300 w-full"
    >
      <View className="flex-row items-center gap-2">
        <Image source={icon} className="w-[20] h-[20]" />
        <Text className="text-[#626262] text-xl font-robotoBold">{label}</Text>
      </View>
      <View className="p-1">
        <View className="w-[35px] h-[35px] border border-gray-200 items-center justify-center rounded-full">
          <Entypo name="chevron-small-right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* 🔥 Header area including SVGs */}
      <View style={{ width: "100%", height: height*0.26, position: "relative", backgroundColor: "white" }}>
        {/* Left SVG */}
        <LeftSVG
          width={isTablet ? width * 0.8 : width * 0.65}
          height="100%"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
          }}
        />

        {/* Right SVG */}
        <RightSVG
          width={isTablet ? width * 0.75 : width * 0.6}
          height="100%"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 1,
          }}
        />

        {/* Title */}
        <Text
          className="font-robotoBold absolute z-10 text-white text-2xl left-1/2 -translate-x-1/2"
          style={{ top: insets.top + 10 }}
        >
          Profile
        </Text>

        {/* Avatar */}
        <View className=" absolute z-10 overflow-hidden rounded-full left-1/2 bottom-0 -translate-x-1/2 border-4 border-white" style={{width:scale(100),height:verticalScale(100)}}>
          <Image
            source={require("../../../assets/restroIcon/tikaImg.jpg")}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* ✅ Content Area */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Text className="text-center mb-2 font-robotoBold">Lukas Wagner</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="p-4 items-center">
            {profileItems.filter(item=>item.type.includes(userType))?.map((item, index) => (
              <SettingsItem
                key={index}
                icon={item.icon}
                label={item.label}
                onPress={() => navigation.navigate(item.route)}
              />
            ))}

            <TouchableOpacity className="mt-2 flex-row items-center border p-3 rounded-xl border-red-700 bg-red-50">
              <Image
                source={require("../../../assets/restroIcon/logout-02.png")}
                className="w-[30] h-[30]"
              />
              <Text className="text-[#A13430] ml-2">Log out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );

  
}


