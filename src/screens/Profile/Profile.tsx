import React, { useLayoutEffect, useState } from "react";
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
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useAppSelector } from "src/redux/hooks";
import Posts from "../Feed/Posts";
import Details from "../Feed/Details";
import * as ImagePicker from 'expo-image-picker';

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
  const [selectedImage, setSelectedImage] = useState(null);
  const userType = useAppSelector((store) => store.auth.userType)
  const [isPosts, setIsPosts] = useState("Posts")

  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const { width, height } = useWindowDimensions()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "white"
    })
  }, [navigation])

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: verticalScale(40),
        alignItems: 'center',
      }}
      style={{ flex: 1, backgroundColor: '#121212' }}
    >
      <View
        style={{
          width: '92%',
          height: verticalScale(300),
          borderRadius: moderateScale(24),
          overflow: 'hidden',
          marginTop: verticalScale(16),

        }}
      >
        <Image
          source={require("../../../assets/e-icon/othersProfile.jpg")}
          style={{
            width: '100%',
            height: verticalScale(250),
            borderRadius: moderateScale(24),
          }}
          resizeMode="cover"
        />

        {/* Profile Image (centered bottom) */}
        <View
          style={{
            width: scale(102),
            height: scale(102),
            position: 'absolute',
            bottom: verticalScale(12),
            left: '50%',
            transform: [{ translateX: -scale(102) / 2 }],
            borderRadius: scale(102) / 2,
            overflow: 'hidden',
            borderWidth: 4,
            borderColor: 'white',
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : <Image
            source={require("../../../assets/e-icon/img (1).png")}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />}


        </View>
        <TouchableOpacity onPress={openCamera} className="absolute z-10 bg-[#2A2A2A] p-1 rounded-full" style={{
          width: scale(24), height: scale(24), bottom: verticalScale(12), left: '50%',
          transform: [{ translateX: scale(60) / 2 }]
        }}>
          <Image source={require("../../../assets/e-icon/Button.png")} style={{ width: '100%', height: '100%' }} />
        </TouchableOpacity>
      </View>

      <View className='w-[92%] items-center'>
        <Text className='text-white text-center font-prostoOne' style={{ fontFamily: 'prosto-One' }}>Jack Robo</Text>
        <Text className='text-white font-prostoOne text-center'>S treetwear curator | #LagosStyle | Fashion enthusiast</Text>
        <View className='mt-3 flex-row gap-3'>
          <View className='bg-[#252525] p-2 items-center rounded-xl'>
            <Text className='text-white'>142</Text>
            <Text className='text-[#9CA3AF]' style={{ fontFamily: 'prosto-One' }}>Posts</Text>
          </View>
          <View className='bg-[#252525] p-2 items-center rounded-xl'>
            <Text className='text-white'>2.1k</Text>
            <Text className='text-[#9CA3AF]' style={{ fontFamily: 'prosto-One' }}>Likes</Text>
          </View>
          <View className='bg-[#252525] p-2 items-center rounded-xl'>
            <Text className='text-white'>89</Text>
            <Text className='text-[#9CA3AF]' style={{ fontFamily: 'prosto-One' }}>Followings</Text>
          </View>
        </View>
      </View>



      <View className='w-[92%] flex-row gap-3 mt-2 mb-3 justify-center items-center'>
        <TouchableOpacity className={`${isPosts == "Posts" ? "border-b border-b-white" : ""} py-1`} onPress={() => setIsPosts("Posts")}>
          <Text className='font-prostoOne text-white' style={{ fontFamily: 'prosto-One' }}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`${isPosts == "Details" ? "border-b border-b-white" : ""} py-1`} onPress={() => setIsPosts("Details")}>
          <Text className='font-prostoOne text-white' style={{ fontFamily: 'prosto-One' }}>My Lookbook</Text>
        </TouchableOpacity>
      </View>
      {isPosts == "Posts" ? <Posts /> : <Posts />}
    </ScrollView>
  );


}


