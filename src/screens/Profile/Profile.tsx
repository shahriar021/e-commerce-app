import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useAppSelector } from "src/redux/hooks";
import Posts from "../Feed/Posts";
import CreatePostModal from "../Feed/CreatePostModal";
import { useGetIndividualPostQuery, useGetLookbookQuery, useGetProfileQuery } from "src/redux/features/profile/profile/profileApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Lookbook from "./Lookbook";

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

export default function YourComponent() {
  const token = useAppSelector((state) => state.auth.token)
  const [isPosts, setIsPosts] = useState("Posts")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigation = useNavigation<NavigationProp>();
  const [profile, setProfile] = useState(null);
  const [postLoadlimit, setPostLoadlimit] = useState(10);
  const [saveLoadlimit, setSaveLoadlimit] = useState(10);
  const { data: getLookbook } = useGetLookbookQuery({ token, limit: saveLoadlimit });
  const { data: getPostData } = useGetIndividualPostQuery({ token, uid: profile?.data?.data?._id, limit: postLoadlimit })
  console.log(saveLoadlimit, "lookbook")

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user_profile');
        if (jsonValue != null) {
          setProfile(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load profile from AsyncStorage", e);
      }
    };

    loadProfile();
  }, []);
  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('user_profile');
          if (jsonValue != null) {
            setProfile(JSON.parse(jsonValue));
          }
        } catch (e) {
          console.error("Failed to load profile from AsyncStorage", e);
        }
      };
      loadProfile();
      return () => {
      };

    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "white"
    })
  }, [navigation])


  const handleModal = () => {
    setIsModalOpen(true)
  }

  return (
    <View className="flex-1 relative">
      <TouchableOpacity className='absolute right-10 bottom-4 z-10 bg-[#1D3725] p-3 rounded-full' onPress={handleModal}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
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
            {profile?.data?.data?.profile[0] ? (
              <Image
                source={{ uri: profile?.data?.data?.profile[0] }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            ) : <Image
              source={require("../../../assets/e-icon/img (1).png")}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />}
          </View>
        </View>

        <View className='w-[92%] items-center'>
          <Text className='text-white text-center font-instrumentSansBold mb-1' >{profile?.data?.data?.userName}</Text>
          <Text className='text-white font-instrumentSansSemiBold text-center'>S treetwear curator | #LagosStyle | Fashion enthusiast</Text>
          <View className='mt-3 flex-row gap-3'>
            <View className='bg-[#252525] p-2 items-center rounded-xl'>
              <Text className='text-white font-instrumentRegular'>{profile?.data?.data?.totalPosts | 0}</Text>
              <Text className='text-[#9CA3AF] font-instrumentRegular' >Posts</Text>
            </View>
            <View className='bg-[#252525] p-2 items-center rounded-xl'>
              <Text className='text-white font-instrumentRegular'>{profile?.data?.data?.totalReacts | 0}</Text>
              <Text className='text-[#9CA3AF] font-instrumentRegular' >Likes</Text>
            </View>
            <View className='bg-[#252525] p-2 items-center rounded-xl'>
              <Text className='text-white font-instrumentRegular'>{profile?.data?.data?.totalFollowers | 0}</Text>
              <Text className='text-[#9CA3AF] font-instrumentRegular' >Followings</Text>
            </View>
          </View>
        </View>

        <View className='w-[92%] flex-row gap-3 mt-2 mb-3 justify-center items-center'>
          <TouchableOpacity className={`${isPosts == "Posts" ? "border-b border-b-white" : ""} py-1`} onPress={() => setIsPosts("Posts")}>
            <Text className='font-instrumentSansBold text-white' >Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity className={`${isPosts == "Details" ? "border-b border-b-white" : ""} py-1`} onPress={() => setIsPosts("Details")}>
            <Text className='font-instrumentSansBold text-white' >My Lookbook</Text>
          </TouchableOpacity>
        </View>
        {isPosts == "Posts" ? <Posts data={getPostData?.data} setPostLoad={setPostLoadlimit} currentLimit={postLoadlimit} /> : <Lookbook data={getLookbook?.data} setFavLimit={setSaveLoadlimit} currentSave={saveLoadlimit} />}
      </ScrollView>
      <CreatePostModal visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </View>
  );


}


