import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect } from 'react'
import { Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'

const ForgetPassword = () => {

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Forgot Password",
      headerStyle: {
        backgroundColor: "white",
        elevation: 0, // for Android
        shadowOpacity: 0, // for iOS
        borderBottomWidth: 0, // for iOS
      },
      headerTintColor: "black",
      headerTitleAlign: "center",


      headerLeft: () => (
        <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
          <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
            <Entypo name="chevron-small-left" size={24} color="red" />
          </View>
        </TouchableOpacity>
      )

    });
  }, [navigation]);

  const handleVerify = () => {
    navigation.navigate("Login OTP" as never)
  }

  return (
    <View className='flex-1 p-1 bg-white'>
      <Text className='mb-4  mt-2 text-center text-red-700 font-bold text-xl'>No worries!</Text>
      <Text className='text-center'>
        {"Enter your registered email address or mobile number and we’ll \n send you instructions to reset your password. Let’s get you back \n on track quickly and securely!"}</Text>

      <View className='mt-4' style={{ alignItems: 'flex-start', width: width * 0.9, alignSelf: 'center' }}>
        <Text className='mb-2'>Enter new password</Text>
        <TextInput
          className='border rounded-xl p-3 border-gray-400'
          style={{ width: '100%' }}
        />
      </View>
      <View className="items-center ">
        <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden" style={{ width: width * 0.9 }} onPress={handleVerify}>
          <LinearGradient colors={["#DD0F14", "#C21A1E"]} style={{ width, borderRadius: 999, alignItems: "center" }}>
            <Text className="text-white p-3 ">Send Code</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ForgetPassword