import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const SuccessPage = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
 
  const handleVerify = () => {
    navigation.navigate("Login Screen" as never);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212"
      },
      headerTintColor: "#FFFFFF",
      headerTitle: '', // hides title in header center
      headerBackTitleVisible: false, // hides back label
      headerBackTitle: '', // extra safety for iOS
       headerLeft: () => (
                  <TouchableOpacity className='flex-row gap-2 items-center' onPress={()=>navigation.goBack()}>
                                      <Feather name="arrow-left-circle" size={24} color="white" />
                      <View className='flex-col'>
                          <Text className='font-helvetica text-white text-xl'>ARKIVE</Text>
                      </View>
                  </TouchableOpacity>
              )
    })
  }, [navigation])
    const circleSize=scale(82)
  return (
    <View className="flex-1 bg-[#121212]  items-center">
      <View className="px-3 py-3 items-center  w-full">

        <View className='bg-[#1A5EED] relative items-center justify-center rounded-full ' style={{width:scale(82),height:scale(82)}}>
          <Feather name="key" size={circleSize*.5} color="white" />
          <View className='absolute bg-[#18E79D] rounded-full  right-0 bottom-0 z-10'><AntDesign name="check" size={24} color="white" /></View>
        </View>

        <View className='items-center'>
          <Text className='text-[#fff] font-helvetica text-2xl mt-2 mb-2'>SUCCESS</Text>
        </View>

        <View className='items-center'>
          <Text className='text-[#fff] font-helvetica text-xl mt-2 mb-2'>Your password has been successfully reset</Text>
        </View>
        <TouchableOpacity className="mt-2 mb-3 p-3 w-full items-center bg-[#04060F14] rounded-lg overflow-hidden border border-[#DCF3FF]" onPress={() => navigation.navigate("Login Screen")}>
            <Text className="text-[#979797] text-xl font-helvetica" style={{ fontFamily: 'prosto-One' }}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessPage;




