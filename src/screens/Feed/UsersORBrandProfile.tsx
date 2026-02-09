import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {  Feather } from '@expo/vector-icons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Posts from './Posts';
import Details from './Details';
import { useGetUploaderProfileQuery } from 'src/redux/features/feedApi/feedApi';
import { useAppSelector } from 'src/redux/hooks';
import { usePostFollowMutation } from 'src/redux/features/profile/follow/followApi';

const UsersORBrandProfile = () => {
  const token = useAppSelector((state) => state.auth.token)
  const navigation = useNavigation();
  const [isPosts, setIsPosts] = useState("Posts")
  const route = useRoute<any>()
  const { upID } = route?.params
  const { data: getSpecificUserData } = useGetUploaderProfileQuery({ token, id: upID })
  const userType = useAppSelector((store) => store.auth.userType)
  const [postFollow] = usePostFollowMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
      },
      headerTitle: getSpecificUserData?.data?.userName,
      headerTitleStyle: {
        color: "white",
        fontFamily: 'instrumentSans-Bold',
        fontSize: 20
      },
      headerTitleAlign: "center",
      headerLeft: () => {
        return <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={24} color="white" />
        </TouchableOpacity>
      }
    })
  }, [navigation])

  const handleFollow = async () => {
    try {
      const res = await postFollow({ token, id: getSpecificUserData?.data?._id }).unwrap()
    } catch (err) {
      console.log(err)
    }
  }

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

          <Image
            source={require("../../../assets/e-icon/brandLogo.png")}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
      </View>

      <View className='w-[92%] items-center'>
        {/* <Text className='text-white text-center font-instrumentSansBold' >{type=="user"? "Jack Robo":"Coin Supply"}</Text> */}
        <Text className='text-white font-instrumentSansSemiBold text-center'>{getSpecificUserData?.data?.theme}</Text>
        <View className='mt-3 flex-row gap-3'>
          <View className='bg-[#252525] p-2 items-center rounded-xl'>
            <Text className='text-white font-instrumentRegular'>{getSpecificUserData?.data?.totalPosts}</Text>
            <Text className='text-[#9CA3AF] font-instrumentRegular' >Posts</Text>
          </View>
          <View className='bg-[#252525] p-2 items-center rounded-xl'>
            <Text className='text-white font-instrumentRegular'>{getSpecificUserData?.data?.totalReacts}</Text>
            <Text className='text-[#9CA3AF] font-instrumentRegular' >Likes</Text>
          </View>
          <View className='bg-[#252525] p-2 items-center rounded-xl'>
            <Text className='text-white font-instrumentRegular'>{getSpecificUserData?.data?.totalFollowing}</Text>
            <Text className='text-[#9CA3AF] font-instrumentRegular' >Followings</Text>
          </View>
        </View>
      </View>

      {userType == "User" && <TouchableOpacity className='bg-[#fff] p-2 rounded-xl mt-3' onPress={handleFollow}>
        <Text className='text-black font-instrumentSansSemiBold' >Follow</Text>
      </TouchableOpacity>
      }

      <View className='w-[92%] flex-row gap-3 mt-2 mb-3'>
        <TouchableOpacity className={`${isPosts == "Posts" ? "border-b border-b-white" : ""} py-1`} onPress={() => setIsPosts("Posts")}>
          <Text className='font-instrumentSansSemiBold text-white' >Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`${isPosts == "Details" ? "border-b border-b-white" : ""} py-1`} onPress={() => setIsPosts("Details")}>
          <Text className='font-instrumentSansSemiBold text-white' >Details</Text>
        </TouchableOpacity>
      </View>
      {isPosts == "Posts" ? <Posts /> : <Details />}
    </ScrollView>
  )
}

export default UsersORBrandProfile